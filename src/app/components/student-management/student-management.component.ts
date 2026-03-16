import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/api/auth/auth.service.service';
import { StudentsServiceService } from 'src/app/api/students-service/students-service.service';
@Component({
  selector: 'app-student-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-management.component.html',
  styleUrl: './student-management.component.scss'
})
export class StudentManagementComponent {
  students: any[] = [];
  constructor(private fb: FormBuilder, private router: Router, private studentsService: StudentsServiceService, private authService: AuthServiceService) {
    this.getAllStudents();

  }
  getAllStudents() {
    this.studentsService.getAllStudents().subscribe({
      next: (res) => {
        this.students = res;
        // console.log(res);
        console.log(this.students)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
