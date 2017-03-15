import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {TestComponent} from "./tests/test.component";
import {HomeTestsComponent} from "./tests/home-tests.component";

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

  public viewHomeTests(){
    this.navCtrl.push(HomeTestsComponent)
  }

}
