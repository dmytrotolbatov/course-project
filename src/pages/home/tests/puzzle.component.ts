import { Component } from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';

@Component({
  selector: 'puzzle-component',
  templateUrl: 'puzzle.component.html'
})
export class PuzzleComponent {

  private index: number = 0;
  private loading: boolean = true;
  private thesaurus: any = [];
  private shuffledThesaurus: Array<any> = [];
  private wordsForPuzzle: Array<any> = [];
  private inputForPuzzle: string = '';
  private correctAnswers: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.thesaurus = this.navParams.get('thesaurus');
    this.shuffledThesaurus = this.shuffle(this.thesaurus);
    console.log(this.shuffledThesaurus[0].name, 'shuffled');
    for (var i = 0; i < this.shuffledThesaurus.length; i++){
      let puzzledWord = this.shuffledThesaurus[i].name;
      puzzledWord = this.shuffle(puzzledWord.split(""));
      this.wordsForPuzzle.push({'puzzle': puzzledWord, 'answer': this.shuffledThesaurus[i].name});
    }
    console.log(this.wordsForPuzzle, 'WORDS for puzzle');
  }

  ionViewDidEnter() {
    this.loading = false;
  }

  public check() {
    if (!this.inputForPuzzle) {
      let alert = this.alertCtrl.create({
        title: `Write answer`,
        buttons: ['OK']
      });
      alert.present();
    }else if (this.inputForPuzzle == this.wordsForPuzzle[this.index].answer){
      this.correctAnswers++;
      let alert = this.alertCtrl.create({
        title: `Correct`,
        buttons: ['OK']
      });
      alert.present();
    }else {
      let alert = this.alertCtrl.create({
        title: `Wrong`,
        buttons: ['OK']
      });
      alert.present();
    }
  }

  public next(input: HTMLInputElement) {
    input.value = null;
    if (this.index != this.wordsForPuzzle.length - 1){
      this.index++;
    }else {
      this.index = 0;
      let alert = this.alertCtrl.create({
        title: `Correct answers: ${this.correctAnswers}`,
        buttons: ['OK']
      });
      alert.present();
      this.correctAnswers = 0;
    }
  }

  public shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
