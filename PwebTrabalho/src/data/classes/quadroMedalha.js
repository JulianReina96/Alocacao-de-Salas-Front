export class QuadroMedalha {
  constructor({
    id,
    nome,
    numberOfGolds,
    numberOfSilvers,
    numberOfBronze,
    numberOfMedal,
    urlImage,
    medalhas
  }) {
    this.id = id;
    this.nome = nome;
    this.numberOfGolds = numberOfGolds;
    this.numberOfSilvers = numberOfSilvers;
    this.numberOfBronze = numberOfBronze;
    this.numberOfMedal = numberOfMedal;
    this.urlImage = urlImage;
    this.medalhas = medalhas;
  }
}