// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';

export type UserType = 'cliente' | 'funcionario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'app_auth';

  /**
   * Guarda no localStorage: { tipo, id }
   */
  login(tipo: UserType, id: string): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify({ tipo, id }));
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Retorna sessao ou null
   */
  get session(): { tipo: UserType; id: string } | null {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  isLoggedIn(): boolean {
    return this.session !== null;
  }

  get userType(): UserType | null {
    return this.session?.tipo ?? null;
  }

  get userId(): string | null {
    return this.session?.id ?? null;
  }
}
