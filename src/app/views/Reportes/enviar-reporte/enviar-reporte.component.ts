import { Component, OnInit } from '@angular/core';
import { ChatService } from "../../../services/reportes/chat.service";
import { TokenValidationService } from '../../../services/VertificacionUser/token-validation.service';
import { LoginService } from '../../../services/usuario/login.service';

@Component({
  selector: 'app-enviar-reporte',
  templateUrl: './enviar-reporte.component.html',
  styleUrls: ['./enviar-reporte.component.css']
})
export class EnviarReporteComponent implements OnInit {
  messages: any[] = [];
  conversations: any[] = [];
  filteredConversations: any[] = [];
  selectedConversation: any;
  selectedMessages: any[] = [];
  visibleMessages: any[] = [];
  newMessage = '';
  email: string = '';
  filter: string = 'recibidos';
  messagesToShow: number = 5;
  hasMoreMessages: boolean = false;

  showModal: boolean = false;
  usuarios: any[] = [];
  selectedUsuario: string = '';
  currentPage: number = 1;
  conversationsPerPage: number = 5;
  paginatedConversations: any[] = [];
  hasPreviousPage: boolean = false;
  hasNextPage: boolean = false;
  
  constructor(
    private chatService: ChatService,
    private tokenValidationService: TokenValidationService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.fetchUsername();
  }

  private fetchUsername(): void {
    const storedToken = this.tokenValidationService.getToken();
    if (storedToken) {
      const userId = this.tokenValidationService.getUserData(storedToken).userId;
      this.loginService.getUserById(userId).subscribe(
        response => {
          if (response && response.user) {
            this.email = response.user.email_usuario;
            console.log('Email del usuario actual:', this.email);
            this.loadMessages(); // Asegurar que los mensajes se carguen después de obtener el email del usuario
          } else {
            console.error('Faltan datos de usuario en la respuesta');
          }
        },
        error => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    }
  }

  private loadMessages(): void {
    this.chatService.getMessages().subscribe(messages => {
      this.messages = messages;
      this.updateConversations();
    });
  }

  private loadUsuarios(): void {
    this.loginService.listarUsuarios().subscribe(
      response => {
        if (response.data && response.data.length > 0) {
          this.usuarios = response.data[0];
          console.log('Primer array de usuarios:', this.usuarios);
        } else {
          this.usuarios = [];
          console.error('La respuesta no contiene datos o el primer array está vacío.');
        }
      },
      error => {
        this.usuarios = [];
        console.error('Error al obtener la lista de usuarios:', error);
      }
    );
  }

  updateConversations(): void {
    const conversationMap = new Map();
    this.messages.forEach(message => {
      const key = message.sender === this.email ? message.receiver : message.sender;
      if (!conversationMap.has(key)) {
        conversationMap.set(key, { receiver: key, timestamp: message.timestamp, unread: message.status !== 'leído' });
      } else {
        const conversation = conversationMap.get(key);
        if (message.timestamp > conversation.timestamp) {
          conversation.timestamp = message.timestamp;
        }
        if (message.status !== 'leído' && message.receiver === this.email) {
          conversation.unread = true;
        }
      }
    });
    this.conversations = Array.from(conversationMap.values());
    this.filterConversations(); // Filtrar y paginar las conversaciones por defecto
  }
  

  filterConversations(): void {
    let filtered;
    if (this.filter === 'recibidos') {
      filtered = this.conversations.filter(conversation => {
        return this.messages.some(message => message.sender === conversation.receiver && message.receiver === this.email);
      });
    } else {
      filtered = this.conversations.filter(conversation => {
        return this.messages.some(message => message.sender === this.email && message.receiver === conversation.receiver);
      });
    }
    this.filteredConversations = filtered;
    this.updatePaginatedConversations();
  }
  
  updatePaginatedConversations(): void {
    const start = (this.currentPage - 1) * this.conversationsPerPage;
    const end = start + this.conversationsPerPage;
    this.paginatedConversations = this.filteredConversations.slice(start, end);
    this.hasPreviousPage = start > 0;
    this.hasNextPage = end < this.filteredConversations.length;
  }
  
  goToNextPage(): void {
    if (this.hasNextPage) {
      this.currentPage++;
      this.updatePaginatedConversations();
    }
  }
  
  goToPreviousPage(): void {
    if (this.hasPreviousPage) {
      this.currentPage--;
      this.updatePaginatedConversations();
    }
  }
  

  fetchMessages(option: string): void {
    this.filter = option;
    this.filterConversations();
  }

  selectConversation(conversation: any): void {
    this.selectedConversation = conversation;
    this.filterMessagesForSelectedConversation();
    this.selectedMessages.forEach(message => {
      if (message.receiver === this.email && message.status !== 'leído') {
        message.status = 'leído';
        message.read = true;
        this.chatService.updateMessageStatus(message);
      }
    });
    this.updateVisibleMessages();
  }

  filterMessagesForSelectedConversation(): void {
    this.selectedMessages = this.messages.filter(message =>
      (message.sender === this.email && message.receiver === this.selectedConversation.receiver) ||
      (message.sender === this.selectedConversation.receiver && message.receiver === this.email)
    );
    this.updateVisibleMessages();
  }

  updateVisibleMessages(): void {
    const start = Math.max(0, this.selectedMessages.length - this.messagesToShow);
    this.visibleMessages = this.selectedMessages.slice(start);
    this.hasMoreMessages = start > 0;
  }

  loadMoreMessages(): void {
    this.messagesToShow += 5;
    this.updateVisibleMessages();
  }

  backToConversations(): void {
    this.selectedConversation = null;
    this.fetchMessages(this.filter);
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '' && (this.selectedConversation || this.selectedUsuario)) {
      const receiver = this.selectedConversation ? this.selectedConversation.receiver : this.selectedUsuario;
      const newMessageObj = {
        sender: this.email,
        receiver: receiver,
        message: this.newMessage,
        timestamp: new Date(),
        status: 'enviado'
      };

      this.messages.push(newMessageObj);  // Añadir el mensaje a la lista de mensajes localmente
      if (this.selectedConversation) {
        this.selectedMessages.push(newMessageObj);
        this.updateVisibleMessages();
      }
      this.updateConversations();

      this.chatService.sendMessage(this.email, receiver, this.newMessage)
        .then(() => {
          this.newMessage = '';
          this.closeComposeModal(); // Cierra el modal después de enviar el mensaje
          this.loadMessages(); // Recarga los mensajes después de enviar uno nuevo
        })
        .catch(error => {
          console.error('Error al enviar el mensaje:', error);
        });
    }
  }

  openComposeModal(): void {
    this.showModal = true;
  }

  closeComposeModal(): void {
    this.showModal = false;
    this.newMessage = '';
    this.selectedUsuario = '';
  }
}
