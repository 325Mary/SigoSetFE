// import { ListPuestosVigComponent } from './../list-puestos-vig/list-puestos-vig.component';
import { Component, OnInit } from '@angular/core';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Inicio',  icon: 'house', class: '' },
    { path: '/perfil', title: 'Gestionar perfil',  icon:'person', class: '' },
    { path: '/user-profile', title: 'Administar Zonas',  icon:'person', class: '' },
    { path: '/table-list', title: 'Administar Empresas',  icon:'content_paste', class: '' },
    { path: '/typography', title: 'Administar Usuarios',  icon:'library_books', class: '' },
    { path: '/icons', title: 'Cerrar Seción',  icon:'dashboard', class: '' },
    // { path: '/crearPerfil', title: 'Crear Perfil',  icon:'dashboard', class: '' },
    { path:'/regionales',title:'crear regionales',icon:'',class:''},
    { path:'/PuestosVigilancia',title:'puestos vigilancia',icon:'',class:''},
    {path:'/ListPuestosVig',title:'list Puestos Vigilancia',icon:'',class:''},
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
