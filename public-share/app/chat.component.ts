import {Component} from 'angular2/core';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material/all';
import {RouteParams} from 'angular2/router';
import {ChatService} from './chat.service';
import {NgZone} from 'angular2/core';
import {ScrollGlue} from './scrollglue.component';
import * as moment from 'moment';

@Component({
  selector: 'my-chat',
  templateUrl: './share/app/chat.component.html',
  styleUrls: ['./share/app/chat.component.css'],
  directives: [MATERIAL_DIRECTIVES, ScrollGlue],
  providers: [MATERIAL_PROVIDERS, ChatService]
})
export class ChatComponent {
    timeout: any;
    typing: boolean;
    huntID: string;
    huntIDObject: any;
    messages: any;
    zone: any;
    chatBox: any;
    socket: any;
    username: any;
    nameAdded = false;
    ADD_MESSAGE_URL: string = 'http://localhost:8000/addChatMessage';
    GET_MESSAGES_URL: string = 'http://localhost:8000/getChatMessages';

  constructor(
     private _chatService: ChatService,
     private _params: RouteParams
  ) {
   this.scroll = ScrollGlue;
   this.huntID = _params.get('huntID');
   let socket = io.connect('http://localhost:8000');
   this.typing = false;
   this.otherUserTyping = false;
   this.otherUsername = '';
   this.messages = [];
   this.timeout;
   this.zone = new NgZone({enableLongStackTrace: false});
   this.chatBox = '';
   this.socket = socket;

   this.socket.on('connect', () => {
      this.socket.emit('huntChatRoom', this.huntID);
   });

   this.socket.on('chat_message', (msg, username, datetime) => {
      this.zone.run(() => {
        console.log(this.messages);
        datetime = moment.unix(datetime).fromNow();
        this.messages.push([username, msg, datetime]);
      });
   });

   this.socket.on('isTyping', (bool, username) => {
      if(bool === true && username !== this.username) {
         this.otherUsername = username;
         this.otherUserTyping = true;
      } else {
         this.otherUserTyping = false;
      }
   });

   let huntIDObject = {huntID: this.huntID};
   this._chatService.postData(JSON.stringify(huntIDObject), this.GET_MESSAGES_URL)
   .then(messagesFromDB => {
      this.zone.run(() => {
        console.log('messages from DB', messagesFromDB);
        let messagesArray = messagesFromDB.chatMessages;
        for(let i = 0; i < messagesArray.length; i++) {
          let datetime = moment.unix(messagesArray[i].datetime).fromNow();
          console.log('THIS IS BEING PUSHED TO MESSAGES ARRAY');
          console.log(messagesArray[i].username, messagesArray[i].text, datetime);
          this.messages.push([messagesArray[i].username, messagesArray[i].text, datetime]);
        }
      })
   }).catch(error => console.error(error));
  }
  
  getUsername(username){
    this.username = username
    this.nameAdded = true
  }

  invocation() {
    this.timeout = setTimeout(
        () => {
          this.socket.emit('typing', false, this.username, this.huntID);
        }, 1000);
  }

  OnKey(event:KeyboardEvent) {
    if (event) {
      this.socket.emit('typing', true, this.username, this.huntID);
      clearTimeout(this.timeout);
      this.invocation();
    }
  };

  send(message) {
    if (message && message !== '') {
      clearTimeout(this.timeout);
      this.socket.emit('typing', false, this.username, this.huntID);
      let messageObject = {
        username: this.username,
        huntID: this.huntID,
        message: message
      };

      this._chatService.postData(JSON.stringify(messageObject), this.ADD_MESSAGE_URL)
      .then(messageAdded => {
        messageAdded = messageAdded[0];
        console.log('message  added', messageAdded);
        this.socket.emit('chat_message', messageAdded.text, messageAdded.username, messageAdded.datetime, this.huntID);
    }).catch(error => {
        console.error(error)
    });

    }
    this.chatBox = '';
  }
  
}
