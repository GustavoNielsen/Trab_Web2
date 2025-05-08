import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Solicitacao } from '../../shared/models/solicitacao';
import { Cliente } from '../../shared/models/cliente';
import { SolicitacaoService } from '../../services/soliciticao.service';
import { FuncionarioService } from '../../services/funcionario.service';
import { ClienteService } from '../../services/cliente.service';
import { NavbarFuncionarioComponent } from '../navbarfuncionario/navbarfuncionario.component';
import { Funcionario } from '../../shared/models/funcionario';
import { Historicosolicitacao } from '../../shared/models/historicosolicitacao';

@Component({
  selector: 'app-efetuar-manutencao',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NavbarFuncionarioComponent
  ],
  templateUrl: './efetuar-manutencao.component.html',
  styleUrls: ['./efetuar-manutencao.component.css']
})
export class EfetuarManutencaoComponent implements OnInit {
  solicitacao!: Solicitacao;
  cliente!: Cliente;
  exibirFormularioManutencao: boolean = false;
  descricaoManutencao: string = '';
  orientacoesCliente: string = '';
  destinoFuncionarioId = '';
  funcionarios: Funcionario[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private solicitacaoSvc: SolicitacaoService,
    private clienteSvc: ClienteService,
    private funcSvc: FuncionarioService
  ) {}

  ngOnInit(): void {
    // Atualizado: captura o parâmetro 'dataHota' da rota
    const dataHoraParam = this.route.snapshot.paramMap.get('dataHora');
    if (!dataHoraParam) {
      this.router.navigate(['/paginainicialfuncionario']);
      return;
    }

    // Busca a solicitação pela data/hora (formato ISO) usando o parâmetro "dataHota"
    const solicitacaoEncontrada = this.solicitacaoSvc.buscarSolicitacaoPorDataHora(dataHoraParam);
    if (!solicitacaoEncontrada) {
      this.router.navigate(['/paginainicialfuncionario']);
      return;
    }
    this.solicitacao = solicitacaoEncontrada;

    this.funcionarios = this.funcSvc.listarTodos().filter(f => f.dataNascimento !== this.solicitacao.idFuncionario);

    // Busca o cliente associado (por CPF) da solicitação e atribui a this.cliente.
    const clienteEncontrado = this.clienteSvc.buscarPorcpf(this.solicitacao.cpfCliente);
    if (!clienteEncontrado) {
      this.router.navigate(['/paginainicialfuncionario']);
      return;
    }
    this.cliente = clienteEncontrado;
  }

  

  /**
   * Exibe o formulário para efetuar manutenção.
   */
  toggleManutencao(): void {
    this.exibirFormularioManutencao = true;
  }

  /**
   * Registra as informações de manutenção, atualiza o estado da solicitação
   * para 'ARRUMADA', persiste as alterações e redireciona para a página inicial.
   */
  confirmarManutencao(): void {
    if (!this.descricaoManutencao.trim() || !this.orientacoesCliente.trim()) {
      alert('Por favor, preencha todos os campos de manutenção.');
      return;
    }

    // Atualiza os atributos da solicitação relacionados à manutenção
    this.solicitacao.descricaoManutencao = this.descricaoManutencao;
    this.solicitacao.orientacaoCliente = this.orientacoesCliente; // Propriedade definida no modelo
    this.solicitacao.estado = 'Arrumada';
    this.solicitacao.dataHoraManutencao = new Date().toISOString()
    const historico = new Historicosolicitacao(this.solicitacao.dataHoraManutencao, this.solicitacao.estado, this.solicitacao.idFuncionario, this.solicitacao.observacoesOrcamento)
    this.solicitacao.historicoSolicitacao.push(historico)
    // Atualiza a solicitação via serviço (persistindo no localStorage)
    this.atualizarSolicitacao();

    // Redireciona para a página inicial do funcionário
    this.router.navigate(['/paginainicialfuncionario']);
  }

  redirecionarManutencao(): void {
    if (!this.destinoFuncionarioId) {
      alert('Selecione um funcionário para redirecionar.');
      return;
    }
    // chama o serviço que já persiste a mudança de idFuncionario e estado
    this.solicitacaoSvc.redirecionarManutencao(
      new Date(this.solicitacao.dataHora).toISOString(),
      this.destinoFuncionarioId
    );
    this.router.navigate(['/paginainicialfuncionario']);
  }


  atualizarSolicitacao(): void {
    const solicitacoes = this.solicitacaoSvc.recuperarSolicitacoes();
    const index = solicitacoes.findIndex(
      s => new Date(s.dataHora).toISOString() === new Date(this.solicitacao.dataHora).toISOString()
    );
    if (index !== -1) {
      solicitacoes[index] = this.solicitacao;
      localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));
    }
  }



  cancelar(): void {
    this.router.navigate(['/paginainicialfuncionario']);
  }
}
