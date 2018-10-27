import { Component } from '@angular/core';

import { NavController,ModalController,Events } from 'ionic-angular';
import {RestProvider} from '../../providers/rest/rest';
import {RegisterPage} from '../register/register';
//import {RegisterComponent} from '../../components/register/register';
import {MyApp} from '../../app/app.component'
import {QuestionPage} from '../question/question';
import {PlayerdetailPage} from '../playerdetail/playerdetail';
import {LoginPage} from '../login/login';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	 bool = false ;
  constructor(public navCtrl: NavController , public modalCtrl : ModalController,public events : Events,public rest : RestProvider) {
    //localStorage.PresentPage = HomePage;
  }
  openLogin(){
  	let modal = this.modalCtrl.create(LoginPage,{},{showBackdrop:true, enableBackdropDismiss:true,cssClass : 'modal'});
   modal.present();
  }
  openRegisterModal(){
  	let modal = this.modalCtrl.create(RegisterPage,{},{showBackdrop:true, enableBackdropDismiss:true,cssClass : 'modal'});
   modal.present();
 }



}
