import { Component } from '@angular/core';

import { ConfigPage } from '../config/config';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ChartPage } from '../chart/chart';
import { NavController,NavParams } from "ionic-angular";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {


  constructor(public navCtrl:NavController, public navParams:NavParams, public http:Http) {
  }

  public id = 5;
  
  tab1Root = HomePage;
  tab2Root = ChartPage;
  tab3Root = ConfigPage;
  tab3Params = { id: this.id };
  tab4Root = ContactPage;


}
