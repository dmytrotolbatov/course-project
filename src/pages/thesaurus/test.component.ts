import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {Http} from "@angular/http";
import {Word} from "../../shared/word";

/*
 Generated class for the Thesaurus page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'test-component',
  templateUrl: 'test-component.html'
})
export class TestComponent {

  private url: string = `http://58bd0d0ea0cc651200a4be7d.mockapi.io/v1/words`;
  private urlTranslator: string = `https://translate.yandex.net/api/v1.5/tr.json/translate`;
  private key: string = `trnsl.1.1.20170301T135420Z.0c166eb114638a8b.3b7106d8b165070ed387661c32f9c92bff74da15`;
  private wordObj: Word = new Word();
  private thesaurus: any = [];
  private randomWords: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public alertCtrl: AlertController) {
    this.thesaurus = this.navParams.get('thesaurus');
    console.log(this.thesaurus, 'passed thesaurus');
    while (this.randomWords.length < 5) {
      if(!this.randomWords.includes(this.thesaurus[Math.floor(Math.random() * this.thesaurus.length)])){
        console.log('here!');
        this.randomWords.push(this.thesaurus[Math.floor(Math.random() * this.thesaurus.length)])
      }
    }
    console.log(this.randomWords, 'randomWords');
  }

  /*ionViewDidEnter() {
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
    });
  }

  public addWord(word) {
    if (!word) {
      let alert = this.alertCtrl.create({
        title: 'White some text!',
        buttons: ['OK']
      });
      alert.present();
    }else {
      let urlYandex: string = `${this.urlTranslator}?key=${this.key}&text=${word}&lang=en-uk`;
      return this.http.get(urlYandex).subscribe((data: any) => {
        // this.translatedText = data.json().text[0];
        this.wordObj.name = word;
        this.wordObj.translation = data.json().text[0];
        console.log(this.wordObj);
        this.http.post(this.url, this.wordObj).subscribe((data: any) => {
          console.log(data);
          this.loadData();
        });
      });
    }

  }*/
}
