import { Activity } from './../types';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  API_URL = "https://orangevalleycaa.org/api/videos";

  constructor(private _httpClient: HttpClient) { }

  getActivity  = (id) : Observable<Activity> => {
    return this._httpClient.get<Activity>(`${this.API_URL}/id/${id}`)
  }

  getAllActivities = () : Observable<Activity[]> => {
    return this._httpClient.get<Activity[]>(this.API_URL);
  }
}

