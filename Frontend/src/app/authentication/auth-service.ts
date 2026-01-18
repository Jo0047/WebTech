import { Injectable } from '@angular/core';
import {RegistrationData} from '@models/user-data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  registerCustomer(registrationData: RegistrationData):boolean {
    console.log(registrationData.toJSONString());

    //todo send to endpoint and handle response

    return false;
  }

  registerRestaurant(registrationData: RegistrationData):boolean{
    console.log(registrationData.toJSONString());

    //todo send to endpoint and handle response

    return false;

  }

  handleLogin(email: string | undefined, password: string | undefined):boolean{

    //todo send to endpoint and handle response
    //response muss beinhalten ob customer oder restaurant owner.
    //email muss gespeichert werden -> damit man weis welcher userprofil.

    return false

  }

}
