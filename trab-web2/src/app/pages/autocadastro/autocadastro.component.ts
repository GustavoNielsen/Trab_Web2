import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-autocadastro',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AutocadastroComponent],
  templateUrl: './autocadastro.component.html',
  styleUrl: './autocadastro.component.css'
})
export class AutocadastroComponent {

}
