import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {Http} from "@angular/http";

import {Word} from "../../shared/word";
import {TestComponent} from "./test.component";

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

  private loading: boolean = true;
  private url: string = `http://58bd0d0ea0cc651200a4be7d.mockapi.io/v1/words`;
  private urlTranslator: string = `https://translate.yandex.net/api/v1.5/tr.json/translate`;
  private key: string = `trnsl.1.1.20170301T135420Z.0c166eb114638a8b.3b7106d8b165070ed387661c32f9c92bff74da15`;
  private wordObj: Word = new Word();
  private thesaurus: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public alertCtrl: AlertController) {
  }

  ionViewDidEnter() {
    this.loadData();
  }

  public loadData() {
    this.http.get(this.url).subscribe((data: any) => {
      this.thesaurus = data.json();
      this.thesaurus.sort( (word1, word2) => {
        if (word1.name < word2.name) {
          return -1;
        } else if (word1.name > word2.name) {
          return 1;
        } else {
          return 0;
        }
      });
      console.log(this.thesaurus);
      this.loading = false;
      console.log(this.loading);
    });
  }

  public viewTest(){
    this.navCtrl.push(TestComponent, {thesaurus: this.thesaurus})
  }

  public addWord(word) {
    if (!word) {
      let alert = this.alertCtrl.create({
        title: 'White some text!',
        buttons: ['OK']
      });
      alert.present();
    }else {
      if (this.contains(this.thesaurus, word.toLowerCase())) {
        let alertDublicate = this.alertCtrl.create({
          title: 'You have this word in list!',
          buttons: ['OK']
        });
        alertDublicate.present();
      }else {
        let urlYandex: string = `${this.urlTranslator}?key=${this.key}&text=${word}&lang=en-uk`;
        return this.http.get(urlYandex).subscribe((data: any) => {
          this.wordObj.name = word.toLowerCase();
          this.wordObj.translation = data.json().text[0].toLowerCase();
          console.log(this.wordObj);
          this.http.post(this.url, this.wordObj).subscribe((data: any) => {
            console.log(data);
            this.loadData();
          });
        });
      }
    }
  }

  public deleteUser(id: number) {
    return this.http.delete(`${this.url}/${id}`).subscribe((data: any) => {
      console.log(data);
      this.loadData();
    });
  }

  public contains(arr, word) {
    for (var i = 0; i < arr.length; i++){
      if (arr[i].name === word){
        return true;
      }
    }
    return false;
  }
}
