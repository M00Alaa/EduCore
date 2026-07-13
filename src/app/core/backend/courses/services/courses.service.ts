import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Course, CourseStatus } from '../models/courses.model';

const STORAGE_KEY = 'edu_courses';

export interface CourseStats {
    total: number;
    active: number;
    draft: number;
    archived: number;
}

function seedData(): Course[] {
    return [
        { id: 1, courseName: 'Introduction to Angular', instructorName: 'John Smith', category: 'Frontend', duration: 40, price: 199, status: 'Active', description: 'Learn the fundamentals of the Angular framework, components, services, and reactive forms to build modern web applications.', createdDate: '2024-01-15', rating: 4.9, studentsCount: 240, updatedDate: '2024-03-01', updatedBy: 'John Smith' },
        { id: 2, courseName: 'Node.js Backend Development', instructorName: 'Jane Doe', category: 'Backend', duration: 60, price: 299, status: 'Active', description: 'Build scalable and secure backend applications with Node.js, Express, and MongoDB.', createdDate: '2024-02-01', rating: 4.7, studentsCount: 180, updatedDate: '2024-04-10', updatedBy: 'Jane Doe' },
        { id: 3, courseName: 'UI/UX Design Principles', instructorName: 'Mike Johnson', category: 'Design', duration: 30, price: 149, status: 'Draft', description: 'Master the art of user interface and experience design with practical, hands-on projects.', createdDate: '2024-02-15', rating: 4.5, studentsCount: 95, updatedDate: '2024-03-22', updatedBy: 'Mike Johnson' },
        { id: 4, courseName: 'React Native for Mobile', instructorName: 'Sarah Lee', category: 'Mobile', duration: 45, price: 249, status: 'Active', description: 'Create cross-platform mobile applications using React Native and Expo.', createdDate: '2024-03-10', rating: 4.8, studentsCount: 310, updatedDate: '2024-05-15', updatedBy: 'Sarah Lee' },
        { id: 5, courseName: 'Docker & Kubernetes DevOps', instructorName: 'David Wilson', category: 'DevOps', duration: 50, price: 349, status: 'Archived', description: 'Containerize applications and orchestrate them with Kubernetes in production environments.', createdDate: '2024-03-22', rating: 4.6, studentsCount: 145 },
        { id: 6, courseName: 'Advanced TypeScript', instructorName: 'John Smith', category: 'Frontend', duration: 25, price: 129, status: 'Active', description: 'Deep dive into generics, decorators, and advanced type features of TypeScript.', createdDate: '2024-04-05', rating: 4.4, studentsCount: 200 },
        { id: 7, courseName: 'Python Data Science', instructorName: 'Emily Chen', category: 'Backend', duration: 55, price: 279, status: 'Draft', description: 'Analyze and visualize data using Python, Pandas, NumPy, and Matplotlib.', createdDate: '2024-04-18', rating: 4.3, studentsCount: 88 },
        { id: 8, courseName: 'Figma Masterclass', instructorName: 'Mike Johnson', category: 'Design', duration: 20, price: 99, status: 'Active', description: 'Design beautiful interfaces and interactive prototypes with Figma from scratch.', createdDate: '2024-05-02', rating: 4.9, studentsCount: 420 },
        { id: 9, courseName: 'iOS Development with Swift', instructorName: 'Sarah Lee', category: 'Mobile', duration: 65, price: 329, status: 'Active', description: 'Build native iOS applications using Swift and SwiftUI following Apple design guidelines.', createdDate: '2024-05-20', rating: 4.7, studentsCount: 175 },
        { id: 10, courseName: 'CI/CD Pipelines', instructorName: 'David Wilson', category: 'DevOps', duration: 35, price: 219, status: 'Archived', description: 'Automate build, test, and deployment workflows using GitHub Actions and Jenkins.', createdDate: '2024-06-01', rating: 4.2, studentsCount: 130 },
        { id: 11, courseName: 'Vue.js Essentials', instructorName: 'Jane Doe', category: 'Frontend', duration: 38, price: 179, status: 'Draft', description: 'Get productive with Vue 3 composition API, routing, and state management.', createdDate: '2024-06-14', rating: 4.6, studentsCount: 220 },
        { id: 12, courseName: 'GraphQL APIs', instructorName: 'Emily Chen', category: 'Backend', duration: 42, price: 259, status: 'Active', description: 'Design and consume GraphQL APIs with Apollo Server and Apollo Client.', createdDate: '2024-06-28', rating: 4.8, studentsCount: 290 }
    ];
}

function loadCourses(): Course[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
        try { return JSON.parse(raw) as Course[]; } catch { /* fall through */ }
    }
    const data = seedData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
}

function saveCourses(courses: Course[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
}

@Injectable({ providedIn: 'root' })
export class CoursesBackendService {
    private courses: Course[];

    constructor() {
        this.courses = loadCourses();
    }

    getAll(): Observable<Course[]> {
        return of([...this.courses]).pipe(delay(400));
    }

    getById(id: number): Observable<Course | undefined> {
        const course = this.courses.find(c => c.id === id);
        return of(course).pipe(delay(300));
    }

    getStats(): CourseStats {
        return {
            total: this.courses.length,
            active: this.courses.filter(c => c.status === 'Active').length,
            draft: this.courses.filter(c => c.status === 'Draft').length,
            archived: this.courses.filter(c => c.status === 'Archived').length
        };
    }

    create(data: Partial<Course>): Observable<Course> {
        const newId = this.courses.length > 0 ? Math.max(...this.courses.map(c => c.id)) + 1 : 1;
        const course: Course = {
            ...data as any,
            id: newId,
            status: (data.status || 'Draft') as CourseStatus,
            createdDate: new Date().toISOString().split('T')[0]
        };
        return of(course).pipe(delay(400)).pipe(tap(() => {
            this.courses.unshift(course);
            saveCourses(this.courses);
        }));
    }

    update(id: number, data: Partial<Course>): Observable<Course> {
        const index = this.courses.findIndex(c => c.id === id);
        if (index === -1) return throwError(() => new Error('Course not found'));
        const updated = { ...this.courses[index], ...data, id };
        return of(updated).pipe(delay(400), tap(() => {
            this.courses[index] = updated;
            saveCourses(this.courses);
        }));
    }

    delete(id: number): Observable<void> {
        const index = this.courses.findIndex(c => c.id === id);
        if (index === -1) return throwError(() => new Error('Course not found'));
        return of(void 0).pipe(delay(300)).pipe(tap(() => {
            this.courses.splice(index, 1);
            saveCourses(this.courses);
        }));
    }
}
