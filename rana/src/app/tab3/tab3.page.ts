import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";

import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page implements OnInit {
  myProfileImage: string;

  myStoredProfileImage: Observable<any>;

  constructor(
    private _camera: Camera,
    private _alertController: AlertController,
    private _angularFireStore: AngularFirestore,
    private _angularFireAuth: AngularFireAuth
  ) {}

   ngOnInit() {
     console.log("OK1")
    this._angularFireAuth.currentUser.then(user => {
      this.myStoredProfileImage = this._angularFireStore
      .collection("user")
      .doc(user.uid)
      .valueChanges();
    });
    console.log("OK2")
    
  }

  selectImageSource = async () => {
    const alert = await this._alertController.create({
      header: "Select source",
      message: "Pick a source for your image",
      buttons: [
        {
          text: "Camera",
          handler: () => {
            this._camera
              .getPicture(this.getImageOptions(true))
              .then(async (imageData) => {
                const image_src = `data:image/jpeg;base64,${imageData}`;
                const currentUser = await this._angularFireAuth.currentUser;

                this._angularFireStore
                  .collection("user")
                  .doc(currentUser.uid)
                  .set({
                    image_src,
                  });
              });
          },
        },
        {
          text: "Gallery",
          handler: () => {
            this._camera
              .getPicture(this.getImageOptions(false))
              .then(async (imageData) => {
                const image_src = `data:image/jpeg;base64,${imageData}`;
                const currentUser = await this._angularFireAuth.currentUser;

                this._angularFireStore
                  .collection("user")
                  .doc(currentUser.uid)
                  .set({
                    image_src,
                  });
              });
          },
        },
      ],
    });

    await alert.present();
  };

  getImageOptions = (isCamera): CameraOptions => {
    return {
      quality: 100,
      destinationType: this._camera.DestinationType.DATA_URL,
      encodingType: this._camera.EncodingType.JPEG,
      mediaType: this._camera.MediaType.PICTURE,
      targetHeight: 200,
      targetWidth: 200,
      correctOrientation: true,
      sourceType: isCamera
        ? this._camera.PictureSourceType.CAMERA
        : this._camera.PictureSourceType.SAVEDPHOTOALBUM,
    };
  };
}
