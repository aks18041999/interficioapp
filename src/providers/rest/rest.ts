import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable,of} from 'rxjs';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {catchError,tap,map} from 'rxjs/operators';
import {Storage} from '@ionic/storage';
import {User} from '../user.model';
import {Events,AlertController} from 'ionic-angular'
//import * as global from '../../global';
/*
  Generated class for the RestProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

 class level {
      level_no: number ; 
      title : string ;
      ques: string;
      map_bool: boolean ;
    }

//const token = "";
const apiUrl = "https://interback.nitdgplug.org/";
@Injectable()
export class RestProvider {
	level : level ;
  username : string;
  playerdetail : any;
  httpOptions  :any;
  TOKEN : any ;
  constructor(public http: HttpClient, private storage : Storage,public events : Events,public alertCtrl : AlertController) {
    console.log('Hello RestProvider Provider');
    this.TOKEN = localStorage.getItem('TOKEN');
this.httpOptions = this.TOKEN?{

                    headers : new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Token '+this.TOKEN})

                  }:{
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
   // console.log(httpOptions);
  }

    addUser (userData : User){
    return this.http.post(apiUrl+'api/auth/register/',userData, this.httpOptions)
    .subscribe((data:any)=>{
                 localStorage.TOKEN = data.token;
                 console.log(this.TOKEN);
                  this.TOKEN = data.token; 
                  this.username = data.user.username;
                  this.httpOptions = {
                    headers : new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Token '+data.token})

                  }
                  console.log(data);
                  this.events.publish('user:loggedin',data.user.username);
    
              }
              ,error=>{

                let alert = this.alertCtrl.create({
                    title : 'OOPS',
                    subTitle : 'Invalid Details',
                    buttons : ['Try Again'],
                   cssClass:'alert-box'
                });
                alert.present();
                console.log(error);
              }
    )
  
  }
   userLogin (username : string , password : string){
     var content ={
         username : username,
         password : password
     }
    return this.http.post(apiUrl+'api/auth/login/',content, this.httpOptions)
    .subscribe((data:any)=>{
                  localStorage.TOKEN = data.token ;
                  this.TOKEN = data.token;
                  //this.username = data.user.username;
                  this.httpOptions = {
                    headers : new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Token '+data.token})

                  }
                  console.log(data);
                  this.events.publish('user:loggedin',data.user.username);
    
                 }
              ,error=>{
                let alert = this.alertCtrl.create({
                    title : 'Cannot Log In',
                    subTitle : 'Check your username and password',
                    buttons : ['Dismiss'],
                   cssClass:'alert-box'
                });
                alert.present();
                console.log(error);
              }
    )

  }
  getLevel(){
       return this.http.get(apiUrl+'api/getlevel/',this.httpOptions)
    
  }
  submitAns (answer : string , level_no : number){
  
    return this.http.post(apiUrl+'api/submit/ans/',{answer,level_no}, this.httpOptions)
    
    

  }
  submitLocation(level_no : number ,lat : number ,long :number ){
     return this.http.post(apiUrl+'api/submit/location/',{level_no,lat,long}, this.httpOptions)
    
  
  }
  getPlayerDetail(){
      return    this.http.get(apiUrl+'api/player/',this.httpOptions)
     
  }


  getLeaderboard(){

    var httpOptions1= {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
     return    this.http.get(apiUrl+'api/scoreboard/',httpOptions1);

  }
  
  
}