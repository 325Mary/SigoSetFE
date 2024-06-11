import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  constructor(private afMessaging: AngularFireMessaging) {}

  requestPermission() {
    return this.afMessaging.requestToken.pipe(
      tap(token => {
        console.log('Permission granted! Save the token to your server:', token);
      })
    );
  }

  listenForMessages() {
    return this.afMessaging.messages.pipe(
      tap(message => {
        console.log('Message received:', message);
      })
    );
  }
}
