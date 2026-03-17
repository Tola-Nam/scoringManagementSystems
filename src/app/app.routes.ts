import { Routes } from '@angular/router';
import { LoginGuard } from './api/guard/login.guard';
import { ScoringManagementSystemAdminPageComponent } from './components/scoring-management-system-admin-page/scoring-management-system-admin-page.component';
import { SigninPageComponent } from './components/signin-page/signin-page.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { StudentManagementComponent } from './components/student-management/student-management.component';
import { OtpPageComponent } from './components/otp-page/otp-page.component';

export const routes: Routes = [
    { path: 'signin', component: SigninPageComponent },
    { path: 'signup', component: SignUpPageComponent },
    { path: 'otp', component: OtpPageComponent },

    {
        path: '',
        component: ScoringManagementSystemAdminPageComponent,
        canActivate: [LoginGuard],
        canActivateChild: [LoginGuard],
        children: [
            { path: '', redirectTo: 'admin', pathMatch: 'full' },
            { path: 'admin', component: AdminPageComponent },
            { path: 'studentManagement', component: StudentManagementComponent },
            { path: 'students', component: StudentsListComponent },
            { path: 'adminPage', redirectTo: 'admin', pathMatch: 'full' }
        ]
    }
];
