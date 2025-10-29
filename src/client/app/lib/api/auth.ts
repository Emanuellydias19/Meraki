import { apiCall } from "./client";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  full_name: string;
  email: string;
  password: string;
  wallet_public_key?: string;
}

export interface AuthResponse {
  token: string;
}

export interface User {
  id: string;
  full_name: string;
  email: string;
  wallet_public_key?: string;
  created_at: string;
  updated_at: string;
}

/**
 * API de Autenticação
 */
export const authApi = {
  /**
   * Realiza login com email e senha
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiCall<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    // Salvar token no localStorage
    if (response.token) {
      localStorage.setItem("auth_token", response.token);
    }

    return response;
  },

  /**
   * Realiza cadastro de novo usuário
   */
  async signup(data: SignupRequest): Promise<User> {
    return apiCall<User>("/users", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  /**
   * Faz logout (limpa token)
   */
  logout() {
    localStorage.removeItem("auth_token");
  },

  /**
   * Retorna o token de autenticação atual
   */
  getToken(): string | null {
    return localStorage.getItem("auth_token");
  },

  /**
   * Verifica se usuário está autenticado
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  /**
   * Retorna headers com token de autenticação
   */
  getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};
