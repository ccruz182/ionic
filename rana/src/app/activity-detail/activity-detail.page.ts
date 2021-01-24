import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { ActivityVideoPage } from "./../activity-video/activity-video.page";
import { ActivityService } from "./../services/activity.service";
import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Activity } from "../types";
import { ActivatedRoute } from "@angular/router";
import { ModalController, ToastController } from "@ionic/angular";

import { SocialSharing } from "@ionic-native/social-sharing/ngx";

@Component({
  selector: "app-activity-detail",
  templateUrl: "./activity-detail.page.html",
  styleUrls: ["./activity-detail.page.scss"],
})
export class ActivityDetailPage implements OnInit {
  activityDetail: Observable<Activity>;
  addedToFavoritesToast: object;
  alreadyInFavoritesToast: object;

  constructor(
    private _modalController: ModalController,
    private _toastController: ToastController,
    private _activityService: ActivityService,
    private _activatedRoute: ActivatedRoute,
    private _socialSharing: SocialSharing,
    private _angularFireStore: AngularFirestore,
    private _angularFireAuth: AngularFireAuth
  ) {
    const activityID = this._activatedRoute.snapshot.params["activityID"];

    this.activityDetail = this._activityService.getActivity(activityID);

    this.addedToFavoritesToast = {
      header: 'This activity was added to your favorites',
      position: 'top',
      duration: 3500,
      color: 'success'
    };

    this.alreadyInFavoritesToast ={
      header: 'This activity is already in your favorites',
      position: 'top',
      duration: 3500,
      color: 'warning'
    };
  }

  ngOnInit() {}


  openModal = async () => {
    const videoModel = await this._modalController.create({
      component: ActivityVideoPage,
    });

    return await this.activityDetail.subscribe((detail) => {
      videoModel.componentProps = {
        videoURL: detail.video_url,
      };

      return videoModel.present();
    });
  };

  share = () => {
    this.activityDetail.subscribe((data) => {
      this._socialSharing.share(
        "Look what I found on this app called Rana",
        data.name,
        "",
        data.cropped
      );
    });
  };

  addToFavorites = () => {
    this.activityDetail.subscribe(async (activity) => {
      const currentUser = await this._angularFireAuth.currentUser;
      this._angularFireStore
        .collection("user")
        .doc(currentUser.uid)
        .collection("favorites", (ref) =>
          ref.where("activity.id", "==", activity.id)
        )
        .get()
        .subscribe(async (doc) => {
          if (doc.empty) {
            this._angularFireStore
              .collection("user")
              .doc(currentUser.uid)
              .collection("favorites")
              .add({ activity }).then(async () => {
                const toast = await this._toastController.create(this.addedToFavoritesToast)

                return await toast.present();
              });
          } else {
            const toast = await this._toastController.create(this.alreadyInFavoritesToast)

            return await toast.present();
          }
        });
    });
  };
}
