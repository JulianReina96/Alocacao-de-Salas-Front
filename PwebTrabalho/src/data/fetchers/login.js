import { DataFetcher } from "./DataFetcher";

/**
 * 
 * @extends DataFetcher
 * 
 * @method login - Método que faz uma requisição POST para a API e retorna um objeto de usuário
 */
export class LoginFetcher extends DataFetcher {
  async login(email, senha) {
    return await this.httpService.login("/authenticate", email, senha);
  }
  async loginWithGoogle(accessToken) {
    return await this.httpService.loginWithGoogle("/authenticate/google", accessToken);
  }
}
