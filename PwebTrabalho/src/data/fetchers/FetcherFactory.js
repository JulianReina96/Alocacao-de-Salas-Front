import { HttpService } from "./HttpService";
import { LoginFetcher } from "./login";
import { RegisterFetcher } from "./Register";
import {UserFetcher} from "./userFetcher.js";

/**
 * @description Classe FetcherFactory para criar instâncias de diferentes fetchers.
 *
 * Esta classe é responsável por criar e retornar instâncias de fetchers específicos, cada um configurado com
 * um serviço HTTP compartilhado. Os fetchers são usados para realizar operações de busca de dados para diferentes
 * entidades, como Esporte, País, Medalha, Login, Registro e Usuário.
 *
 * @example
 * const fetcherFactory = new FetcherFactory();
 * const esporteFetcher = fetcherFactory.createEsporteFetcher();
 * const paisFetcher = fetcherFactory.createPaisFetcher();
 * const medalhaFetcher = fetcherFactory.createMedalhaFetcher();
 * const loginFetcher = fetcherFactory.createLoginFetcher();
 * const registerFetcher = fetcherFactory.createRegisterFetcher();
 * const userFetcher = fetcherFactory.createUserFetcher();
 */
export class FetcherFactory {

  constructor() {
    this.httpService = new HttpService();
  }

  

  /**
   * @description Método para criar um fetcher de Login.
   * @returns {LoginFetcher} - O fetcher de Login criado.
   */
  createLoginFetcher() {
    return new LoginFetcher(this.httpService);
  }

  /**
   * @description Método para criar um fetcher de Registro.
   * @returns {RegisterFetcher} - O fetcher de Registro criado.
   */
  createRegisterFetcher() {
    return new RegisterFetcher(this.httpService);
  }

  /**
   * @description Método para criar um fetcher de Usuário.
   * @returns {UserFetcher} - O fetcher de Usuário criado.
   */
  createUserFetcher(){
    return new UserFetcher(this.httpService);
  }
}