import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/api/auth/auth.service.service';
import { StudentsServiceService } from 'src/app/api/students-service/students-service.service';
interface StatCard {
  icon: string;
  label: string;
  value: number;
  bg: string;
}

export interface Student {
  id: string;
  studentCode: string;
  classId: string;
  khFirstName: string;
  khLastName: string;
  enFirstName: string;
  enLastName: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  address: {
    houseNumber: string | null;
    street: string;
    sangkat: string;
    khan: string;
    province: string;
    country: string;
  };
  status: boolean;
}

export interface ApiResponse {
  content: Student[];
  number: number;
  size: number;
  totalPage: number;
  totalElement: number;
}
@Component({
  selector: 'app-student-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-management.component.html',
  styleUrl: './student-management.component.scss'
})
export class StudentManagementComponent {
  students: any[] = [];
  showStep: boolean = false;

  stats: StatCard[] = [
    { icon: 'fa-solid fa-users', label: 'Students', value: 2000, bg: 'bg-blue-50' },
    { icon: 'fa-solid fa-venus', label: 'Female', value: 120, bg: 'bg-pink-50' },
    { icon: 'fa-solid fa-mars', label: 'Male', value: 2115, bg: 'bg-orange-50' },
    { icon: 'fa-solid fa-users', label: 'Staff', value: 82, bg: 'bg-teal-50' },
  ];

  constructor(private fb: FormBuilder, private router: Router, private studentsService: StudentsServiceService, private authService: AuthServiceService) {
    this.getAllStudents();

  }
  getAllStudents() {
    this.studentsService.getAllStudents().subscribe({
      next: (res: ApiResponse) => {
        this.students = res.content;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  handleToggleStep() {
    this.showStep = !this.showStep;
  }
}
