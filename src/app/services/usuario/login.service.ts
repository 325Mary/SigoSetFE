import { Injectable  , EventEmitter   } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators'; // Importa el operador map
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {


  
  private baseUrl = environment.apiUrl;
  loginStatusChanged = new EventEmitter<boolean>();
  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService,   private router: Router) { }

 

  iniciarSesion(formValue: any): Observable<any> {
    const url = `${this.baseUrl}iniciarSesion`;
    return this.httpClient.post<any>(url, formValue).pipe(
      map(response => {
        if (response.token) {
          localStorage.setItem('token', response.token); // Aquí agregamos el token al localStorage
        }
        localStorage.setItem('userId', response.userId);
        console.log('token:', localStorage)
        if (response.firstLogin) {
          this.router.navigate(['/cambiarPassword', { userId: response.userId }]);
        } else {
          this.loginStatusChanged.emit(true);
        }
        return response;
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

listarUsuarios(): Observable<any> {
  const url = `${this.baseUrl}listUsuarios`; 
  return this.httpClient.get<any>(url);
}


enviarCorreo(idUsuario: string): Observable<any> {
  const url = `${this.baseUrl}enviarCorreo/${idUsuario}`;
  return this.httpClient.post<any>(url, null);
}


cambiarEstadoUsuario(idUsuario: string, estado: string): Observable<any> {
  const url = `${this.baseUrl}estadoUser/${idUsuario}`;
  return this.httpClient.put<any>(url, { estado });
}


eliminarUsuario(idUsuario: string): Observable<any> {
  const url = `${this.baseUrl}EliminarUser/${idUsuario}`;
  return this.httpClient.delete<any>(url);
}


cerrarSesion(): Observable<any> {
  const token = localStorage.getItem('token');
  if (!token) {
    return throwError('No se encontró un token de autenticación en el almacenamiento local.'
    );
  }

  const url = `${this.baseUrl}cerrarSesion`;
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}` // Agrega un espacio después de 'Bearer'
  });
  return this.httpClient.post<any>(url, null, { headers }).pipe(
    map(response => {
      // Eliminar el token del almacenamiento local después de cerrar la sesión
      this.removerToken();
      localStorage.removeItem('isLoggedIn');
      return response;
    })
  );
}

removerToken() {
  localStorage.removeItem('token');
}


}
