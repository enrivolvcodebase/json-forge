export interface CompanyCompanyContactPhone {
  mobile: string;
  office: string;
}

export interface CompanyCompanyContact {
  email: string;
  phone: CompanyCompanyContactPhone;
}

export interface CompanyCompanyAddressCoordinates {
  lat: number;
  lng: number;
}

export interface CompanyCompanyAddress {
  street: string;
  city: string;
  coordinates: CompanyCompanyAddressCoordinates;
}

export interface CompanyCompany {
  name: string;
  address: CompanyCompanyAddress;
  contact: CompanyCompanyContact;
}

export interface Company {
  company: CompanyCompany;
}