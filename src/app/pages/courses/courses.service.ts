import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Course } from './courses.model';

export interface CourseStats {
    total: number;
    active: number;
    draft: number;
    archived: number;
}

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    private courses: Course[] = [
        {
            id: 1,
            courseName: 'Introduction to Angular',
            instructorName: 'John Smith',
            category: 'Frontend',
            duration: 40,
            price: 199,
            status: 'Active',
            description:
                'Learn the fundamentals of the Angular framework, components, services, and reactive forms to build modern web applications.',
            createdDate: '2024-01-15'
        },
        {
            id: 2,
            courseName: 'Node.js Backend Development',
            instructorName: 'Jane Doe',
            category: 'Backend',
            duration: 60,
            price: 299,
            status: 'Active',
            description:
                'Build scalable and secure backend applications with Node.js, Express, and MongoDB.',
            createdDate: '2024-02-01'
        },
        {
            id: 3,
            courseName: 'UI/UX Design Principles',
            instructorName: 'Mike Johnson',
            category: 'Design',
            duration: 30,
            price: 149,
            status: 'Draft',
            description:
                'Master the art of user interface and experience design with practical, hands-on projects.',
            createdDate: '2024-02-15'
        },
        {
            id: 4,
            courseName: 'React Native for Mobile',
            instructorName: 'Sarah Lee',
            category: 'Mobile',
            duration: 45,
            price: 249,
            status: 'Active',
            description:
                'Create cross-platform mobile applications using React Native and Expo.',
            createdDate: '2024-03-10'
        },
        {
            id: 5,
            courseName: 'Docker & Kubernetes DevOps',
            instructorName: 'David Wilson',
            category: 'DevOps',
            duration: 50,
            price: 349,
            status: 'Archived',
            description:
                'Containerize applications and orchestrate them with Kubernetes in production environments.',
            createdDate: '2024-03-22'
        },
        {
            id: 6,
            courseName: 'Advanced TypeScript',
            instructorName: 'John Smith',
            category: 'Frontend',
            duration: 25,
            price: 129,
            status: 'Active',
            description:
                'Deep dive into generics, decorators, and advanced type system features of TypeScript.',
            createdDate: '2024-04-05'
        },
        {
            id: 7,
            courseName: 'Python Data Science',
            instructorName: 'Emily Chen',
            category: 'Backend',
            duration: 55,
            price: 279,
            status: 'Draft',
            description:
                'Analyze and visualize data using Python, Pandas, NumPy, and Matplotlib.',
            createdDate: '2024-04-18'
        },
        {
            id: 8,
            courseName: 'Figma Masterclass',
            instructorName: 'Mike Johnson',
            category: 'Design',
            duration: 20,
            price: 99,
            status: 'Active',
            description:
                'Design beautiful interfaces and interactive prototypes with Figma from scratch.',
            createdDate: '2024-05-02'
        },
        {
            id: 9,
            courseName: 'iOS Development with Swift',
            instructorName: 'Sarah Lee',
            category: 'Mobile',
            duration: 65,
            price: 329,
            status: 'Active',
            description:
                'Build native iOS applications using Swift and SwiftUI following Apple design guidelines.',
            createdDate: '2024-05-20'
        },
        {
            id: 10,
            courseName: 'CI/CD Pipelines',
            instructorName: 'David Wilson',
            category: 'DevOps',
            duration: 35,
            price: 219,
            status: 'Archived',
            description:
                'Automate build, test, and deployment workflows using GitHub Actions and Jenkins.',
            createdDate: '2024-06-01'
        },
        {
            id: 11,
            courseName: 'Vue.js Essentials',
            instructorName: 'Jane Doe',
            category: 'Frontend',
            duration: 38,
            price: 179,
            status: 'Draft',
            description:
                'Get productive with Vue 3 composition API, routing, and state management.',
            createdDate: '2024-06-14'
        },
        {
            id: 12,
            courseName: 'GraphQL APIs',
            instructorName: 'Emily Chen',
            category: 'Backend',
            duration: 42,
            price: 259,
            status: 'Active',
            description:
                'Design and consume GraphQL APIs with Apollo Server and Apollo Client.',
            createdDate: '2024-06-28'
        }
    ];

    constructor() { }

    getAllCourses(): Observable<Course[]> {
        return of(this.courses).pipe(delay(700));
    }

    getCourseById(id: number): Observable<Course | undefined> {
        const course = this.courses.find((c) => c.id === id);
        return of(course).pipe(delay(500));
    }

    getStats(): CourseStats {
        return {
            total: this.courses.length,
            active: this.courses.filter((c) => c.status === 'Active').length,
            draft: this.courses.filter((c) => c.status === 'Draft').length,
            archived: this.courses.filter((c) => c.status === 'Archived').length
        };
    }

    createCourse(course: Partial<Course>): Observable<Course> {
        const newId = Math.max(...this.courses.map((c) => c.id), 0) + 1;
        const newCourse = {
            ...course,
            id: newId,
            createdDate: new Date().toISOString().split('T')[0]
        } as Course;
        this.courses.push(newCourse);
        return of(newCourse).pipe(delay(600));
    }

    updateCourse(id: number, course: Partial<Course>): Observable<Course> {
        const index = this.courses.findIndex((c) => c.id === id);
        if (index !== -1) {
            this.courses[index] = { ...this.courses[index], ...course, id } as Course;
            return of(this.courses[index]).pipe(delay(600));
        }
        return throwError(() => new Error('Course not found'));
    }

    deleteCourse(id: number): Observable<void> {
        const index = this.courses.findIndex((c) => c.id === id);
        if (index === -1) {
            return throwError(() => new Error('Course not found'));
        }
        this.courses.splice(index, 1);
        return of(void 0).pipe(delay(500));
    }
}