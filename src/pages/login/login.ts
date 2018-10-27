import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams ,Events,Nav} from 'ionic-angular';
//import {RegisterComponent} from '../../components/register/register';
import {MyApp} from '../../app/app.component'
import {QuestionPage} from '../question/question';
import {PlayerdetailPage} from '../playerdetail/playerdetail';
import {RestProvider} from '../../providers/rest/rest';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  constructor(public navCtrl: NavController, public navParams: NavParams,public rest :RestProvider,public events : Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(username,password){
    this.rest.userLogin(username,password);
     console.log('logged in');
     this.navCtrl.pop();
         
    }

}
