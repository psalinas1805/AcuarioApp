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
import { WebsocketProvider } from '../providers/websocket/websocket';

import { PopoverComponent } from "../components/popover/popover";

//Sockets
import { SocketIoConfig, SocketIoModule } from "ng-socket-io";
const config: SocketIoConfig = {url: 'localhost:3000', options: {} };

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
    TabsPage,
    PopoverComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config)
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
    TabsPage,
    PopoverComponent
  ],
  providers: [AuthService,
    StatusBar,
    SplashScreen,
    FCM,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WsAcuarioProvider,
    WebsocketProvider
    
  ]
})
export class AppModule {}
