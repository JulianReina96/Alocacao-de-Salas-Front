import { DataFetcher } from "./DataFetcher";
import axios from 'axios';

// Configurar a URL base para o httpService
const httpService = axios.create({
  baseURL: 'http://192.168.15.8:8082/email', // URL base da API
});

export class sendEmailFetcher extends DataFetcher {
  constructor() {
    super();
    this.httpService = httpService;
  }

  async sendEmail(user) {
    const emailData = {
      mailFrom: "jreinadev@gmail.com",
      mailTo: user.email,
      mailSubject: "Seu cadastro foi realizado com sucesso!",
      mailText: "Olá, " + user.nome + "! Seu cadastro foi realizado com sucesso! Aproveite a plataforma!",
    };

    const response = await this.httpService.post("/email/send", emailData);
    return response.data;
  }
}