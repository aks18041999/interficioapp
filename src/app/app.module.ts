import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {HttpClientModule} from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {RulesPage} from '../pages/rules/rules';
import {LoginPage} from '../pages/login/login';
import {LeaderboardPage} from '../pages/leaderboard/leaderboard';
import {RegisterPage} from '../pages/register/register';
//import {MapComponent} from '../components/map/map';
//import {RegisterComponent} from '../components/register/register';
import  {QuestionPage} from '../pages/question/question';
import {PlayerdetailPage} from '../pages/playerdetail/playerdetail';
//import {ComponentsModule} from '../components/components.module'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {RestProvider} from '../providers/rest/rest';
import { AuthProvider } from '../providers/auth/auth';
import { IonicStorageModule } from '@ionic/storage';
import { GoogleMaps } from '@ionic-native/google-maps';
import {Geolocation} from '@ionic-native/geolocation';
//import {AndroidFullScreen} from '@ionic-native/android-full-screen';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    RulesPage,
    QuestionPage,
    LoginPage,
    LeaderboardPage,
    RegisterPage,
    //MapComponent,
    PlayerdetailPage,
    //RegisterComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    RulesPage,
    QuestionPage,
    LoginPage,
    LeaderboardPage,
    RegisterPage,
    PlayerdetailPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    AuthProvider
  //  AndroidFullScreen
  ]
})
export class AppModule {}