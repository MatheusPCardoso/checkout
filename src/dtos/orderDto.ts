export interface orderDto {
  creditCard: {
    card: {
      number: string;
      holder_name: string;
      holder_document: string;
      exp_month: number;
      exp_year: number;
      cvv: string;
    };
  };
  customer: {
    name: string;
    email: string;
    code: string;
    phones: {
      home_phone: {
        country_code: string;
        number: string;
        area_code: string;
      };
    };
    document: string;
    type: string;
    address: {
      street: string;
      number: string;
      neighborhood: string;
      city: string;
      state: string;
      country: string;
      complement: string;
      zip_code: string;
      line1: string;
      line2: string;
      metadata: {};
    };
    metadata: {};
  };
  jibotCustomerId: string;
  planId: string;
}
