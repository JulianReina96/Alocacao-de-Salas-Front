import axios from "axios";

/**
 *
 * @class HttpService
 * @description Classe que representa um serviço HTTP para requisições, utilizando o princípio de injeção de dependência
 *
 * @param {String} baseURL - URL base para as requisições
 *
 * @get {Function} get - Função que realiza uma requisição GET
 * @post {Function} post - Função que realiza uma requisição POST
 * @put {Function} put - Função que realiza uma requisição PUT
 * @delete {Function} delete - Função que realiza uma requisição DELETE
 * @login {Function} login - Função que realiza uma requisição de login
 *
 */
export class HttpService {
  
  constructor() {
    this.baseURL = "http://localhost:8084/olympics-follow-api/";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
    };
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: this.headers,
    });
  }

  async get(url) {
    try {
      const response = await this.client.get(url);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async post(url, data) {
    try {
      return await this.client.post(url, data);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async put(url, data) {
    try {
      const response = await this.client.put(url, data);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async delete(url) {
    try {
      return await this.client.delete(url);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async login(url, email, password) {
    try {
      const response = await this.client.post(url, {
        email,
        password,
      });
      console.log(response)
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async loginWithGoogle(url, accessToken) {
    try {
      const response = await this.client.post(url, {
        accessToken
      });
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
