import { Component } from '@angular/core';
import { NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Word } from '../../../shared/word';

@Component({
  selector: 'puzzle-component',
  templateUrl: 'puzzle.component.html'
})
export class PuzzleComponent {

  private url: string = `http://58bd0d0ea0cc651200a4be7d.mockapi.io/v1/words`;
  private index: number = 0;
  private loading: boolean = true;
  private thesaurus: any = [];
  private shuffledThesaurus: Array<any> = [];
  private wordsForPuzzle: Array<any> = [];
  private inputForPuzzle: string = '';
  private correctAnswers: number = 0;

  constructor(public navParams: NavParams, public alertCtrl: AlertController, private http: Http) {
    this.thesaurus = this.navParams.get('thesaurus');
    this.shuffledThesaurus = this.shuffle(this.thesaurus);
    for (var i = 0; i < this.shuffledThesaurus.length; i++){
      let puzzledWord = this.shuffledThesaurus[i].name;

      puzzledWord = this.shuffle(puzzledWord.split(""));
      this.wordsForPuzzle.push({
        'puzzle': puzzledWord,
        'answer': this.shuffledThesaurus[i].name,
        'id': this.shuffledThesaurus[i].id,
        'correctAnswers': this.shuffledThesaurus[i].correctAnswers});
    }
  }

  ionViewDidEnter() {
    this.loading = false;
  }

  public check(input: HTMLInputElement) {
    if (!this.inputForPuzzle) {
      let alert = this.alertCtrl.create({
        title: `Write answer`,
        buttons: ['OK']
      });

      alert.present();
    }else if (this.inputForPuzzle == this.wordsForPuzzle[this.index].answer){
      this.correctAnswers++;
      let wordObj: Word = new Word();

      wordObj.id = this.wordsForPuzzle[this.index].id;
      wordObj.correctAnswers = this.wordsForPuzzle[this.index].correctAnswers + 1;
      this.http.put(`${this.url}/${wordObj.id}`, wordObj).subscribe((data: any) => {
        console.log(data);
      });

      let alert = this.alertCtrl.create({
        title: `Correct`,
        buttons: ['OK']
      });

      alert.present();
      this.next(input);
    }else {
      let wordObj: Word = new Word();

      wordObj.id = this.wordsForPuzzle[this.index].id;
      if (wordObj.correctAnswers > 0){
        wordObj.correctAnswers = this.wordsForPuzzle[this.index].correctAnswers - 1;
      }

      this.http.put(`${this.url}/${wordObj.id}`, wordObj).subscribe((data: any) => {
        console.log(data);
      });

      let alert = this.alertCtrl.create({
        title: `Wrong`,
        buttons: ['OK']
      });
      alert.present();
      this.next(input);
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

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
