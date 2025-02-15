import { DataFetcher } from "./DataFetcher";

/**
 * 
 * @extends DataFetcher
 * 
 * @method login - Método que faz uma requisição POST para a API e retorna um objeto de usuário
 */
export class RegisterFetcher extends DataFetcher {
  async register(user) {
    const response = await this.httpService.post("/user/register", user);
    return response.data;
  }
}
