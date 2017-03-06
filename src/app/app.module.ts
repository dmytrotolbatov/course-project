import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {MinorTranslatorPage} from "../pages/minor-translator/minor-translator";
import {MainTranslatorPage} from "../pages/main-translator/main-translator";
import {ThesaurusPage} from "../pages/thesaurus/thesaurus";
import {TestComponent} from "../pages/thesaurus/test.component";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MinorTranslatorPage,
    MainTranslatorPage,
    ThesaurusPage,
    TestComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MinorTranslatorPage,
    MainTranslatorPage,
    ThesaurusPage,
    TestComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
