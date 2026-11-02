
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StudentService {

    students: string[] = [];

    constructor() {
        const savedStudents = localStorage.getItem('students');

        if (savedStudents) {
            this.students = JSON.parse(savedStudents);
        } else {
            this.students = ['Ahmed', 'Sara', 'Amine', 'Rim', 'Oussema'];
            this.saveStudents();
        }
    }

    saveStudents(): void {
        localStorage.setItem('students', JSON.stringify(this.students));
    }

    getStudents(): string[] {
        return this.students;
    }

    addStudent(name: string): string {
        const cleanName = name.trim();
        if (cleanName.length < 2) {
            return 'invalid';
        }

        if (!cleanName) {
            return 'empty';
        }

        const exists = this.students.some(
            student => student.toLowerCase() === cleanName.toLowerCase()
        );

        if (exists) {
            return 'exists';
        }

        this.students.push(cleanName);
        this.saveStudents();

        return 'success';
    }

    editStudent(oldName: string, newName: string): string {
        const index = this.students.indexOf(oldName);
        const cleanName = newName.trim();
        if (cleanName.length < 2) {
            return 'invalid';
        }

        if (!cleanName) {
            return 'empty';
        }

        if (index === -1) {
            return 'notfound';
        }

        const exists = this.students.some(
            student =>
                student !== oldName &&
                student.toLowerCase() === cleanName.toLowerCase()
        );

        if (exists) {
            return 'exists';
        }

        this.students[index] = cleanName;
        this.saveStudents();

        return 'success';
    }

    deleteStudent(name: string): void {
        const index = this.students.indexOf(name);

        if (index !== -1) {
            this.students.splice(index, 1);
            this.saveStudents();
        }
    }
}
