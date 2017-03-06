import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from "@angular/http";

/*
  Generated class for the Thesaurus page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-thesaurus',
  templateUrl: 'thesaurus.html'
})
export class ThesaurusPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http,) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThesaurusPage');
  }

  private addWord(word) {

  }

}
