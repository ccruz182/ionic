import { ModalController, NavParams } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-activity-video",
  templateUrl: "./activity-video.page.html",
  styleUrls: ["./activity-video.page.scss"],
})
export class ActivityVideoPage implements OnInit {
  videoURL = "";

  constructor(navParams: NavParams, private _modalController: ModalController) {
    this.videoURL = navParams.get("videoURL");
  }

  ngOnInit() {}

  closeModal = () => {
    this._modalController.dismiss();
  };
}
