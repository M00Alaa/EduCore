import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from './courses.model';

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
            description: 'Learn the fundamentals of Angular framework',
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
            description: 'Build scalable backend applications with Node.js',
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
            description: 'Master the art of user interface design',
            createdDate: '2024-02-15'
        }
    ];

    constructor() { }

    getAllCourses(): Observable<Course[]> {
        return of(this.courses);
    }

    getCourseById(id: number): Observable<Course | undefined> {
        const course = this.courses.find(c => c.id === id);
        return of(course);
    }

    createCourse(course: Partial<Course>): Observable<Course> {
        const newId = Math.max(...this.courses.map(c => c.id), 0) + 1;
        const newCourse = { ...course, id: newId } as Course;
        this.courses.push(newCourse);
        return of(newCourse);
    }

    updateCourse(id: number, course: Partial<Course>): Observable<Course> {
        const index = this.courses.findIndex(c => c.id === id);
        if (index !== -1) {
            this.courses[index] = { ...course, id } as Course;
            return of(this.courses[index]);
        }
        throw new Error('Course not found');
    }

    deleteCourse(id: number): Observable<void> {
        const index = this.courses.findIndex(c => c.id === id);
        if (index !== -1) {
            this.courses.splice(index, 1);
        }
        return of(void 0);
    }
}