import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';

import { HTTP } from '@ionic-native/http/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { Location } from "@angular/common";
import { FCM } from '@ionic-native/fcm/ngx';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  ionicForm: FormGroup;
  isSubmitted = false;
  url = "https://www.baramous.com/";
  public token: any; 
  public tokenNotification: any; 
  notification;
  notificationT;
  userId;

  constructor(public formBuilder: FormBuilder,public http: HttpClient,
              public loading: LoadingService, public httpCordova: HTTP,
              public storage: Storage,private router :Router,
              public toastController: ToastController, public alertController: AlertController,
              private location: Location,private fcm: FCM) {}

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      grant_type:'password',
      client_id:2,
      client_secret:'Qm3x6rreyTTrBSptyWGDc4NrXYEO6NYsnevY5N1U'
    })
  }

  get errorControl() {
    return this.ionicForm.controls;
  }
  
  async welcomeToast() {
    const toast = await this.toastController.create({
      message: 'تم تسجيل الدخول اهلا بيك فى بيت الخلوة',
      duration: 2000
    });
    toast.present();
  }

  async nof() {
    const toast = await this.toastController.create({
      header: this.notificationT,
      message: this.notification,
      position: 'top',
      duration: 8000
    });
    toast.present();
  }

  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'خطأ',
      message: 'من فضلك تأكد من البريد الألكترونى وكلمة السر',
      buttons: ['اغلاق']
    });

    await alert.present();
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      return false;
    } else {
      
      return new Promise((resolve, reject) => {
        this.loading.present();
        this.httpCordova.setHeader('*', String("Content-Type"), String("application/json"));
        this.httpCordova.setHeader('*', String("Accept"), String("application/json"));
        this.httpCordova.setHeader('*', String("Access-Control-Allow-Origin"), String("*"));
        this.httpCordova.setHeader('*', String("Access-Control-Allow-Methods"), String("POST, GET, OPTIONS, PUT"));
        this.httpCordova.setDataSerializer('json');
  
        return this.httpCordova.post(this.url+'oauth/token',this.ionicForm.value,{})
        .then(res=>{
          let data = res;
          let resData = data.data
          let token = JSON.parse(resData)
          this.token = token['access_token']
          this.storage.set('token',this.token);
      
          this.fcm.getToken().then(token => {
              this.tokenNotification = token
              //alert('getToken  ' + this.tokenNotification)
          });


          this.storage.get('token').then((value) => {
           const headers = new HttpHeaders({'Authorization':'Bearer '+value});
           this.http.get(this.url+'api/userN',{headers})
           .subscribe(res=>{
            let data = res['data'];
            this.userId = data.id  
            //alert(this.userId)          
            resolve(data);
          },(err)=>{
             reject(err);
          }); 
         })


         this.storage.get('token').then((value) => {
          const headers = new HttpHeaders({'Authorization':'Bearer '+value});
           this.http.put(this.url+'api/userN/' +this.userId,{
            token_notification : this.tokenNotification,
           },{headers})
           .subscribe(res=>{
            let data = res['data'];
            //alert(JSON.stringify(data))
          },(err)=>{
             reject(err);
          }); 
         })
        
          this.fcm.onNotification().subscribe(data => {
            if (data.wasTapped) {
            } else {
              let notificationT = JSON.stringify(data.title)
              let notification = JSON.stringify(data.body)
              this.notificationT = notificationT
              this.notification = notification
              this.nof();
            }
          });

          this.loading.dismiss();
          LoadingService.loggedIn = true;
          this.welcomeToast();
          this.location.back();
        },(err)=>{
           reject(err);
           this.loading.dismiss();
           this.errorAlert();
        });
        
      });

    }
  }


  async login(){
    return new Promise((resolve, reject) => { 
      this.loading.present();
      this.http.post(this.url+'oauth/token',this.ionicForm.value)
      .subscribe(res=>{
       let data = res['access_token'];
       this.token = data
       this.storage.set('token',this.token);
       this.loading.dismiss();
       LoadingService.loggedIn = true;
       this.welcomeToast();
       this.location.back();
       resolve(data);
     },(err)=>{
        reject(err);
        this.loading.dismiss();
        this.errorAlert();
     }); 
    })
  }
  

}
