import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { Storage } from '@ionic/storage';
import { AlertController, ToastController } from '@ionic/angular';
import { FormControl, FormGroup, Validators,ValidatorFn,AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  url = "https://www.baramous.com/";
  user: FormGroup;
  userData;
  userId;
  cash:boolean;

  day = [];
  month = [];
  year = [];

  constructor(public http: HttpClient,public loading: LoadingService,
    public storage: Storage, public alertController: AlertController,
    public toastController: ToastController) {
      this.userData = {};
     }

    ionViewWillEnter(){
      this.cash = true;
      this.getData();
    }
 
  getData(){
    return new Promise((resolve, reject) => { 
      this.storage.get('token').then((value) => {
        const headers = new HttpHeaders({'Authorization':'Bearer '+value});
       this.loading.present();
       this.http.get(this.url+'api/user',{headers})
       .subscribe(res=>{
        let data = res['data'];
        this.userData = data
        this.userId = data.id
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

  ngOnInit() {

    for (let i = 1 ; i <= 31; i++) {
      this.day.push(i);
    }

    for (let i = 1 ; i <= 12; i++) {
      this.month.push(i);
    }

    let y = (new Date()).getFullYear();    
    for (let i = y ; i >= 1950; i--) {
      this.year.push(i);
    }

    this.user = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    birth_day: new FormControl('', [Validators.required]),
    birth_month: new FormControl('', [Validators.required]),
    birth_year: new FormControl('', [Validators.required]),
    phone_number: new FormControl('', [Validators.required,Validators.pattern('^[0-9]+$'),Validators.maxLength(11)]),
    city: new FormControl('', [Validators.required]),
    church: new FormControl('', [Validators.required]),
    father: new FormControl('', [Validators.required]),
    work: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.minLength(6)])   
    }); 
    }
    
    equalto(field_name): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
    let input = control.value;
    let isValid=control.root.value[field_name]==input
    if(!isValid) 
    return { 'equalTo': {isValid} }
    else 
    return null;
    };
    }

    async welcomeToast() {
      const toast = await this.toastController.create({
        message: 'تم التعديل بنجاح',
        duration: 2000
      });
      toast.present();
    }

  edit(){
    return new Promise((resolve, reject) => { 
      this.storage.get('token').then((value) => {
      const headers = new HttpHeaders({'Authorization':'Bearer '+value});
      this.loading.present();
       this.http.put(this.url+'api/user/' +this.userId,{
        name : this.userData.name,
        email : this.userData.email,
        birth_day : this.userData.birth_day,
        birth_month : this.userData.birth_month,
        birth_year : this.userData.birth_year,
        phone_number : this.userData.phone_number,
        city : this.userData.city,
        church : this.userData.church,
        father : this.userData.father,
        work : this.userData.work,
        password : this.userData.password,
       },{headers})
       .subscribe(res=>{
        let data = res['data'];
        this.welcomeToast();
        this.loading.dismiss();
        resolve(data);
      },(err)=>{
         reject(err);
         this.loading.dismiss();
      }); 
     })
    })
  }

  doRefresh(event) {
    this.getData();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

get show()
{
  return LoadingService.show; 
}

}
