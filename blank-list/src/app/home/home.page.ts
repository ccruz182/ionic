import { Component } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  favBands = [
    {
      id: 1,
      name: "Miranda!",
    },
    {
      id: 2,
      name: "blink-182",
    },
    {
      id: 3,
      name: "Tan Biónica",
    },
    {
      id: 4,
      name: "Angels & Airwaves",
    },
    {
      id: 5,
      name: "Silvina Moreno",
    },
    {
      id: 6,
      name: "Salvapantallas",
    },
    {
      id: 7,
      name: "Social Distortion",
    },
    {
      id: 8,
      name: "Meteoros",
    },
  ];

  largeList = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
  ];

  numbers = ["0", "1", "2", "3", "4", "5"]

  constructor() {}

  loadMore = ($event) => {
    setTimeout(() => {
      this.largeList = [...this.largeList, ...this.largeList.reverse()];
      $event.target.complete();
    }, 3000);
  };

  doRefresh = ($event) => {
    setTimeout(() => {
      this.largeList = [...this.numbers, ... this.largeList];
      $event.target.complete();
    }, 2000);
  };
}
