import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from "@angular/forms";
import { ToastController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  ionicForm: FormGroup;
  isSubmitted = false;
  url = "https://www.baramous.com/";
  public token: any; 

  day = [];
  month = [];
  year = [];

  constructor(public formBuilder: FormBuilder,public toastController: ToastController, 
    public alertController: AlertController,public http: HttpClient,public loading: LoadingService,
    private router :Router, public storage: Storage
    ) { }

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

    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      birth_day: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      birth_month: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      birth_year: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      city: ['', [Validators.required]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(11)]],
      church: ['', [Validators.required]],
      father: ['', [Validators.required]],
      work: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      c_password: ['', [Validators.required, Validators.minLength(6),this.equalto('password')]],

    })
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

  get errorControl() {
    return this.ionicForm.controls;
  }

  async welcomeToast() {
    const toast = await this.toastController.create({
      message: 'تم التسجيل اهلا بيك فى بيت الخلوة',
      duration: 2000
    });
    toast.present();
  }

  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'خطأ',
      message: 'من فضلك تأكد من البريد الألكترونى وفم بأعادة المحاولة',
      buttons: ['اغلاق']
    });

    await alert.present();
  }
  
  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      return false;
    } else {
      console.log(this.ionicForm.value)
      
      return new Promise((resolve, reject) => { 
        this.loading.present();
        this.http.post(this.url+'api/register',this.ionicForm.value)
        .subscribe(res=>{
         let data = res['data'];
         this.token = data['token']
         console.log(this.token);
         this.storage.set('token',this.token);
         this.loading.dismiss();
         LoadingService.loggedIn = true;
         this.welcomeToast();
         this.router.navigateByUrl('/tab1');
         resolve(data);
       },(err)=>{
          reject(err);
          console.log(err);
          this.loading.dismiss();
          this.errorAlert();
       }); 
      })

    }
  }

}
