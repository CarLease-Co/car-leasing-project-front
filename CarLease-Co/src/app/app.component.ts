import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CrumbsComponent } from './layout/crumbs/crumbs.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CrumbsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'CarLease-Co';
}
