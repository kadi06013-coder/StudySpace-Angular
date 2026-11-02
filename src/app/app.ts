import { Component, signal } from '@angular/core';
import { Students } from './students/students';

@Component({
  imports: [Students],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('student-management');
}