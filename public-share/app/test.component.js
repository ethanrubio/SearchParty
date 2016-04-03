System.register(['angular2/core', 'angular2/router', './chat.service', './scrollglue.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, chat_service_1, core_2, scrollglue_component_1;
    var ScrollGlueComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (chat_service_1_1) {
                chat_service_1 = chat_service_1_1;
            },
            function (scrollglue_component_1_1) {
                scrollglue_component_1 = scrollglue_component_1_1;
            }],
        execute: function() {
            ScrollGlueComponent = (function () {
                function ScrollGlueComponent(_chatService, _params) {
                    var _this = this;
                    this._chatService = _chatService;
                    this._params = _params;
                    this.listItems = [];
                    this.count = 100;
                    this.nameAdded = false;
                    this.ADD_MESSAGE_URL = 'http://localhost:8000/addChatMessage';
                    this.GET_MESSAGES_URL = 'http://localhost:8000/getChatMessages';
                    this.scroll = scrollglue_component_1.ScrollGlue;
                    for (var i = 0; i < this.count; i++) {
                        this.listItems.push("Item number " + i);
                    }
                    this.huntID = _params.get('huntID');
                    var socket = io.connect('http://localhost:8000');
                    this.typing = false;
                    this.otherUserTyping = false;
                    this.otherUsername = '';
                    this.messages = [];
                    this.timeout;
                    this.zone = new core_2.NgZone({ enableLongStackTrace: false });
                    this.chatBox = '';
                    this.socket = socket;
                    this.socket.on('connect', function () {
                        _this.socket.emit('huntChatRoom', _this.huntID);
                    });
                    this.socket.on('chat_message', function (msg, username, datetime) {
                        _this.zone.run(function () {
                            console.log(_this.messages);
                            datetime = moment.unix(datetime).fromNow();
                            _this.messages.push([username, msg, datetime]);
                        });
                    });
                    this.socket.on('isTyping', function (bool, username) {
                        if (bool === true && username !== _this.username) {
                            _this.otherUsername = username;
                            _this.otherUserTyping = true;
                        }
                        else {
                            _this.otherUserTyping = false;
                        }
                    });
                    var huntIDObject = { huntID: this.huntID };
                    this._chatService.postData(JSON.stringify(huntIDObject), this.GET_MESSAGES_URL)
                        .then(function (messagesFromDB) {
                        _this.zone.run(function () {
                            console.log('messages from DB', messagesFromDB);
                            var messagesArray = messagesFromDB.chatMessages;
                            for (var i_1 = 0; i_1 < messagesArray.length; i_1++) {
                                var datetime = moment.unix(messagesArray[i_1].datetime).fromNow();
                                console.log('THIS IS BEING PUSHED TO MESSAGES ARRAY');
                                console.log(messagesArray[i_1].username, messagesArray[i_1].text, datetime);
                                _this.messages.push([messagesArray[i_1].username, messagesArray[i_1].text, datetime]);
                            }
                        });
                    }).catch(function (error) { return console.error(error); });
                }
                ScrollGlueComponent.prototype.addItem = function () {
                    this.listItems.push("Item number " + this.count++);
                };
                ScrollGlueComponent = __decorate([
                    core_1.Component({
                        selector: 'my-test',
                        providers: [chat_service_1.ChatService],
                        styles: ["\n    .demo-scroll-area {\n      width: 200px;\n      height: 300px;\n      background: rgb(212, 176, 161);\n      overflow-y: scroll;\n    }\n    li {\n      padding-top: 20px;\n      padding-bottom: 20px;\n    }\n    li:hover {\n      background: rgb(182, 150, 136);\n    }\n  "],
                        template: "\n      \n      <h3> Flesh Coloured Demo List</h3>\n      <button (click)=\"addItem()\">Add Item</button>\n      <div class=\"demo-scroll-area\" scroll-glue>\n        <ul>\n          <li *ngFor=\"#list of listItems\">\n          {{list}}\n          </li>\n          <li *ngFor=\"#message of messages\">\n            {{message[0]}}{{message[1]}}\n          </li>\n        </ul>\n      </div>",
                        directives: [scrollglue_component_1.ScrollGlue]
                    }), 
                    __metadata('design:paramtypes', [chat_service_1.ChatService, router_1.RouteParams])
                ], ScrollGlueComponent);
                return ScrollGlueComponent;
            }());
            exports_1("ScrollGlueComponent", ScrollGlueComponent);
        }
    }
});
//# sourceMappingURL=test.component.js.map