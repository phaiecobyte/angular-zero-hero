import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  imports: [CommonModule,RouterModule],
  templateUrl: './left-sidebar.html',
  styleUrl: './left-sidebar.scss'
})
export class LeftSidebar {
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  items = [
      { 
          label: 'Dashboard', 
          icon: 'fa-solid fa-home', 
          routeLink: '/admin/dashboard'
      },
      { 
          label: 'Products', 
          icon: 'fa-solid fa-box-open', 
          routeLink: '/admin/products' 
      },
      { 
          label: 'Pages', 
          icon: 'fa-solid fa-file', 
          routeLink: '/admin/pages' 
      },
      { 
          label: 'Settings', 
          icon: 'fa-solid fa-cog', 
          routeLink: '/admin/settings' 
      },
      {
        label:'Go Back',
        icon:'fa-solid fa-backward-step',
        routeLink:'/'
      }
    ]

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}
