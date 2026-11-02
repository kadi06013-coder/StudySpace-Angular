
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../services/student';

@Component({
  selector: 'app-students',
  imports: [FormsModule],
  templateUrl: './students.html',
  styleUrl: './students.css'
})
export class Students {

  studentName: string = 'ahmed';
  studentAge: number = 20;
  searchText: string = '';

  students: string[] = [];

  notification: string = '';
  notificationType: string = '';
  private notificationTimer: ReturnType<typeof setTimeout> | undefined;
  isEditing: boolean = false;
  oldStudentName: string = '';
  newStudentName: string = '';
  startEdit(student: string): void {
    this.oldStudentName = student;
    this.newStudentName = student;
    this.isEditing = true;

  }
  saveEdit(): void {
    const result = this.studentService.editStudent(
      this.oldStudentName,
      this.newStudentName
    );

    if (result === 'success') {
      this.showNotification('Student updated successfully!', 'success');
      this.isEditing = false;
    } else if (result === 'exists') {
      this.showNotification('Student already exists!', 'error');
    } else if (result === 'notfound') {
      this.showNotification('Student not found!', 'error');
    } else {
      this.showNotification('Please enter a valid name!', 'error');
    }
    if (result === 'invalid') {
      this.showNotification('Name must contain at least 2 characters!', 'error');
    }
  }

  constructor(private studentService: StudentService) {
    this.students = this.studentService.getStudents();
  }

  get filteredStudents(): string[] {
    return this.students.filter(student =>
      student.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  addStudent(name: string): void {
    const result = this.studentService.addStudent(name);

    if (result === 'success') {
      this.showNotification('Student added successfully!', 'success');
    } else if (result === 'exists') {
      this.showNotification('Student already exists!', 'error');
    } else {
      this.showNotification('Please enter a student name!', 'error');
    }
    if (result === 'invalid') {
      this.showNotification('Name must contain at least 2 characters!', 'error');
    }

  }


  editStudent(oldName: string, newName: string): void {
    const result = this.studentService.editStudent(oldName, newName);

    if (result === 'success') {
      this.showNotification('Student updated successfully!', 'success');
    } else if (result === 'exists') {
      this.showNotification('Student already exists!', 'error');
    } else if (result === 'notfound') {
      this.showNotification('Student not found!', 'error');
    } else {
      this.showNotification('Please enter a valid name!', 'error');
    }
  }

  deleteStudent(name: string): void {
    const confirmed = confirm(`Are you sure you want to delete ${name}?`);

    if (confirmed) {
      this.studentService.deleteStudent(name);
      this.showNotification('Student deleted successfully!', 'success');
    }
  }

  showNotification(message: string, type: string): void {
    this.notification = message;
    this.notificationType = type;

    if (this.notificationTimer) {
      clearTimeout(this.notificationTimer);
    }

    this.notificationTimer = setTimeout(() => {
      this.notification = '';
      this.notificationType = '';
    }, 3000);
  }
}
