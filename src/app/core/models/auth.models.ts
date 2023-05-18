export class User {
  country: string;
  name: string;
  surnames: string;
  email: string;
  role: string;
  company?: string;
  image?: string;

  constructor(
    country: string,
    name: string,
    surnames: string,
    email: string,
    role: string,
    company?: string,
    image?: string
  ) {
    this.country = country;
    this.name = name;
    this.surnames = surnames;
    this.email = email;
    this.role = role;
    this.company = company;
    this.image = image;
  }
}
