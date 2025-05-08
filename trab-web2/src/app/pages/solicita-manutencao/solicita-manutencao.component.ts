// pages/solicita-manutencao/solicita-manutencao.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitacaoService } from '../../services/soliciticao.service';
import { ClienteService } from '../../services/cliente.service';
import { Solicitacao } from '../../shared/models/solicitacao';
import { NavbarComponent } from '../navbar/navbar.component';
import { Historicosolicitacao } from '../../shared/models/historicosolicitacao';
import { EquipamentoService } from '../../services/equipamento.service';
import { Equipamento } from '../../shared/models/equipamento';

@Component({
  selector: 'app-solicita-manutencao',
  templateUrl: './solicita-manutencao.component.html',
  standalone: true,
  styleUrls: ['./solicita-manutencao.component.css'],
  imports: [CommonModule, FormsModule, NavbarComponent]
})
export class SolicitaManutencaoComponent implements OnInit {
  cpf: string = '';
  descricaoEquipamento: string = '';
  categoriaEquipamento: string = '';
  descricaoDefeito: string = '';
  id = ''
  equipamentos: Equipamento[] = []
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private solicitacaoService: SolicitacaoService,
    private clienteService: ClienteService,
    private equipamentoService: EquipamentoService
  ) {}


  ngOnInit(): void {
    this.cpf = this.clienteService.cpfLogado;
    this.equipamentos = this.equipamentoService.listarTodos()

  }
  enviarSolicitacao(): void {

    const agora = new Date();
    const dataHoraString = agora.toISOString(); 

    const historicoInicial = new Historicosolicitacao(
      dataHoraString,    
      'Aberta',          
      this.id,           
      'Solicitação criada' 
    );

    const novaSolicitacao = new Solicitacao(
      dataHoraString,
      this.descricaoEquipamento,
      this.categoriaEquipamento,
      this.descricaoDefeito,
      'Aberta',
      this.cpf,
      this.id,
      0,
      '',
      '',
      '',
      '',
      '',
      [historicoInicial],
      '',
      '',
      '',
      '',
      ''
    );
    this.solicitacaoService.adicionarSolicitacao(novaSolicitacao);
    console.log('Solicitação adicionada: ', novaSolicitacao);
    this.router.navigate(['/paginainicialcliente']);
  }
}
