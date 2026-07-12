export interface Course {
    id: number;
    courseName: string;
    instructorName: string;
    category: string;
    duration: number;
    price: number;
    status: CourseStatus;
    description?: string;
    createdDate?: string;
}

export type CourseStatus = 'Active' | 'Draft' | 'Archived';