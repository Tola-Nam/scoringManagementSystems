import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScoringManagementSystemAdminPageComponent } from './components/scoring-management-system-admin-page/scoring-management-system-admin-page.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ScoringManagementSystemAdminPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'scoring-management-systems';
}
