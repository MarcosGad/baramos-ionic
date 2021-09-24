import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { LoadingService } from '../services/loading.service';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  ionicForm: FormGroup;
  isSubmitted = false;
  cash:boolean;
  url = "https://www.baramous.com/";
  appFromOne;
  appToOne;
  userData;
  per = [];
 
  fromToDay; ToDay;
  one; two; three; four; five; six; seven; eight; nine; ten;
  eleven; twelve; thirteen; fourteen; fifteen; sixteen; seventeen; eighteen;
  nineteen; twenty; twentyOne;
  
  
  constructor(public formBuilder: FormBuilder,public http: HttpClient,
    public storage: Storage,public toastController: ToastController, 
    public alertController: AlertController,public loading: LoadingService,
    private router :Router) {

     this.userData = {};
     this.getDayOff();

     this.fromToDay = "2019-1-1";

     var dateObj = new Date(); 
     dateObj.setDate(dateObj.getDate() - 1);  
     var
     month = '' + (dateObj.getMonth() + 1),
     day = '' + dateObj.getDate(),
     year = dateObj.getFullYear();
     if (month.length < 2) month = '0' + month;
     if (day.length < 2) day = '0' + day;
     this.ToDay = [year, month, day].join('-');
      
  }

  ionViewWillEnter(){
    this.cash = true;
    this.getuserInfo();
    this.getDayOff();
  }

  ionViewDidEnter() {}
  
  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      date_of_hagz: ['', [Validators.required]],
      per_number: ['1', [Validators.required]],
      note: ['',],
    })
    for (let i = 1 ; i <= 3; i++) {
      this.per.push(i);
    }  
  }
  

  doRefresh(event) {
    this.getDayOff();
    this.getuserInfo();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  async welcomeToast() {
    const toast = await this.toastController.create({
      message: ' تم الحجز بنجاح ',
      duration: 2000
    });
    toast.present();
  }

  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'خطأ',
      message: 'يوجد خطأ بأعادة المحاولة',
      buttons: ['اغلاق']
    });

    await alert.present();
  }
  
  getuserInfo(){
    return new Promise((resolve, reject) => { 
      this.storage.get('token').then((value) => {
        const headers = new HttpHeaders({'Authorization':'Bearer '+value});
       this.loading.present();
       this.http.get(this.url+'api/user',{headers})
       .subscribe(res=>{
        let data = res['data'];
        this.userData = data
        this.loading.dismiss();
        LoadingService.show = 'good'
        this.cash = false
        resolve(data);
      },(err)=>{
         reject(err);
         this.loading.dismiss();
         LoadingService.show = 'bad'
         this.cash = false
      }); 
     })
    })
  }

  getDayOff(){
    return new Promise((resolve, reject) => { 
      this.http.get(this.url+'api/dayof')
      .subscribe(res=>{
       let data = res['data']['0'];

       this.one = data.day_of_from_one
       this.two = data.day_of_to_one
       this.three = data.day_of_from_two
       this.four = data.day_of_to_two
       this.five = data.day_of_from_three
       this.six = data.day_of_to_three
       this.seven = data.day_of_from_four
       this.eight = data.day_of_to_four
       this.nine = data.day_of_from_five
       this.ten = data.day_of_to_five
       this.eleven = data.day_of_from_six
       this.twelve = data.day_of_to_six
       this.thirteen = data.day_of_from_seven
       this.fourteen = data.day_of_to_seven

       this.fifteen = data.day_of_one
       this.sixteen = data.day_of_two
       this.seventeen = data.day_of_three
       this.eighteen = data.day_of_four
       this.nineteen = data.day_of_five
       this.twenty = data.day_of_six
       this.twentyOne = data.day_of_seven
      
       resolve(data);
     },(err)=>{
        reject(err);
     }); 
    })
  }


  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      return false;
    } else {
      return new Promise((resolve, reject) => { 
        this.storage.get('token').then((value) => {

          const headers = new HttpHeaders({'Authorization':'Bearer '+value});

        this.loading.present();
        this.http.post(this.url+'api/hagz',this.ionicForm.value,{headers})
        .subscribe(res=>{
         let data = res['data'];
         this.loading.dismiss();
         this.welcomeToast();
         this.router.navigateByUrl('/viewhagz');
         resolve(data);
       },(err)=>{
          reject(err);
          this.loading.dismiss();
          this.errorAlert();
       }); 
      }) 
      })
    }
  }

get show()
{
  return LoadingService.show; 
}

}