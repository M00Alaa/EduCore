const fs = require('fs');
const path = require('path');

// Get paths from command-line arguments
const postmanCollectionPath = process.argv[2] || './postman-collection.json';
const outputOpenApiPath = process.argv[3] || './openapi.json';

// Read and parse the Postman collection
const collection = JSON.parse(fs.readFileSync(postmanCollectionPath, 'utf8'));

// Initialize OpenAPI structure
const openApi = {
    openapi: '3.0.0',
    info: {
        title: collection.info.name,
        version: '1.0.0'
    },
    paths: {},
    components: {
        schemas: {}
    },
    tags: []
};

// Function to generate schema properties from JSON example
const generateSchemaProperties = (example, parentSchemaName = '') => {
    if (!example) return {};
    const exampleObj = JSON.parse(example);
    const properties = {};
    for (const key in exampleObj) {
        const value = exampleObj[key];
        let type = value === null ? 'null' : typeof value;
        if (type === 'object' && value !== null) {
            if (Array.isArray(value)) {
                const arrayItemType = typeof value[0];
                properties[key] = {
                    type: 'array',
                    items: arrayItemType === 'object' ? {
                        type: 'object',
                        properties: generateSchemaProperties(JSON.stringify(value[0]), `${parentSchemaName}_${key.charAt(0).toUpperCase() + key.slice(1)}`)
                    } : { type: arrayItemType }
                };
            } else {
                const nestedSchemaName = `${parentSchemaName}_${key.charAt(0).toUpperCase() + key.slice(1)}`;
                openApi.components.schemas[nestedSchemaName] = {
                    type: 'object',
                    properties: generateSchemaProperties(JSON.stringify(value), nestedSchemaName)
                };
                properties[key] = { $ref: `#/components/schemas/${nestedSchemaName}` };
            }
        } else if (type === 'number') {
            if (Number.isInteger(value)) {
                type = 'integer';
            }
            properties[key] = { type: type };
        } else {
            properties[key] = { type: type };
        }
    }
    return properties;
};

// Function to generate parameters from Postman request
const generateParameters = (request) => {
    const parameters = [];
    if (request.url.query) {
        request.url.query.forEach(param => {
            parameters.push({
                name: param.key,
                in: 'query',
                required: param.value !== undefined,
                schema: {
                    type: 'string'
                },
                example: param.value
            });
        });
    }
    if (request.url.variable) {
        request.url.variable.forEach(param => {
            parameters.push({
                name: param.key,
                in: 'path',
                required: true,
                schema: {
                    type: 'string'
                },
                example: param.value
            });
        });
    }
    return parameters;
};

// Function to determine the type of a form data value
const determineFormDataType = (value) => {
    if (Array.isArray(value)) {
        return 'array';
    } else if (typeof value === 'string') {
        return 'string';
    } else if (typeof value === 'number') {
        return Number.isInteger(value) ? 'integer' : 'number';
    } else if (typeof value === 'boolean') {
        return 'boolean';
    } else if (value === null) {
        return 'null';
    } else if (typeof value === 'object') {
        return 'object';
    }
    return 'string'; // Default to string if type cannot be determined
};

// Function to process each item
const processItem = (item, parentPath = '') => {
    if (item.request && item.request.method) {
        let rawUrl;
        try {
            // Replace placeholders with a valid base URL
            const validUrl = item.request.url.raw.replace('{{url}}', 'http://example.com');
            rawUrl = new URL(validUrl);
        } catch {
            console.warn(`Skipping invalid URL: ${item.request.url.raw}`);
            return;
        }
        const pathSegments = rawUrl.pathname.split('/').filter(segment => segment);
        let itemPath = '/' + pathSegments.join('/'); // Ignore the first segment

        // Replace path parameters with OpenAPI format
        itemPath = itemPath.replace(/:([a-zA-Z0-9_]+)/g, '{$1}');

        const method = item.request.method.toLowerCase();
        let requestBody = {};
        let responseBody = {};
        try {
            requestBody = item.request.body && item.request.body.raw ? JSON.parse(item.request.body.raw) : {};
        } catch (e) {
            console.warn(`Skipping invalid request body: ${item.request.body.raw}`);
        }
        try {
            responseBody = item.response && item.response.length > 0 && item.response[0].body ? JSON.parse(item.response[0].body) : {};
        } catch (e) {
            console.warn(`Skipping invalid response body: ${item.response[0].body}`);
        }
        const originalUrl = item.request.url.raw;

        // Add schemas to OpenAPI components
        const folderName = parentPath.split(path.sep).pop().replace(/\s+/g, '');
        // Sanitize names by replacing spaces and special characters (/, -, etc.) with underscores
        const sanitizedName = item.name.replace(/[\s\/\-]+/g, '_').replace(/_+/g, '_');
        const requestSchemaName = `${folderName}_${sanitizedName}_Request`;
        const responseSchemaName = `${folderName}_${sanitizedName}_Response`;
        openApi.components.schemas[requestSchemaName] = {
            type: 'object',
            properties: generateSchemaProperties(JSON.stringify(requestBody), requestSchemaName)
        };

        // Handle array response schemas
        let responseSchema;
        if (Array.isArray(responseBody)) {
            const arrayItemSchemaName = `${responseSchemaName}_Item`;
            openApi.components.schemas[arrayItemSchemaName] = {
                type: 'object',
                properties: generateSchemaProperties(JSON.stringify(responseBody[0]), arrayItemSchemaName)
            };
            responseSchema = {
                type: 'array',
                items: {
                    $ref: `#/components/schemas/${arrayItemSchemaName}`
                }
            };
        } else {
            responseSchema = {
                type: 'object',
                properties: generateSchemaProperties(JSON.stringify(responseBody), responseSchemaName)
            };
        }
        openApi.components.schemas[responseSchemaName] = responseSchema;

        // Generate schema for every array in the response schema
        const generateArraySchemas = (properties, parentSchemaName) => {
            for (const key in properties) {
                const property = properties[key];
                if (property.type === 'array' && property.items && property.items.type === 'object') {
                    const arrayItemSchemaName = `${parentSchemaName}_${key.charAt(0).toUpperCase() + key.slice(1)}_Item`;
                    openApi.components.schemas[arrayItemSchemaName] = property.items;
                    property.items = { $ref: `#/components/schemas/${arrayItemSchemaName}` };
                    generateArraySchemas(openApi.components.schemas[arrayItemSchemaName].properties, arrayItemSchemaName);
                }
            }
        };

        generateArraySchemas(responseSchema.properties, responseSchemaName);

        // Handle form data
        let requestBodyContent = {};
        if (item.request.body && item.request.body.mode === 'formdata') {
            const formDataProperties = {};
            const arrayProperties = {};

            item.request.body.formdata.forEach(param => {
                const value = param.value || '';
                const type = param.type === 'file' ? 'file' : determineFormDataType(value);

                // Check if the key is an array-like key (e.g., 'sports[0]')
                const arrayMatch = param.key.match(/^(.+)\[(\d+)\]$/);
                if (arrayMatch) {
                    const arrayKey = arrayMatch[1];
                    if (!arrayProperties[arrayKey]) {
                        arrayProperties[arrayKey] = [];
                    }
                    arrayProperties[arrayKey].push({
                        index: parseInt(arrayMatch[2], 10),
                        value: value,
                        type: type
                    });
                } else {
                    if (type === 'array') {
                        const arrayItemType = determineFormDataType(value[0]);
                        formDataProperties[param.key] = {
                            type: 'array',
                            items: {
                                type: arrayItemType
                            }
                        };
                    } else if (type === 'file') {
                        formDataProperties[param.key] = {
                            type: 'string',
                            format: 'binary',
                            description: param.description || ''
                        };
                    } else {
                        formDataProperties[param.key] = {
                            type: type,
                            description: param.description || ''
                        };
                    }
                }
            });

            // Convert array-like properties into actual arrays
            for (const key in arrayProperties) {
                const items = arrayProperties[key].sort((a, b) => a.index - b.index).map(item => ({
                    type: item.type,
                    value: item.value
                }));
                formDataProperties[key] = {
                    type: 'array',
                    items: {
                        type: items[0].type
                    }
                };
            }

            requestBodyContent = {
                'multipart/form-data': {
                    schema: {
                        type: 'object',
                        properties: formDataProperties
                    }
                }
            };
        } else {
            requestBodyContent = {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: generateSchemaProperties(JSON.stringify(requestBody), requestSchemaName)
                    },
                    example: requestBody
                }
            };
        }

        // Add path and method to OpenAPI paths
        openApi.paths[itemPath] = openApi.paths[itemPath] || {};
        openApi.paths[itemPath][method] = {
            summary: item.name,
            tags: [folderName],
            parameters: generateParameters(item.request),
            requestBody: {
                content: requestBodyContent
            },
            responses: {
                '200': {
                    description: 'Successful response',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: `#/components/schemas/${responseSchemaName}`
                            },
                            example: responseBody
                        }
                    }
                }
            },
            // Include the original URL
            originalUrl: originalUrl
        };

        // Add tag to OpenAPI tags
        if (!openApi.tags.some(tag => tag.name === folderName)) {
            openApi.tags.push({ name: folderName });
        }
    } else if (item.item) {
        item.item.forEach(subItem => processItem(subItem, path.join(parentPath, item.name.replace(/\s+/g, ''))));
    }
};

// Process each item in the collection
collection.item.forEach(item => processItem(item));

// Write OpenAPI JSON to file
fs.writeFileSync(outputOpenApiPath, JSON.stringify(openApi, null, 2));

console.log('OpenAPI JSON file generated successfully.');