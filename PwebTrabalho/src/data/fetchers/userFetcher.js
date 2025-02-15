import { DataFetcher } from "./DataFetcher.js";
import { User } from "../classes/user.js";

/**
 * @class UserFetcher
 * @extends DataFetcher
 * @description Classe responsável por buscar dados de usuários da API.
 *
 * @example
 * const userFetcher = new UserFetcher(httpService);
 * const user = await userFetcher.getUserById(1);
 *
 * @method getUserById - Método que faz uma requisição GET para a API e retorna um usuário pelo ID.
 * @method getUserByName - Método que faz uma requisição GET para a API e retorna um usuário pelo nome.
 * @method getCurrentUser - Método que faz uma requisição GET para a API e retorna o usuário atual.
 * @method deleteUserById - Método que faz uma requisição DELETE para a API para deletar um usuário pelo ID.
 */
export class UserFetcher extends DataFetcher {
    
  /**
   * @description Busca o usuário atual.
   * @returns {Promise<Object>} O usuário atual.
   */
  async getCurrentUser() {
    let id = sessionStorage.getItem("userID");
    let response = await this.httpService.get(`/user?id=${id}`);
    return new User(response.data);
  }

  /**
   * @description Busca um usuário pelo ID.
   * @param {number} id - O ID do usuário.
   * @returns {Promise<Object>} O usuário encontrado.
   */
  async getUserById(id) {
    const response = await this.httpService.get(`/user?id=${id}`);
    return response.data.map((user) => new User(user));
  }

  /**
   * @description Deleta um usuário pelo ID.
   * @param {number} id - O ID do usuário.
   * @returns {Promise<void>}
   */
  async deleteUserById() {
    let id = sessionStorage.getItem("userID");
    return await this.httpService.delete(`/user/${id}`);
  }

  /**
   * @description Busca um usuário pelo nome.
   * @param {string} name - O nome do usuário.
   * @returns {Promise<Object>} O usuário encontrado.
   */
  async getUserByName(username) {
    const data = await this.httpService.get(`/user/${username}`);
    return data.map((user) => new User(user));
  }

  /**
   * @description Inscreve um usuário em um país.
   * @param {number} countryID - O ID do país a ser inscrito
   * @returns {Promise<void>}
   */
  async subscribe(countryID) {
    console.log(countryID);
    let userID = sessionStorage.getItem("userID");
    return await this.httpService.post(`user/subscribe/${userID}/${countryID}`);
  }

  /**
   * @description Cancela a inscrição de um usuário em um país.
   * @param {number} countryID - O ID do país a cancelar a inscrição
   * @returns {Promise<void>}
   */
  async unsubscribe(countryID) {
    let userID = sessionStorage.getItem("userID");
    return await this.httpService.delete(
      `user/unsubscribe/${userID}/${countryID}`
    );
  }
}
