import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

 

  login(formValue: any) {
    const url = `${this.baseUrl}iniciarSesion`;
    return this.httpClient.post<any>(url, formValue)
   
  }
  enviarCodigoRestablecimiento(email_usuario: string) {
    return this.httpClient.post<any>(`${this.baseUrl}solicitarRestablecimiento`, { email_usuario });
  }
  
  resetPassword(email_usuario: string, codigo: string, nuevaContrasena: string) {
    return this.httpClient.post<any>(`${this.baseUrl}restablecerPassword`, { email_usuario, codigo, nuevaContrasena });
  }
  
  // Método para cambiar la contraseña
changePassword(userId: string, nuevaContrasena: string): Observable<any> {
  console.log('UserId:', userId);
  console.log('NewPassword:', nuevaContrasena);
  
  const url = `${this.baseUrl}changePassword/${userId}`;
  const body = { nuevaContrasena: nuevaContrasena };
  return this.httpClient.put<any>(url, body);

}

}
