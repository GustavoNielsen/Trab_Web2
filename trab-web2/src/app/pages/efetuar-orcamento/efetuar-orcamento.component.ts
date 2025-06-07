import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavbarFuncionarioComponent } from '../navbarfuncionario/navbarfuncionario.component';
import { SolicitacaoService } from '../../services/soliciticao.service';
import { ClienteService } from '../../services/cliente.service';
import { FuncionarioService } from '../../services/funcionario.service';
import { Solicitacao } from '../../shared/models/solicitacao';
import { Cliente } from '../../shared/models/cliente';
import { Historicosolicitacao } from '../../shared/models/historicosolicitacao';

@Component({
  selector: 'app-efetuar-orcamento',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NavbarFuncionarioComponent
  ],
  templateUrl: './efetuar-orcamento.component.html',
  styleUrls: ['./efetuar-orcamento.component.css']
})
export class EfetuarOrcamentoComponent implements OnInit {
  solicitacao!: Solicitacao;
  cliente!: Cliente;
  form!: FormGroup;
  isLoading = true; // Variável para controlar o estado de carregamento da página

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private solicitacaoSvc: SolicitacaoService,
    private clienteSvc: ClienteService,
    private funcSvc: FuncionarioService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      valor: [null, [Validators.required, Validators.min(0.01)]],
      observacoes: ['']
    });

    const dataHoraParam = this.route.snapshot.paramMap.get('dataHora');
    if (!dataHoraParam) {
      this.router.navigate(['/paginainicialfuncionario']);
      return;
    }

    const solicitacaoEncontrada = this.solicitacaoSvc.buscarSolicitacaoPorDataHora(dataHoraParam);
    if (!solicitacaoEncontrada) {
      alert('Solicitação não encontrada.');
      this.router.navigate(['/paginainicialfuncionario']);
      return;
    }
    this.solicitacao = solicitacaoEncontrada;

    // CORRIGIDO: Agora usamos .subscribe() para esperar a resposta do serviço.
    // O ClienteService retorna um Observable, então precisamos nos inscrever nele.
    this.clienteSvc.buscarPorCpf(this.solicitacao.cpfCliente).subscribe({
      next: (clienteEncontrado) => {
        if (!clienteEncontrado) {
          alert('Cliente associado à solicitação não foi encontrado.');
          this.router.navigate(['/paginainicialfuncionario']);
          return;
        }
        this.cliente = clienteEncontrado;
        this.isLoading = false; // Finaliza o carregamento após receber os dados
      },
      error: (err) => {
        console.error('Erro ao buscar cliente:', err);
        alert('Ocorreu um erro ao carregar os dados do cliente.');
        this.isLoading = false;
        this.router.navigate(['/paginainicialfuncionario']);
      }
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // CORRIGIDO: Usamos a propriedade 'idLogado' do FuncionarioService.
    const funcionarioId = this.funcSvc.idLogado;
    if (!funcionarioId) {
      alert('Não foi possível identificar o funcionário logado. A operação foi cancelada.');
      return;
    }

    const { valor, observacoes } = this.form.value;

    this.solicitacao.valorOrcamento = valor;
    this.solicitacao.observacoesOrcamento = observacoes;
    this.solicitacao.dataHoraOrcamento = new Date().toISOString();
    this.solicitacao.idFuncionario = funcionarioId;
    this.solicitacao.estado = 'Orçada';

    const historico = new Historicosolicitacao(
      this.solicitacao.dataHoraOrcamento,
      this.solicitacao.estado,
      this.solicitacao.idFuncionario,
      observacoes
    );
    this.solicitacao.historicoSolicitacao.push(historico);

    // CORRIGIDO: Usamos o método 'atualizar' do serviço e navegamos apenas no sucesso.
    // Assumindo que o seu SolicitacaoService tem um método 'atualizar' que retorna um Observable.
    this.solicitacaoSvc.atualizar(this.solicitacao).subscribe({
      next: () => {
        alert('Orçamento salvo com sucesso!');
        this.router.navigate(['/paginainicialfuncionario']);
      },
      error: (err) => {
        console.error('Erro ao salvar o orçamento:', err);
        alert('Ocorreu uma falha ao salvar o orçamento.');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/paginainicialfuncionario']);
  }
}
