import { Component ,Input,Renderer2,ElementRef,Inject,ViewChild,Pipe,PipeTransform} from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController,AlertController,ToastController} from 'ionic-angular';
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
  LatLng,
  LocationService,
  MyLocation,
  MyLocationOptions
} from '@ionic-native/google-maps';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

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
  nolevel=false;
  alldone=false;
   constructor(private  locationAccuracy : LocationAccuracy,public navCtrl: NavController, public navParams: NavParams,public renderer : Renderer2,public rest : RestProvider,public alertCtrl : AlertController,private googleMaps : GoogleMaps,public geolocation : Geolocation, public toastCtrl : ToastController) {
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
     if(data=='ALLDONE')//all done  level
       {//this.endpage=true
         this.map1=false;
         this.nolevel=false;;
         this.alldone=true;
       }
      if (data.ques=='PAUSE')// noloevel condition
      {
        this.map1=false;
        this.alldone=false;
        this.nolevel=true;
      }
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
   let options: MyLocationOptions = {
  enableHighAccuracy: true
}; this.locationAccuracy.canRequest().then((canRequest:boolean)=>{
  if(canRequest){
this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
           LocationService.getMyLocation(options)
     .then((pos :MyLocation)=>{
       
      //this.location = new LatLng(pos.coords.latitude,pos.coords.longitude);
       //console.log(pos,this.location);
          const toast = this.toastCtrl.create({
      message: 'Got Location Sucessfully',
      duration: 3000
    });
    toast.present();
     let mapOptions : GoogleMapOptions = {
       camera : {
         target : pos.latLng,

       zoom : 18,
       tilt : 30
         }
  }
          //mapTypeId: google.maps.MapTypeId.ROADMAP
     
    console.log(mapOptions + 'ayush');
    this.map = GoogleMaps.create('map',mapOptions);
 
    let marker: Marker = this.map.addMarkerSync({
      title: 'Location',
      icon: 'blue',
      animation: 'DROP',
      position: pos.latLng
    });
     })
     .catch((error) => {
        const toast = this.toastCtrl.create({
      message: 'Location not working . Try to open again',
      duration: 3000
    });
    toast.present();
    console.log('Error getting location', error);
      });

        console.log('Request successful')},
      error => {
          const toast = this.toastCtrl.create({
      message: 'Error requesting location permissions',
      duration: 3000
    });
    toast.present();
   
        console.log('Error requesting location permissions', error)}
    );
  }
  else{
    const toast = this.toastCtrl.create({
      message: 'Cannot Find You',
      duration: 3000
    });
    toast.present();
     
  }
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
                    title : 'Yes!!',
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
                    title : 'OOPPPS!!',
                    subTitle : 'Wrong Answer',
                    buttons : ['Try again'],
                     
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
    let options: MyLocationOptions = {
  enableHighAccuracy: true
};
 LocationService.getMyLocation(options)
     .then((pos:MyLocation)=>{

       console.log(pos);
       this.rest.submitLocation(this.level.level_no ,pos.latLng.lat,pos.latLng.lng)
   .subscribe((data:any)=>{
       if(data.success == true) {
                      let alert = this.alertCtrl.create({
                    title : 'Yasss',
                    subTitle : 'Correct Location',
                    buttons : [{text : 'Next Level',
                      handler: temp=>{
                       let navTransition= alert.dismiss();
                        navTransition.then(() => {
            window.location.reload();
        });




                      
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
      .catch((error) => {

    console.log('Error getting location', error);
      });
       

    }    
   
   
}
