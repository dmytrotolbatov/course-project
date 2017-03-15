import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {Http} from "@angular/http";
import * as _ from "lodash"
import {Word} from "../../../shared/word";

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

  private loading: boolean = true;
  private url: string = `http://58bd0d0ea0cc651200a4be7d.mockapi.io/v1/words`;
  private wordObj: Word = new Word();
  private thesaurus: any = [];
  private randomWords: any = [];
  private inputs: any = [];
  private wrongWords: Array<string> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public alertCtrl: AlertController) {
    this.thesaurus = this.navParams.get('thesaurus');
    console.log(this.thesaurus, 'passed thesaurus');
    while (this.randomWords.length < 5) {
      let randomWord = this.thesaurus[Math.floor(Math.random() * this.thesaurus.length)];
      if(!this.contains(this.randomWords, randomWord)){
        console.log('here!');
        this.randomWords.push(randomWord);
      }
    }
    console.log(this.randomWords, 'randomWords');
  }

  ionViewDidEnter() {
    this.loading = false;
  }

  public contains(arr, obj) {
    console.log(arr, obj, 'check if true!');
    for (var i = 0; i < arr.length; i++){
      if (arr[i].id === obj.id){
        return true;
      }
    }
    return false;
  }

  public check() {
    if (this.inputs.length != this.randomWords.length){
      let alert = this.alertCtrl.create({
        title: `Write all answers`,
        buttons: ['OK']
      });
      alert.present();
    }else {
      let mistakes: number = 0;
      console.log(this.inputs);
      for (let i = 0; i < this.inputs.length; i++) {
        if (this.inputs[i].toLowerCase() != this.randomWords[i].name.toLowerCase()) {
          mistakes++;
          this.wrongWords.push(this.inputs[i]);
        }
      }
      let alertCorrect = this.alertCtrl.create({
        title: `Correct!`,
        buttons: ['OK']
      });
      let alertFalse = this.alertCtrl.create({
        title: `Mistakes: ${this.wrongWords.join(', ')}(${mistakes})`,
        buttons: ['OK']
      });
      mistakes > 0 ? alertFalse.present() : alertCorrect.present();
    }
  }
}
