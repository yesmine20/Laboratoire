
import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { Template } from './template/template';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Template, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('lab1');

  b = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Vérifier l'URL dès le démarrage
    this.b = this.router.url.startsWith('/login');

    // Mettre à jour après chaque navigation
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.b = event.urlAfterRedirects.startsWith('/login');
      });
  }
}
