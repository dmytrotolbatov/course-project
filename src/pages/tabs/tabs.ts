import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { MinorTranslatorPage } from "../minor-translator/minor-translator";
import { MainTranslatorPage } from "../main-translator/main-translator";
import { ThesaurusPage } from "../thesaurus/thesaurus";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab4Root: any = MinorTranslatorPage;
  tab5Root: any = MainTranslatorPage;
  tab6Root: any = ThesaurusPage;
}
