import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sendresetemail',
  templateUrl: './sendresetemail.page.html',
  styleUrls: ['./sendresetemail.page.scss'],
})
export class SendresetemailPage implements OnInit {

  ionicForm: FormGroup;
  isSubmitted = false;
  url = "https://www.baramous.com/";

  constructor(public formBuilder: FormBuilder,public toastController: ToastController, 
    public alertController: AlertController,public http: HttpClient,public loading: LoadingService,
    private router :Router) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    })
  }

  async welcomeToast() {
    const toast = await this.toastController.create({
      message: 'تم ارسال البريد الألكترونى لأعادة تعين كلمة السر',
      duration: 5000
    });
    toast.present();
  }

  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'خطأ',
      message: 'البريد الألكترونى غير موجود',
      buttons: ['اغلاق']
    });

    await alert.present();
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      return false;
    } else {
        this.loading.present();
        this.http.post(this.url+'api/password/create',this.ionicForm.value)
        .subscribe(res=>{
         let data = res['message'];
         this.loading.dismiss();
         this.welcomeToast();
         this.router.navigateByUrl('/tab1');
       },(err)=>{
          this.loading.dismiss();
       }); 
    }
  }

}
