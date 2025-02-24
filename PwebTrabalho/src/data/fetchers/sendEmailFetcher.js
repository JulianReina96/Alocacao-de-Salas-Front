import { DataFetcher } from "./DataFetcher";
import { HttpServiceNoAuth } from "./HttpServiceNoAuth";

export class sendEmailFetcher extends DataFetcher {
  constructor() {
    super();
    this.HttpServiceNoAuth = new HttpServiceNoAuth();
  }

  async sendEmail(user) {
    const emailData = {
      mailFrom: "jreinadev@gmail.com",
      mailTo: user.email,
      mailSubject: "Seu cadastro foi realizado com sucesso!",
      mailText: "Olá, " + user.nome + "! Seu cadastro foi realizado com sucesso! Aproveite a plataforma!",
    };

    const response = await this.HttpServiceNoAuth.post("email/email/send", emailData);
    return response.data;
  }
}