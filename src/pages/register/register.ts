import { Component ,Renderer} from '@angular/core';
import { IonicPage, NavController, NavParams ,Events,ViewController} from 'ionic-angular';
import {Validators,FormBuilder,	FormGroup,FormControl} from '@angular/forms';
import { UsernameValidator } from '../../validators/username.validator';

import {RestProvider} from '../../providers/rest/rest';
import {User} from '../../providers/user.model';

import {MyApp} from '../../app/app.component'
import {QuestionPage} from '../question/question';
import {PlayerdetailPage} from '../playerdetail/playerdetail';
import {Storage} from '@ionic/storage';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//form validation needed
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user : User ;
	private register :  FormGroup;
 	constructor(public navCtrl: NavController, 
  			public navParams: NavParams,
  			public formbuilder: FormBuilder, private storage : Storage,public rest : RestProvider,public events : Events,public renderer: Renderer, public viewCtrl: ViewController) {
       this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'page-register', true);

       this.register = this.formbuilder.group ({

  		password : new FormControl('', Validators.required),
	
 	username: new FormControl('', Validators.required),
	name: new FormControl('', Validators.required),

	contact :  new FormControl('',Validators.required),
	
	email: new FormControl('', Validators.compose([
	 Validators.required,
	 Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
 	]))
	})

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  logForm(){

  	console.log('data entered');
  	//take data from here;
    this.rest.addUser(this.register.value);
    this.navCtrl.pop()
          
  }

}
