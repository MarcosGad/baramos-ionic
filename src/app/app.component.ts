import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingService } from './services/loading.service';
import { ToastController, AlertController } from '@ionic/angular';

import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  navigate : any;
  public token: any; 

  async massToast() {
    const toast = await this.toastController.create({
      message: 'انت غير متصل بالأنترنت',
      duration: 5000,
      cssClass: 'customToast',
    });
    toast.present();
  }

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router : Router,
    public storage: Storage,
    private menu: MenuController,
    public alertController: AlertController,
    public toastController: ToastController,
    public network: Network
  ) {
    this.sideMenu();
    this.initializeApp();

    this.storage.ready().then( () => {
      this.storage.get('token').then( (value) => {
        if(value != null){
          LoadingService.loggedIn = true;
        }
        else{
          LoadingService.loggedIn = false;
        }
      })
    })

    this.network.onDisconnect().subscribe(()=>{
      this.massToast();
    });

    this.network.onConnect().subscribe(()=>{
      LoadingService.show = 'good'
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.router.navigateByUrl('/tab1');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  closeM(){
    this.menu.close();
  }

  async welcomeToast() {
    const toast = await this.toastController.create({
      message: 'برجاء تسجيل الدخول للحجز',
      duration: 2000
      });
    toast.present();
  }

    
  sideMenu()
  {
    this.navigate =
    [
      {
        title : "نظام بيت الخلوة",
        url   : "/hsystem",
        icon  : "information-circle"
      },
      {
        title : "جدول بيت الخلوة",
        url   : "/tablehgz",
        icon  : "paper"
      },
      {
        title : "قراءات روحية",
        url   : "/post",
        icon  : "document"
      },
      {
        title : "التحميلات",
        url   : "/downloadd",
        icon  : "download"
      },
    ]
  }

 async logout(){
    const alert = await this.alertController.create({
        header: 'بيت الخلوة',
        message: 'هل تريد تسجيل الخروج ؟',
        buttons: [
          {
            text: 'لا',
            role: 'cancel',
            handler: () => {
              this.closeM();
            }
  
          }, {
            text: 'نعم',
            handler: () => {
              this.storage.remove('token').then( (value) => {
                LoadingService.loggedIn = false;
                this.closeM();                
                this.router.navigateByUrl('/tab1');
              })
            }
          }
        ]
      });
  await alert.present();
}


openTabTwo(){
  this.storage.get("token").then( (data) => {
    if(data != null){
      this.router.navigateByUrl('/tab2');
    } else {
      this.welcomeToast();
      this.router.navigateByUrl('/tab3');
    }
  })

}

  get loggedIn()
  {
    return LoadingService.loggedIn; 
  }

}

 