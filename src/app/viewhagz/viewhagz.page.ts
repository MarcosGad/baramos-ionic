import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-viewhagz',
  templateUrl: './viewhagz.page.html',
  styleUrls: ['./viewhagz.page.scss'],
})
export class ViewhagzPage implements OnInit {

  url = "https://www.baramous.com/";
  hagz;
  showw:boolean = false;
  cash:boolean;

  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }

  constructor(public http: HttpClient,public loading: LoadingService,
    public storage: Storage, public alertController: AlertController) { 
    }

  ionViewWillEnter(){
    this.cash = true;
    this.getData();
  }

  ngOnInit() {
  }

  getData(){
    return new Promise((resolve, reject) => { 
      this.storage.get('token').then((value) => {
        const headers = new HttpHeaders({'Authorization':'Bearer '+value});
       this.loading.present();
       this.http.get(this.url+'api/hagz',{headers})
       .subscribe(res=>{
        let data = res['data'];
        this.hagz = data
        if(this.hagz.length == 0){
          this.showw = true; 
        }else{
          this.showw = false;
        }
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

  async delete(id){
   const alert = await this.alertController.create({
      header: 'بيت الخلوة',
      message: 'هل تريد الحذف ؟',
      buttons: [
        {
          text: 'لا',
          role: 'cancel',
        }, {
          text: 'نعم',
          handler: () => {
            return new Promise((resolve, reject) => { 
              this.storage.get('token').then((value) => {
                const headers = new HttpHeaders({'Authorization':'Bearer '+value});
               this.loading.present();
               this.http.delete(this.url+'api/hagz/' +id,{headers})
               .subscribe(res=>{
                let data = res;
                this.loading.dismiss();
                this.getData();
                resolve(data);
              },(err)=>{
                 reject(err);
                 this.loading.dismiss();
              }); 
             })
            })
          }
        }
      ]
    });
     await alert.present();

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
