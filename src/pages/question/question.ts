import { Component ,Input,Renderer2,ElementRef,Inject,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController,AlertController} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {RulesPage} from '../rules/rules';
import {LeaderboardPage} from '../leaderboard/leaderboard';
import {MyApp} from '../../app/app.component';
import {DOCUMENT} from '@angular/platform-browser';
import {Plugins} from '@capacitor/core';
//import //{MapComponent} from '../../components/map/map'
import {RestProvider} from '../../providers/rest/rest';
import {Geolocation} from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  LatLng
} from '@ionic-native/google-maps';

/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//declare var google ;
@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {

watchId : any;
username : string;
map1=false;
//query : any;
//autocompleteService :any;
pages: Array<{title: string, component: any}>;
 @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap ;
  location : LatLng ;
  marker : any;
  level : any;
  loaded = false;
   constructor(public navCtrl: NavController, public navParams: NavParams,public renderer : Renderer2,public rest : RestProvider,public alertCtrl : AlertController,private googleMaps : GoogleMaps,public geolocation : Geolocation) {
  	this.username = navParams.get('username');
     //this.location = new LatLng(42.346903, -71.135101);
 //  this.autocompleteService= new google.maps.places.AutocompleteService();
  }
  ionViewCanEnter() {
    console.log("in ionViewCanEnter")
    
    return new Promise((resolve, reject) => {    
 this.rest.getLevel()
   .subscribe((data:any)=>{
     this.level=data;
     this.map1 = data.map_bool;
     console.log(data);
     this.loaded = true;
     resolve(data);
   },error=>{
     console.log(error);
     reject(error);
   });
          });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
            this.initMap();
            
  }
   initMap() {
     //Environment.setEnv({
      //'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyCX_Bhbh3D6obT8nuQZz3y4TwdGTP60k2o',
      //'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyCX_Bhbh3D6obT8nuQZz3y4TwdGTP60k2o'
   // });
     navigator.geolocation.getCurrentPosition
    ((pos)=>{
       
      //this.location = new LatLng(pos.coords.latitude,pos.coords.longitude);
       //console.log(pos,this.location);
           let element = this.mapElement.nativeElement;
     let mapOptions : GoogleMapOptions = {
       camera : {
         target : {
           
            lat: pos.coords.latitude,
        lng: pos.coords.longitude
       }
         },
          zoom: 30,
          //mapTypeId: google.maps.MapTypeId.ROADMAP
     }
     console.log(mapOptions + 'ayush');
    this.map = GoogleMaps.create('map',mapOptions);
 
    let marker: Marker = this.map.addMarkerSync({
      title: 'Location',
      icon: 'blue',
      animation: 'DROP',
      position: {
          lat: pos.coords.latitude,
        lng: pos.coords.longitude
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
     })

 
  }
    
   
   
   
   ngOnDestroy(){
     /// navigator.geolocation.clearWatch(this.watchId);
   }
   
  submitAnswer(answer : string){
     this.rest.submitAns(answer,this.level.level_no)
     .subscribe((data:any)=>{
                  if(data.success == true) {
                     let alert = this.alertCtrl.create({
                    title : 'Yasss',
                    subTitle : 'Correct Answer',
                    buttons : [{text : 'Next Level',
                      handler: temp=>{
                       
                        window.location.reload();



                        //this.navCtrl
                          alert.dismiss();
                          }
                  }],
                   cssClass:'correct'
                });
                alert.present();
                      console.log('correct ans');
                  }
                  else{
                    let alert = this.alertCtrl.create({
                    title : 'OOPPPS',
                    subTitle : 'Wrong Answer',
                    buttons : ['try again'],
                     
                   cssClass:'wrong',
                    enableBackdropDismiss: false
                });
                alert.present();
                
                   console.log('wrong');                  }
                  console.log(data);
              }
              ,error=>{
                console.log(error);
              }
    )
   }
  submitLocation(){
 navigator.geolocation.getCurrentPosition
     ((pos)=>{
       console.log(pos);
       this.rest.submitLocation(this.level.level_no ,pos.coords.latitude,pos.coords.longitude)
   .subscribe((data:any)=>{
       if(data.success == true) {
                      let alert = this.alertCtrl.create({
                    title : 'Yasss',
                    subTitle : 'Correct Location',
                    buttons : [{text : 'Next Level',
                      handler: temp=>{
                       
                        window.location.reload();



                        //this.navCtrl
                          alert.dismiss();
                          }
                  }],
                   cssClass:'correct'
                });
                alert.present();
                console.log('correct ans');
                  }
                  else{
                       let alert = this.alertCtrl.create({
                    title : 'OOPPPS',
                    subTitle : 'Wrong Location',
                    buttons : ['try again'],
                     
                   cssClass:'wrong',
                    enableBackdropDismiss: false
                });
                alert.present();
                //alert.dismiss();
                   console.log('wrong');                  }
                  console.log(data);
              }
              ,error=>{
                console.log(error);
              }
    )
      })
      
       

    }    
   
   
}
