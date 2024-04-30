import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class TokenValidationService {
  constructor(private jwtHelper: JwtHelperService) {}

   // Método para obtener el token de autenticación del almacenamiento local
   getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Método para verificar si el token es válido
  public isValidToken(token: string): boolean {
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  // Método para obtener los datos del usuario del token
  public getUserData(token: string): any {
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }

  
  
  
}