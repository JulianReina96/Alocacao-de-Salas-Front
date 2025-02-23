import { DataFetcher } from "./DataFetcher";
import axios from 'axios';
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
export class RegisterFetcher extends DataFetcher {
  constructor() {
    super();
    this.httpService = httpService;
  }
  async register(user) {    
    console.log("oi");
    const response = await this.httpService.post("/usuario", user);
    console.log(response.data);
    return response.data;
  }
}
