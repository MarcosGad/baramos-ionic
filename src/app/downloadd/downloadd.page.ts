import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { ToastController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-downloadd',
  templateUrl: './downloadd.page.html',
  styleUrls: ['./downloadd.page.scss'],
})
export class DownloaddPage implements OnInit {

  url = "https://www.baramous.com/";
  data;
  
  // Preserve original property order
  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }

  constructor(public http: HttpClient,public loading: LoadingService,
   public toastController: ToastController, private iab: InAppBrowser) { 
     this.getData();
   }

  ngOnInit() {
  }

  getData(){
    return new Promise((resolve, reject) => { 
       this.loading.present();
       this.http.get(this.url+'api/downloood')
       .subscribe(res=>{
        let data = res['data'];
        this.data = data
        this.loading.dismiss();
        LoadingService.show = 'good'
        resolve(data);
      },(err)=>{
         reject(err);
         this.loading.dismiss();
         LoadingService.show = 'bad'
      });

     }) 
     
  }

  openLink(link){
     this.iab.create('https://www.baramous.com/' + link,'_system');
  }

  get show()
  {
    return LoadingService.show; 
  }

}
