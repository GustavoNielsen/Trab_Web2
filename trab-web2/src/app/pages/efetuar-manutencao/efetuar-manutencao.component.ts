import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-efetuar-manutencao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './efetuar-manutencao.component.html',
  styleUrls: ['./efetuar-manutencao.component.css']
})
export class EfetuarManutencaoComponent implements OnInit {
  solicitacao: any = {
    id: 1,
    descricaoProduto: 'Notebook Dell Latitude E6420',
    categoria: 'Notebook',
    defeito: 'Não liga',
    dataHora: new Date('2024-09-20T10:00:00'),
    estado: 'ABERTA',
    nomeCliente: 'João Silva'
  };

  funcionarios: string[] = ['Funcionario A', 'Funcionario B', 'Funcionario C'];
  funcionarioLogado = 'Funcionario Logado';
  estado: string = '';
  descricaoManutencao: string = '';
  orientacoesCliente: string = '';
  funcionarioDestino: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  efetuarManutencao(): void {
    this.estado = 'MANUTENCAO';
  }

  redirecionarManutencao(): void {
    this.estado = 'REDIRECIONAMENTO';
  }

  confirmarManutencao(): void {
    const dataHoraManutencao = new Date();
    this.solicitacao.estado = 'ARRUMADA';
    // Salvar os dados da manutenção e a data/hora
    console.log('Manutenção realizada:', {
      descricaoManutencao: this.descricaoManutencao,
      orientacoesCliente: this.orientacoesCliente,
      dataHoraManutencao,
      funcionario: this.funcionarioLogado
    });
    // Redireciona para a tela de visualização de serviços
    this.router.navigate(['/visualizar-servicos-funcionario']);
  }

  confirmarRedirecionamento(): void {
    const dataHoraRedirecionamento = new Date();
    this.solicitacao.estado = 'REDIRECIONADA';
    // Salvar o redirecionamento
    console.log('Redirecionamento realizado:', {
      funcionarioOrigem: this.funcionarioLogado,
      funcionarioDestino: this.funcionarioDestino,
      dataHoraRedirecionamento
    });
    // Redireciona para a tela de visualização de serviços
    this.router.navigate(['/visualizar-servicos-funcionario']);
  }
}
