//our root app component
import {Component} from 'angular2/core'
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material/all';
import {RouteParams} from 'angular2/router';
import {ChatService} from './chat.service';
import {NgZone} from 'angular2/core';
import {ScrollGlue} from './scrollglue.component';

@Component({
  selector: 'my-test',
  providers: [ChatService],
  styles: [`
    .demo-scroll-area {
      width: 200px;
      height: 300px;
      background: rgb(212, 176, 161);
      overflow-y: scroll;
    }
    li {
      padding-top: 20px;
      padding-bottom: 20px;
    }
    li:hover {
      background: rgb(182, 150, 136);
    }
  `],
    template: `
      
      <h3> Flesh Coloured Demo List</h3>
      <button (click)="addItem()">Add Item</button>
      <div class="demo-scroll-area" scroll-glue>
        <ul>
          <li *ngFor="#list of listItems">
          {{list}}
          </li>
          <li *ngFor="#message of messages">
            {{message[0]}}{{message[1]}}
          </li>
        </ul>
      </div>`,
  directives: [ScrollGlue]
})
export class ScrollGlueComponent {
  public listItems:any = [];
  public count:number = 100;
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

  constructor(private _chatService: ChatService, private _params: RouteParams) {
    this.scroll = ScrollGlue;
    for (var i = 0; i < this.count; i++) {
        this.listItems.push(`Item number ${i}`);
    }
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

  addItem() {
    this.listItems.push(`Item number ${this.count++}`);
  }
}