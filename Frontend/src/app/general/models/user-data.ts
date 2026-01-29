export class RegistrationData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  street: string;
  streetNumber: number;
  city: string;
  zipCode: number;
  restaurantName?: string;
  restaurantEmail?: string;
  restaurantPhoneNumber?: string;

  constructor(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    street: string,
    streetNumber: number,
    city: string,
    zipCode: number,
    restaurantName?: string,
    restaurantEmail?: string,
    restaurantPhoneNumber?: string,
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.street = street;
    this.streetNumber = streetNumber;
    this.city = city;
    this.zipCode = zipCode;
    this.restaurantName = restaurantName;
    this.restaurantEmail = restaurantEmail;
    this.restaurantPhoneNumber = restaurantPhoneNumber;
  }

  /**
   * Convert to JSON object
   */
  toJSON(): object {
    const json: any = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      street: this.street,
      streetNumber: this.streetNumber,
      city: this.city,
      zipCode: this.zipCode,
    };

    // Only include customer fields if they exist
    if (this.restaurantName) {
      json.restaurantName = this.restaurantName;
    }
    if (this.restaurantEmail) {
      json.restaurantEmail = this.restaurantEmail;
    }
    if (this.restaurantPhoneNumber) {
      json.restaurantPhoneNumber = this.restaurantPhoneNumber;
    }

    return json;
  }

  /**
   * Convert to JSON string
   */
  toJSONString(): string {
    return JSON.stringify(this.toJSON());
  }
}

export interface AuthResponse {
  email: string;
  isOwner: boolean;
}
