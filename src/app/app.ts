import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Approach2 } from './modal/approach-2/approach2';

@Component({
  selector: 'app-root',
  imports: [Approach2,RouterOutlet],
  template: `
    <app-approach2/>
    <router-outlet/>
  `,
})
export class App {
  protected title = 'angular-zero-hero';
}
