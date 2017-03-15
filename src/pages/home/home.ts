import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private loading: boolean = true;

  constructor(public navCtrl: NavController) {}

  ionViewDidEnter() {
    this.loading = false;
  }

}
