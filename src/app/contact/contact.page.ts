import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import { ToastController, AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  ionicForm: FormGroup;
  isSubmitted = false;
  url = "https://www.baramous.com/";

  constructor(public formBuilder: FormBuilder,public toastController: ToastController, 
    public alertController: AlertController,public http: HttpClient,public loading: LoadingService,
    private router :Router,public storage: Storage) { }

    ngOnInit() {
      this.ionicForm = this.formBuilder.group({
        massage: ['', [Validators.required]],
      })
    }

    async welcomeToast() {
      const toast = await this.toastController.create({
        message: ' تم الأرسال بنجاح',
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
  
    submitForm() {
      this.isSubmitted = true;
      if (!this.ionicForm.valid) {
        return false;
      } else {

        return new Promise((resolve, reject) => { 
          this.storage.get('token').then((value) => {
            const headers = new HttpHeaders({'Authorization':'Bearer '+value});  
          this.loading.present();
          this.http.post(this.url+'api/note',this.ionicForm.value,{headers})
          .subscribe(res=>{
           let data = res['data'];
           this.loading.dismiss();
           this.welcomeToast();
           this.router.navigateByUrl('/tab1');
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

}
