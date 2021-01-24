import { Observable } from 'rxjs';
import { ActivityService } from './../services/activity.service';
import { Component } from '@angular/core';
import { Activity } from '../types';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  activityList: Observable<Activity[]>;

  constructor(private _activityService: ActivityService) {
    this.activityList = this._activityService.getAllActivities();
  }

}
