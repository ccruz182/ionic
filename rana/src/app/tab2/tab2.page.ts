import { Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page implements OnInit {
  activityList: Observable<any>;

  constructor(
    private _angularFireStore: AngularFirestore,
    private _angularFireAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.setActivities();
  }

  setActivities = async () => {
    const currentUser = await this._angularFireAuth.currentUser;
    this.activityList = this._angularFireStore
      .collection("user")
      .doc(currentUser.uid)
      .collection("favorites")
      .valueChanges();

    this.activityList.subscribe((data) => {
      console.log("*** data", data);
    });
  };
}
