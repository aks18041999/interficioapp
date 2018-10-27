import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RestProvider} from '../../providers/rest/rest';
//import {} from '@swimlane/ngx-datatable';
/**
 * Generated class for the LeaderboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leaderboard',
  templateUrl: 'leaderboard.html',
})
export class LeaderboardPage {
	standings : Array<any> ;
	loaded =false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public rest : RestProvider) {
    //localStorage.PresentPage = LeaderboardPage;
  this.rest.getLeaderboard()
  		.subscribe((data:any)=>{
  		this.standings = data;
  		this.loaded = true;
      console.log(data);
  		console.log(this.standings); 
  	
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaderboardPage');
  }

}
