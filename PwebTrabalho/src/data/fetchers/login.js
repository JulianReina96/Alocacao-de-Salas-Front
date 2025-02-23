import { DataFetcher } from "./DataFetcher";
import { HttpService } from "./HttpService";




const httpService = new HttpService({
  baseURL: 'http://192.168.15.8:8082/alocasalas', // Substitua pela URL base da sua API
});


/**
 * 
 * @extends DataFetcher
 * 
 * @method login - Método que faz uma requisição POST para a API e retorna um objeto de usuário
 */
export class LoginFetcher extends DataFetcher {
  constructor() {
    super();
    this.httpService = httpService;
  }
  async login(login, senha) {
    return await this.httpService.login("/login", login, senha);
  }
  
}
