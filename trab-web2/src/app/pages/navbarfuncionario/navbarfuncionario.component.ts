import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario.service';


@Component({
  selector: 'app-navbarfuncionario',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './navbarfuncionario.component.html',
  styleUrl: './navbarfuncionario.component.css'
})
export class NavbarFuncionarioComponent implements OnInit {
  tipo: string = '';

  constructor(private funcionarioService: FuncionarioService) {}

  ngOnInit() {
    
  }
}
