import { Component } from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {Http} from "@angular/http";
import {Word} from "../../shared/word";

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
  private wordObj: Word = new Word();
  private urlThesaurus: string = `http://58bd0d0ea0cc651200a4be7d.mockapi.io/v1/words`;

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

  public addWord(word, translation) {
    this.wordObj.name = word;
    this.wordObj.translation = translation;
    this.http.post(this.urlThesaurus, this.wordObj).subscribe((data: any) => {
      console.log(data);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

}
