import { Injectable } from '@angular/core';
import { Cliente } from '../shared/models/cliente';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private key = 'clientes';
  private sessionKey = 'logged_cliente';
  private _clienteLogado: Cliente | null = null;

  constructor() {
    const json = localStorage.getItem(this.sessionKey);
    if (json) this._clienteLogado = JSON.parse(json);
  }

  get clienteLogado(): Cliente | null {
    return this._clienteLogado;
  }

  login(email: string, senha: string): boolean {
    const found = this.listarTodos().find(c => c.email === email && c.senha === senha);
    if (found) {
      this._clienteLogado = found;
      localStorage.setItem(this.sessionKey, JSON.stringify(found));
      return true;
    }
    return false;
  }

  logout(): void {
    this._clienteLogado = null;
    localStorage.removeItem(this.sessionKey);
  }

  listarTodos(): Cliente[] {
    const json = localStorage.getItem(this.key);
    return json ? JSON.parse(json) : [];
  }

  buscarPorCpf(cpf: string): Cliente | undefined {
    return this.listarTodos().find(c => c.cpf === cpf);
  }

  buscarPorEmail(email: string): Cliente | undefined {
    return this.listarTodos().find(c => c.email === email);
  }

  inserir(c: Cliente): void {
    if (!this.buscarPorCpf(c.cpf)) {
      const list = this.listarTodos();
      list.push(c);
      this.save(list);
    }
  }

  atualizar(cpf: string, atualizado: Cliente): void {
    const list = this.listarTodos();
    const idx = list.findIndex(c => c.cpf === cpf);
    if (idx > -1) {
      list[idx] = atualizado;
      this.save(list);
    }
  }

  remover(cpf: string): void {
    const list = this.listarTodos().filter(c => c.cpf !== cpf);
    this.save(list);
  }

  resetSenha(cpf: string, novaSenha: string): boolean {
    const cliente = this.buscarPorCpf(cpf);
    if (cliente) {
      cliente.senha = novaSenha;
      this.atualizar(cpf, cliente);
      return true;
    }
    return false;
  }


  getPreferences(): any {
    return this._clienteLogado?.preferencias || {};
  }

  updatePreferences(pref: any): void {
    if (this._clienteLogado) {
      this._clienteLogado.preferencias = pref;
      this.save(this.listarTodos());
    }
  }

  count(): number {
    return this.listarTodos().length;
  }

  findByNamePattern(pattern: string): Cliente[] {
    const regex = new RegExp(pattern, 'i');
    return this.listarTodos().filter(c => regex.test(c.nome));
  }

  archiveCliente(cpf: string): void {
    const list = this.listarTodos().map(c =>
      c.cpf === cpf ? { ...c, archived: true } : c
    );
    this.save(list);
  }

  private save(list: Cliente[]): void {
    localStorage.setItem(this.key, JSON.stringify(list));
  }
}
