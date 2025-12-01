export interface Phone {
  mobile: string;
  office: string;
}

export interface Contact {
  email: string;
  phone: Phone;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Address {
  street: string;
  city: string;
  coordinates: Coordinates;
}

export interface Company {
  name: string;
  address: Address;
  contact: Contact;
}

export interface Company {
  company: Company;
}