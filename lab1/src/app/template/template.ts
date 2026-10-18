import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-template',
  imports: [MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, RouterModule, MatMenuModule, MatButtonModule, RouterOutlet, RouterLink],
  templateUrl: './template.html',
  styleUrl: './template.css',
})
export class Template {
  constructor(private AS: AuthService,
    private router: Router) { }
  logout() {
    // Implementation fo    
    this.AS.signOut();
    this.router.navigate(['/login']);
    console.log('Logout clicked');

  }
}
