import { HttpService } from "./HttpService";

/**
 * 
 * @class DataFetcher
 * @description Classe que representa um fetcher de dados
 */
export class DataFetcher {
  constructor(httpService) {
    this.httpService = httpService;
  }
}