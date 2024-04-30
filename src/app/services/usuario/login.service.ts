import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importa el operador map
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) { }

 

  iniciarSesion(formValue: any): Observable<any> {
    const url = `${this.baseUrl}iniciarSesion`;
    return this.httpClient.post<any>(url, formValue)
      .pipe(
        map(response => {
          // Guardar el userId en el localStorage después del inicio de sesión exitoso
          localStorage.setItem('userId', response.userId);
          return response; // Devolver la respuesta original del servidor
        })
      );
  }

  enviarCodigoRestablecimiento(email_usuario: string) {
    return this.httpClient.post<any>(`${this.baseUrl}solicitarRestablecimiento`, { email_usuario });
  }
  
  resetPassword(email_usuario: string, codigo: string, nuevaContrasena: string) {
    return this.httpClient.post<any>(`${this.baseUrl}restablecerPassword`, { email_usuario, codigo, nuevaContrasena });
  }
  
  getUserId(): string | null {
    // Obtener el userId del localStorage
    return localStorage.getItem('userId');
  }
  // Método para cambiar la contraseña
changePassword(idUsuario: string, newPassword: string): Observable<any> {
  console.log('UserId:', idUsuario);
  console.log('NewPassword:', newPassword);
  
  const url = `${this.baseUrl}cambiarPassword/${idUsuario}`;
  const body = { newPassword: newPassword };
  return this.httpClient.put<any>(url, body);

}

 // Método para obtener el perfil del usuario desde el token
 public getUserPerfil(): string | null {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.idperfil; // Suponiendo que el token tiene un campo 'role' que contiene el rol del usuario
  }
  return null;
}

registrarUsuario(formData: FormData, ): Observable<any> {
  return this.httpClient.post(`${this.baseUrl}crearUsuario`, formData);
}

// Función para editar datos de usuario
editUser(userId: string, newData: any): Observable<any> {
  const url = `${this.baseUrl}editUser/${userId}`; // Endpoint para editar datos de usuario
  return this.httpClient.put<any>(url, newData);
}

getUserById(userId: string): Observable<any> {
  console.log(userId)
  return this.httpClient.get<any>(`${this.baseUrl}getId/${userId}`);
}

}
