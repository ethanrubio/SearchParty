System.register(['angular2/core', 'angular2/router', 'ng2-material/all', './searchparty.service', './map.service', './chat.component', './test.component'], function(exports_1, context_1) {
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
    var core_1, router_1, all_1, searchparty_service_1, map_service_1, chat_component_1, test_component_1;
    var SearchPartyComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (all_1_1) {
                all_1 = all_1_1;
            },
            function (searchparty_service_1_1) {
                searchparty_service_1 = searchparty_service_1_1;
            },
            function (map_service_1_1) {
                map_service_1 = map_service_1_1;
            },
            function (chat_component_1_1) {
                chat_component_1 = chat_component_1_1;
            },
            function (test_component_1_1) {
                test_component_1 = test_component_1_1;
            }],
        execute: function() {
            SearchPartyComponent = (function () {
                function SearchPartyComponent(_params, googleMaps, _searchPartyService) {
                    var _this = this;
                    this._params = _params;
                    this.googleMaps = googleMaps;
                    this._searchPartyService = _searchPartyService;
                    this.items = ['item1', 'item2', 'item3'];
                    this.animationsEnabled = true;
                    this.map = null;
                    this.huntID = _params.get('huntID');
                    this.username = _params.get('username');
                    this.allTasks = [];
                    this.getHuntData(this.huntID);
                    var socket = io.connect('http://localhost:8000');
                    this.socket = socket;
                    this.socket.on("connect", function () {
                        _this.socket.emit('huntMapRoom', _this.huntID);
                    });
                    this.socket.on('taskChange', function (location, task, room, lat, lng, num) {
                        console.log('{{}{}}{}{}}{} recieving taskChange {}{}{}{}');
                        console.log(' this is the task change location change ', location);
                        _this.allTasks.unshift([[location], [task]]);
                        _this.socket.emit('chat_message', '::TASK HAS CHANGED::', 'SearchPartyAdmin', null, _this.huntID);
                        _this.socket.emit('chat_message', 'challenge completed!', 'Party Bot', Date.now() / 1000, _this.huntID);
                        _this.getHuntData(_this.huntID);
                    });
                    this.socket.on("location", function (data, username) {
                        var coords = new google.maps.LatLng(data.latitude, data.longitude);
                        setTimeout(function () { return _this.googleMaps.addCurrentMarker(coords, 'user location')
                            .then(function (map) { return _this.map = map; }); }, 2000);
                        console.log('location was updated from socket server ', data, username);
                    });
                }
                SearchPartyComponent.prototype.getHuntData = function (id) {
                    var _this = this;
                    var previousPlaces = [];
                    var previousTasks = [];
                    this.allTasks = [];
                    this._searchPartyService.getHunt(id)
                        .then(function (data) {
                        console.log("data from searchparty service ", data);
                        _this.huntTasks = data.tasks;
                        _this.startLat = data.tasks[0].place.lat;
                        _this.startLng = data.tasks[0].place.lng;
                        _this.content = '<h4>' + data.tasks[0].place.name + ' < /h4><p>' + data.tasks[0].place.address + '</p > ';
                        console.log('data.chatroom.messages:::', data.chatroom.messages);
                        if (data.chatroom.messages) {
                            _this.huntChats = data.chatroom.messages;
                        }
                        _this.huntTasks.forEach(function (item) {
                            console.log(' this is the item ', item);
                            console.log('this is the this.alltasks ', _this.allTasks);
                            _this.allTasks.unshift([[item.place.name], [item.task.content]]);
                            previousPlaces.push(item.place);
                            previousTasks.push(item.task);
                        });
                        setTimeout(function () {
                            _this.googleMaps.finalMapMaker(previousPlaces, previousTasks)
                                .then(function (data) {
                                var flightPath = data;
                            });
                            if (previousPlaces.length > 1) {
                                _this.totalDist = _this.googleMaps.calcDistance(previousPlaces);
                                console.log(_this.totalDist);
                            }
                        }, 2000);
                    })
                        .catch(function (err) { return console.log(err); });
                };
                SearchPartyComponent = __decorate([
                    core_1.Component({
                        selector: 'my-searchparty',
                        templateUrl: './share/app/searchparty.component.html',
                        styleUrls: ['./share/app/searchparty.component.css'],
                        directives: [router_1.ROUTER_DIRECTIVES, all_1.MATERIAL_DIRECTIVES, chat_component_1.ChatComponent, test_component_1.ScrollGlueComponent],
                        providers: [all_1.MATERIAL_PROVIDERS, searchparty_service_1.SearchPartyService, map_service_1.GoogleMapService]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, map_service_1.GoogleMapService, searchparty_service_1.SearchPartyService])
                ], SearchPartyComponent);
                return SearchPartyComponent;
            }());
            exports_1("SearchPartyComponent", SearchPartyComponent);
        }
    }
});
//# sourceMappingURL=searchparty.component.js.map