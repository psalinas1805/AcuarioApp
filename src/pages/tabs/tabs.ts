import { Component } from '@angular/core';

import { ConfigPage } from '../config/config';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ChartPage } from '../chart/chart';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ChartPage;
  tab3Root = ConfigPage;
  tab4Root = ContactPage;
  constructor() {

  }
}
