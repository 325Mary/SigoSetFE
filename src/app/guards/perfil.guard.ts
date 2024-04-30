import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService  } from '../services/usuario/login.service';


@Injectable({
  providedIn: 'root'
})
export class PerfilGuard implements CanActivate {

  constructor(private authService: LoginService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const allowedRoles = route.data['allowedRoles'] as Array<string>;

    const userPerfil = this.authService.getUserPerfil();
    
    if (userPerfil && allowedRoles.includes(userPerfil)) {
      return true;
    } else {
      return this.router.parseUrl('**');
    }
}
}
