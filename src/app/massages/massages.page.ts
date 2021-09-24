import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-massages',
  templateUrl: './massages.page.html',
  styleUrls: ['./massages.page.scss'],
})
export class MassagesPage implements OnInit {

  url = "https://www.baramous.com/";
  massages;
  showw:boolean = false;
  cash:boolean = true;

    // Preserve original property order
    originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
      return 0;
    }
    // Order by ascending property value
    valueAscOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
      return a.value.localeCompare(b.value);
    }
    // Order by descending property key
    keyDescOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
      return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
    }

  constructor(public http: HttpClient,public loading: LoadingService,
    public storage: Storage, public alertController: AlertController) {
    }

  ngOnInit() { }
 
  ionViewWillEnter(){
    this.cash = true;
    this.getData();
  }

  getData(){
    return new Promise((resolve, reject) => { 
      this.storage.get('token').then((value) => {
        const headers = new HttpHeaders({'Authorization':'Bearer '+value});
       this.loading.present();
       this.http.get(this.url+'api/massage',{headers})
       .subscribe(res=>{
        let data = res['data'];
        this.massages = data
        if(this.massages.length == 0){
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
                this.http.delete(this.url+'api/massage/' +id,{headers})
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
