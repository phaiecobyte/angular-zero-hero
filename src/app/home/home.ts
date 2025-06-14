import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  template: `
    <main class="main">
      <div class="content">
        <div class="left-side">
          <h1>Hello, Angular Zero Hero</h1>
          <p>Congratulations! Your app is running. 🎉</p>
          
          <!-- Admin navigation button -->
          <div style="margin-top: 2rem;">
            <a 
              routerLink="/admin" 
              class="admin-button">
              Go to Admin Dashboard Sample 1
            </a>
          </div>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .main {
      width: 100%;
      min-height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
    }
    
    .content {
      display: flex;
      justify-content: center;
      width: 100%;
      max-width: 700px;
    }
    
    .admin-button {
      display: inline-block;
      background-color: #3f51b5;
      color: white;
      padding: 10px 20px;
      border-radius: 4px;
      text-decoration: none;
      font-weight: bold;
      transition: background-color 0.3s;
    }
    
    .admin-button:hover {
      background-color: #303f9f;
    }
  `]
})
export class Home {
  title = 'angular-zero-hero';
}