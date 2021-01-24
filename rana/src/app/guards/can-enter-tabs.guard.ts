import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CanEnterTabsGuard implements CanActivate {
  constructor(
    private _angularFireAuth: AngularFireAuth,
    private _router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._angularFireAuth.authState.pipe(
      map((auth) => {
        if (!auth) {
          this._router.navigate(["/login"]);
          return false;
        }
        
        return true;
      })
    );
  }
}
