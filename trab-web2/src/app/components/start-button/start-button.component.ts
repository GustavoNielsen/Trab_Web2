import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-start-button',
  imports: [],
  templateUrl: './start-button.component.html',
  styleUrl: './start-button.component.css'
})
export class StartButtonComponent {
  @Input()  textButton!: string;
}
