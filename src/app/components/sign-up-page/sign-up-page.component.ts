import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent {

  loginForm: FormGroup;
  passwordVisible = false;

  passwordStrength = 0;
  strengthLabel = 'No password';

  strengthBars = [1, 2, 3, 4];

  constructor(private fb: FormBuilder) {

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [true]
    });

    this.loginForm.get('password')?.valueChanges.subscribe(value => {
      this.checkPasswordStrength(value);
    });
  }

  // getters
  get usernameControl() {
    return this.loginForm.get('username');
  }

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  handleSignupAdminPage() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    console.log(this.loginForm.value);

    Swal.fire({
      icon: 'success',
      title: 'Login Successful',
      text: 'Welcome back!',
      confirmButtonColor: '#3b82f6'
    });

  }

  // password strength
  checkPasswordStrength(password: string) {

    let strength = 0;

    if (!password) {
      this.passwordStrength = 0;
      this.strengthLabel = 'No password';
      return;
    }

    if (password.length >= 6) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^A-Za-z0-9]/)) strength++;

    this.passwordStrength = strength;

    const labels = [
      'Very Weak',
      'Weak',
      'Medium',
      'Strong',
      'Very Strong'
    ];

    this.strengthLabel = labels[strength];
  }

  getBarColor(level: number) {

    if (this.passwordStrength >= level) {

      if (this.passwordStrength <= 1) return 'bg-error';
      if (this.passwordStrength == 2) return 'bg-warning';
      if (this.passwordStrength == 3) return 'bg-info';
      if (this.passwordStrength >= 4) return 'bg-success';

    }

    return 'bg-base-300';
  }

}