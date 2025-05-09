import { Component } from '@angular/core';

@Component({
  selector: 'app-solicita-manutencao',
  imports: [],
  templateUrl: './solicita-manutencao.component.html',
  styleUrl: './solicita-manutencao.component.css'
})
export class SolicitaManutencaoComponent {

<<<<<<< Updated upstream
=======

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
      '',
      ''
    );
    this.solicitacaoService.adicionarSolicitacao(novaSolicitacao);
    console.log('Solicitação adicionada: ', novaSolicitacao);
    this.router.navigate(['/paginainicialcliente']);
  }
>>>>>>> Stashed changes
}
