export class User {
  constructor(user) {
    this.username = user['username'];
    this.email = user['email'];
    this.inscricoes = user['inscricoes'];
    this.pictureUrl = user['pictureUrl'];
    this.isAdmin = user['roles'].filter(role => role.role === 'ROLE_ADMIN').length === 1
  }
}