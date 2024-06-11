import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { initializeApp } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private db: AngularFireDatabase) {
    const app = initializeApp(environment.firebaseConfig);
  }

  sendMessage(sender: string, receiver: string, message: string): Promise<void> {
    const timestamp = new Date().toISOString();
    const messageData = { sender, receiver, message, timestamp, status: 'sent', read: false }; // Add read field
    const newMessageKey = this.db.createPushId();

    return this.db.object(`messages/${newMessageKey}`).set(messageData)
      .then(() => {
        console.log('Mensaje enviado con éxito');
      })
      .catch((error) => {
        console.error('Error al enviar el mensaje:', error);
        throw error;
      });
  }

  getMessages(): Observable<any[]> {
    return this.db.list('messages').valueChanges();
  }

  updateMessageStatus(message: any): void {
    const messageRef = this.db.object(`messages/${message.key}`);
    messageRef.update({ status: 'leído', read: true }).catch(error => {
      console.error('Error al actualizar el estado del mensaje:', error);
    });
  }
}
