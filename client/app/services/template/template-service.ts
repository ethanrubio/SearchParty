import {Injectable} from 'angular2/core';
import {LocalStorage} from 'ionic-angular';
import {Http, Headers} from 'angular2/http';
import {UrlService} from '../url/url-service';
import 'rxjs/add/operator/map';

@Injectable()
export class TemplateService {
  TEMPLATES_URL: string = 'https://getsearchparty.com/templates';
  TASKS_URL: string = 'https://getsearchparty.com/tasks';
  keyword: string;
  contentHeader: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private _http:Http, urlservice:UrlService) {
    urlservice.grabUrls()
      .then(urls => {
        console.log('these are the urls fetched ', urls);
        this.TASKS_URL = urls.tasks;
        console.log('this is now the new tasks_url !', this.TASKS_URL);
      })
        .catch(err => console.log('error fetching urls ', err));
  }

  // future use function
  getData() {
    console.log('called get req');
    let httpGetPromise = new Promise((resolve, reject) => {
      console.log('inside get promise');
      this._http.get(this.TEMPLATES_URL)
        .map(res => res.json())
        .subscribe(
          data => {
            console.log('data from promise: ', data);
            resolve(data);
          },
          err => {
            this.logError(err);
            reject(err);
          },
          () => console.log('data recieved')
          )
        })
    return httpGetPromise;
  }

  postData(data, userInfo) {
    console.log('called post req');
    let httpGetPromise = new Promise((resolve, reject) => {
      console.log('inside post promise');
      console.log('THIS IS THE DATA shold be keyword', data)
      console.log("THIS IS THE USER LOCATION IN TEMPLATE SERVICE ", userInfo);
      let currentTime = new Date();

      let dataToSend = {
        keyword: data,
        geolocation:  {
          lat: userInfo.userLat,
          lng: userInfo.userLng
        },
        token: userInfo.id_token,
        previousPlaces: [],
        previousTasks: [],
        date: currentTime
      };

      console.log("THIS IS THE COMBO DATA BEFORE SENT ", dataToSend);
      this._http.post(this.TASKS_URL, JSON.stringify(dataToSend), {headers: this.contentHeader})
        .map(res => res.json())
        .subscribe(
          data => {
            console.log('data from promise: ', data);
            resolve(data);
          },
          err => {
            this.logError(err);
            reject(err);
          },
          () => console.log('data recieved')
          )
        })
    return httpGetPromise;
  }

  logError(err) {
    console.error('There was an error: ' + err);
  }
}
