import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SingupPage } from '../pages/singup/singup';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ConfigPage } from '../pages/config/config';
import { ChartPage } from '../pages/chart/chart';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WsAcuarioProvider } from '../providers/ws-acuario/ws-acuario';
import { HttpClientModule} from '@angular/common/http';
import { HttpModule} from '@angular/http';
import {AuthService} from '../providers/auth_service';
import { FCM } from '@ionic-native/fcm';
import { Push } from '@ionic-native/push';


import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    ConfigPage,
    LoginPage,
    SingupPage,
    AboutPage,
    ContactPage,
    HomePage,
    ChartPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    LoginPage,
    ConfigPage,
    SingupPage,
    AboutPage,
    ContactPage,
    HomePage,
    ChartPage,
    TabsPage
  ],
  providers: [AuthService,
    StatusBar,
    SplashScreen,
    FCM,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WsAcuarioProvider
    
  ]
})
export class AppModule {}
