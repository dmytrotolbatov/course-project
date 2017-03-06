import { Component } from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {Http, Response} from "@angular/http";

/*
  Generated class for the Users page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-users',
  templateUrl: 'minor-translator.html'
})
export class MinorTranslatorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public alertCtrl: AlertController) {}

  private url: string = `https://translate.yandex.net/api/v1.5/tr.json/translate`;
  private key: string = `trnsl.1.1.20170301T135420Z.0c166eb114638a8b.3b7106d8b165070ed387661c32f9c92bff74da15`;
  private translatedText:string = '';
  private fromLanguage: string;
  private toLanguage: string;

  public getTranslation(text) {
    if (!this.fromLanguage || !this.toLanguage) {
      let alert = this.alertCtrl.create({
        title: 'Choose language!',
        buttons: ['OK']
      });
      alert.present();
    }else if (!text) {
      let alert = this.alertCtrl.create({
        title: 'White some text!',
        buttons: ['OK']
      });
      alert.present();
    }else {
      let urlYandex: string = `${this.url}?key=${this.key}&text=${text}&lang=${this.fromLanguage}-${this.toLanguage}`;
      return this.http.get(urlYandex).subscribe((data: any) => {
        this.translatedText = data.json().text[0];
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

}
