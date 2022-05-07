export class User {
  constructor(
    private email: string,
    private token: string,
    private userId: string,
    private expirationdate: Date) { }

  get expdate() {
    return this.expirationdate;
  }
}
