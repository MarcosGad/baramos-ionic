import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-hsystem',
  templateUrl: './hsystem.page.html',
  styleUrls: ['./hsystem.page.scss'],
})
export class HsystemPage implements OnInit {

  url = "https://www.baramous.com/";
  hsystem;
  

  constructor(public http: HttpClient,public loading: LoadingService) { 
    this.getData();
  }

  ngOnInit() {
  }

  getData(){
    return new Promise((resolve, reject) => { 
       this.loading.present();
       this.http.get(this.url+'api/hsystem')
       .subscribe(res=>{
        let data = res['data'];
        this.hsystem = data
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
