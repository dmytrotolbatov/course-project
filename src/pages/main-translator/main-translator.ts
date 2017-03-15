import { Component } from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {Http} from "@angular/http";

/*
  Generated class for the MainTranslator page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-main-translator',
  templateUrl: 'main-translator.html'
})
export class MainTranslatorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public alertCtrl: AlertController) {}

  private loading: boolean;
  private url: string = `http://api.pearson.com/v2/dictionaries/entries?headword=`;
  private results: Array<any> = [];

  public getWord(word) {
    if (!word) {
      let alert = this.alertCtrl.create({
        title: 'Enter word!',
        buttons: ['OK']
      });
      alert.present();
    }else {
      this.loading = true;
      let urlDictionary: string = `${this.url}${word}`;
      return this.http.get(urlDictionary).subscribe((data: any) => {
        this.results = data.json().results;
        console.log(this.results);
        this.loading = false;
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainTranslatorPage');
  }

}
