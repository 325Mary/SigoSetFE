import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, PopStateEvent } from '@angular/common';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import PerfectScrollbar from 'perfect-scrollbar';
import { filter, Subscription } from 'rxjs';
import { LoginService } from '../../services/usuario/login.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  private _router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  isLoggedIn: boolean = false;
  elemMainPanel: ElementRef | undefined;
  elemSidebar: ElementRef | undefined;

  constructor(public location: Location, private router: Router, private loginService: LoginService) {}

  ngOnInit() {
    const authState = localStorage.getItem('isLoggedIn');
    this.isLoggedIn = authState ? JSON.parse(authState) : false;

    this.loginService.loginStatusChanged.subscribe(status => {
      this.isLoggedIn = status;
      this.scrollToTopPosition();
      // Guardar el estado de autenticación en el almacenamiento local
      localStorage.setItem('isLoggedIn', JSON.stringify(status));
    });
    this.router.events.subscribe(event => {
        if (event instanceof NavigationStart && (event.url === '/login' || event.url === '/')) {
          this.isLoggedIn = false;
        }
      });
    const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
    const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

    this.location.subscribe((ev: PopStateEvent) => {
        this.lastPoppedUrl = ev.url;
    });

    this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationStart) {
           if (event.url != this.lastPoppedUrl)
               this.yScrollStack.push(window.scrollY);
       } else if (event instanceof NavigationEnd) {
           if (event.url == this.lastPoppedUrl) {
               this.lastPoppedUrl = undefined;
               window.scrollTo(0, this.yScrollStack.pop());
           } else
               window.scrollTo(0, 0);
       }
    });

    this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
         if (this.elemMainPanel && this.elemSidebar) {
           this.elemMainPanel.nativeElement.scrollTop = 0;
           if (this.isLoggedIn) {
             this.elemSidebar.nativeElement.scrollTop = 0;
           }
         }
    });

    // Espera a que la vista se inicialice para buscar los elementos del sidebar y del panel principal
    this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
            setTimeout(() => {
                const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
                const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

                if (elemMainPanel && elemSidebar && this.isLoggedIn && window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
                    let psMainPanel = new PerfectScrollbar(elemMainPanel);
                    let psSidebar = new PerfectScrollbar(elemSidebar);
                }
            }, 100);
        }
    });
  }
  scrollToTopPosition() {
    if (this.isLoggedIn && this.elemMainPanel) {
      this.elemMainPanel.nativeElement.scrollTop = 0;
    }
  
    if (this.elemSidebar && !this.isLoggedIn) {
      this.elemSidebar.nativeElement.scrollTop = 0;
    }
  }
  

  isMaps(path) {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice( 1 );
    return path !== titlee;
  }

  isMac(): boolean {
    return navigator.platform.toUpperCase().includes('MAC') || navigator.platform.toUpperCase().includes('IPAD');
  }
}
