import { LoginCredential } from "./../types";
import { LoginService } from "./../services/login.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  loginFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _loginService: LoginService,
    private _router: Router
  ) {
    this.loginFormGroup = this._formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  ngOnInit() {}

  login = () => {
    const loginCredentials: LoginCredential = this.loginFormGroup.value;
    this._loginService
      .login(loginCredentials)
      .then((data) => this._router.navigate(["/tabs"]))
      .catch((error) => console.log("error", error));
  };
}
