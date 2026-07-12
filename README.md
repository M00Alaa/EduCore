# Mohamed Alaa angular theme dashboard page

## Layouts

- horizontal: import { HorizontalComponent } from 'src/app/layouts/horizontal/horizontal.component';
- Vertical: import { VerticalComponent } from 'src/app/layouts/vertical/vertical.component';

## icons

- boxicons: https://boxicons.com/
- mat icons: https://pictogrammers.com/library/mdi/
- radix icons: https://www.radix-ui.com/icons
  (but you should get name from figma and find it in `src\assets\scss\custom\plugins\icons\radix\style.scss` then use it: <span class="radix-track-previous"></span>)

## Configs

- app.const.ts => put project name & logos paths & ROLES
- layout.model.ts => Set theme configs:

```
export const LAYOUT_VERTICAL = 'vertical';

export const LAYOUT_HORIZONTAL = 'horizontal';

export const LAYOUT_WIDTH = 'boxed';

export const SIDEBAR_TYPE = 'dark';

export const TOPBAR = 'dark';
```

## LTR Version

### Just make rtl injectable too in angular.json

```
  "styles": [
               "src/styles.scss",
               "src/assets/scss/app-rtl.scss",
              {
                "input": "src/assets/scss/app.scss",
                "bundleName": "ltr-style",
                "inject": false
              },
              "src/assets/scss/icons.scss"
            ],
```

## Build & Development Commands

This project uses specific memory-allocation commands to handle large builds and avoid heap out-of-memory issues.

**Run Dev Server Locally:**

```bash
npm run start
# or
npm run serve
```

**Build for Development:**

```bash
npm run build
```

**Build for Production:**

```bash
npm run build-prod
```
