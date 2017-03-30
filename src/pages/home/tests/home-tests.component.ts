import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from "@angular/http";

import { TestComponent } from "./test.component";
import { PuzzleComponent } from "./puzzle.component";


@Component({
  selector: 'home-tests',
  templateUrl: 'home-tests.component.html'
})
export class HomeTestsComponent {

  private thesaurus: Array<any> = [];
  private loading: boolean = true;
  private url: string = `http://58bd0d0ea0cc651200a4be7d.mockapi.io/v1/words`;

  constructor(public navCtrl: NavController, private http: Http,) {}

  ionViewDidEnter() {
    this.loading = false;
    this.loadData();
  }

  public viewTest(){
    this.navCtrl.push(TestComponent, {thesaurus: this.thesaurus})
  }

  public viewPuzzle(){
    this.navCtrl.push(PuzzleComponent, {thesaurus: this.thesaurus})
  }

  public loadData() {
    this.http.get(this.url).subscribe((data: any) => {
      let sourceThesaurus = data.json();

      for (var i = 0; i < sourceThesaurus.length; i++) {
        if (sourceThesaurus[i].correctAnswers < 11) {
          this.thesaurus.push(sourceThesaurus[i]);
        }
      }

      this.thesaurus.sort( (word1, word2) => {
        if (word1.name < word2.name) {
          return -1;
        } else if (word1.name > word2.name) {
          return 1;
        } else {
          return 0;
        }
      });

      this.loading = false;
    });
  }
}
