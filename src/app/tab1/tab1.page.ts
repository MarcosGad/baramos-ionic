import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {

  url = "https://www.baramous.com/";

  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true,
    loop: true,
    speed:400
  };

  postHome;
  aya;
  alarm;

  constructor(public http: HttpClient,public loading: LoadingService,
    public toastController: ToastController) {
    this.getData();
  }

 getData(){
  return new Promise((resolve, reject) => { 
     this.http.get(this.url+'api/homepage')
     .subscribe(res=>{
      let data = res['data'];
      this.postHome = data
      LoadingService.show = 'good'
      resolve(data);
    },(err)=>{
       reject(err);
       LoadingService.show = 'bad'
    }); 

    this.http.get(this.url+'api/aya')
    .subscribe(res=>{
     let data = res['data'];
     this.aya = data[0].name
     resolve(data);
   },(err)=>{
      reject(err);
      LoadingService.show = 'bad'
   }); 

   this.http.get(this.url+'api/alarm')
     .subscribe(res=>{
      let data = res['data'];
      this.alarm = data[0].name
      resolve(data);
    },(err)=>{
       reject(err);
       LoadingService.show = 'bad'
    }); 
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