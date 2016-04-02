import {Storage, LocalStorage} from 'ionic-angular';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Rx';


@Injectable()
export class AuthService {
  jwtHelper: JwtHelper = new JwtHelper();
  local: Storage = new Storage(LocalStorage);
  refreshSubscription: any;
  user: Object;

  constructor(private authHttp: AuthHttp) {
    // If there is a profile saved in local storage
    let profile = this.local.get('profile')._result;
    if (profile) {
      this.user = JSON.parse(profile);
    }
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    return tokenNotExpired();
  }
}
