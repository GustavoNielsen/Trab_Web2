// src/app/pages/efetuar-orcamento/efetuar-orcamento.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { NavbarFuncionarioComponent } from '../navbarfuncionario/navbarfuncionario.component';
import { SolicitacaoService } from '../../services/soliciticao.service';
import { ClienteService } from '../../services/cliente.service';
import { FuncionarioService } from '../../services/funcionario.service';
import { Solicitacao } from '../../shared/models/solicitacao';
import { Cliente } from '../../shared/models/cliente';

@Component({
  selector: 'app-efetuar-orcamento',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    RouterLink,
    NavbarFuncionarioComponent
  ],
  templateUrl: './efetuar-orcamento.component.html',
  styleUrls: ['./efetuar-orcamento.component.css']
})
export class EfetuarOrcamentoComponent implements OnInit {
  solicitacao!: Solicitacao;
  cliente!: Cliente;
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private solicitacaoSvc: SolicitacaoService,
    private clienteSvc: ClienteService,
    private funcSvc: FuncionarioService
  ) {}

  ngOnInit(): void {
    // 1) Captura o parâmetro 'dataHora' da rota; se não houver, redireciona.
    const dataHoraParam = this.route.snapshot.paramMap.get('dataHora');
    if (!dataHoraParam) {
      this.router.navigate(['/paginainicialfuncionario']);
      return;
    }

    // 2) Busca a solicitação pela data/hora (no formato ISO) e atribui a this.solicitacao.
    const solicitacaoEncontrada = this.solicitacaoSvc.buscarSolicitacaoPorDataHora(dataHoraParam);
    if (!solicitacaoEncontrada) {
      // Se não encontrar a solicitação, redireciona.
      this.router.navigate(['/paginainicialfuncionario']);
      return;
    }
    this.solicitacao = solicitacaoEncontrada;

    // 3) Busca o cliente associado ao CPF da solicitação e atribui a this.cliente.
    const clienteEncontrado = this.clienteSvc.buscarPorcpf(this.solicitacao.cpfCliente);
    if (!clienteEncontrado) {
      this.router.navigate(['/paginainicialfuncionario']);
      return;
    }
    this.cliente = clienteEncontrado;

    // 4) Inicializa o formulário (mesmo se, por enquanto, a preocupação seja carregar os dados)
    this.form = this.fb.group({
      valor: [null, [Validators.required, Validators.min(0.01)]],
      observacoes: ['']
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { valor, observacoes } = this.form.value;
    const funcionarioId = this.funcSvc.idLogado;
    console.log(funcionarioId)
    const agora = new Date();
    const dataHoraString = agora.toISOString(); 
    // Atualiza os atributos relacionados ao orçamento na solicitação
    this.solicitacao.valorOrcamento = valor;
    this.solicitacao.observacoesOrcamento = observacoes;
    this.solicitacao.dataHoraOrcamento = dataHoraString;
    this.solicitacao.idFuncionario = funcionarioId;
    this.solicitacao.estado = 'Orçada';

    // Obtém a data/hora da solicitação em formato ISO para identificar o registro a ser atualizado.
    const dataHoraIdentificador = new Date(this.solicitacao.dataHora).toISOString();

    // Registra o orçamento (persistindo as alterações via serviço)
    this.solicitacaoSvc.registrarOrcamento(
      dataHoraIdentificador,
      valor,
      observacoes,
      funcionarioId
    );

    // Redireciona de volta para a página inicial do funcionário
    this.router.navigate(['/paginainicialfuncionario']);
  }

  // O método 'salvar' e outros podem ser implementados posteriormente.
  cancelar(): void {
    this.router.navigate(['/paginainicialfuncionario']);
  }
}
