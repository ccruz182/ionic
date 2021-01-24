import { ActivityVideoPageModule } from './../activity-video/activity-video.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityDetailPageRoutingModule } from './activity-detail-routing.module';

import { ActivityDetailPage } from './activity-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    //ActivityVideoPageModule,
    ActivityDetailPageRoutingModule
  ],
  declarations: [ActivityDetailPage]
})
export class ActivityDetailPageModule {}
