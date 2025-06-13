import { Component, Input } from "@angular/core";

@Component({
    selector: "app-input",
    template: `
        <div class="mb-3">
            <label [for]="id" class="form-label">{{label}}</label>
            <input type={{type}} 
                   [id]="id"
                   [placeholder]="placeholder"
                   class="form-control">
        </div>
    `,
})

export class InputComponent {
    @Input() label?:string;
    @Input() type: 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'number' | 'month' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week' | undefined;
    @Input() id=`input-${Math.random().toString(36).substring(2,9)}`;
    @Input() placeholder='';
}
