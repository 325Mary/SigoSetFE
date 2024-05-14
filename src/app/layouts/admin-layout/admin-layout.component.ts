import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, PopStateEvent } from '@angular/common';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import PerfectScrollbar from 'perfect-scrollbar';
import { filter, Subscription } from 'rxjs';
import { LoginService } from '../../services/usuario/login.service';
import {TokenValidationService} from '../../services/VertificacionUser/token-validation.service'

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

  constructor(public location: Location, private router: Router, private loginService: LoginService, private tokenValidationService: TokenValidationService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart && (event.url === '/login' || event.url === '/')) {
        this.isLoggedIn = false;
        localStorage.setItem('isLoggedIn', JSON.stringify(false));
      }
    });

    this.loginService.loginStatusChanged.subscribe(status => {
      this.isLoggedIn = status;
      localStorage.setItem('isLoggedIn', JSON.stringify(status));
      if (!status) {
      }
    });

    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus) {
      this.isLoggedIn = JSON.parse(storedLoginStatus);
    } else {
      this.isLoggedIn = false;
      localStorage.setItem('isLoggedIn', JSON.stringify(false));
    }

    if (this.isLoggedIn) {
      this.validateToken();
    }
  }

  private validateToken(): void {
    const storedToken = this.tokenValidationService.getToken();

    if (storedToken) {
      const isValidToken = this.tokenValidationService.isValidToken(storedToken);

      if (isValidToken) {
        this.isLoggedIn = true;
        const userId = this.tokenValidationService.getUserData(storedToken).userId;
      } else {
        this.isLoggedIn = false;
        this.router.navigate(['/sesionCaducada']);
      }
    } else {
      this.isLoggedIn = false;
    }

    const userId = this.loginService.getUserId();
    if (userId) {
      this.loginService.getUserById(userId).subscribe(
        user => {
        },
        error => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    }
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
    titlee = titlee.slice(1);
    return path !== titlee;
  }

  isMac(): boolean {
    return navigator.platform.toUpperCase().includes('MAC') || navigator.platform.toUpperCase().includes('IPAD');
  }

  isHomepage(): boolean {
    return this.location.isCurrentPathEqualTo('/');
  }
}
