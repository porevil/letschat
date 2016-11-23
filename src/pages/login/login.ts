import { Component } from '@angular/core';
import { Platform, NavController, MenuController, AlertController, LoadingController } from 'ionic-angular';
import { Facebook } from 'ionic-native';
import { HomePage } from '../home/home';
import { Data } from '../../providers/data';

/*
  Generated class for the Login page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loading: any;

  constructor(public nav: NavController, public platform: Platform,
    public menu: MenuController, public dataService: Data, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
    //this.menu.enable(false);
  }

  ionViewDidLoad() {
    console.log('Hello Login Page');
  }

  login(): void {
    this.loading.present();
  //this.debug('facebook login')
    Facebook.login(['public_profile']).then((response) => {
      //this.debug('facebook getprofile start ')
      this.getProfile(); 
      //this.debug('facebook getprofile end')
    }, (err) => {
      //this.debug('facebook getprofile error')
      let alert = this.alertCtrl.create({
        title: 'Oops!',
        subTitle: 'Something went wrong, please try again later.',
        buttons: ['Ok']
      });
      //this.loading.dismiss();
      alert.present();
    });

  }

  getProfile(): void {
    //this.debug('facebook api in progress')
    Facebook.api('/me?fields=id,name,picture', ['public_profile']).then(
      (response) => {
        //this.debug('facebook api response')
        //console.log(response);
        this.dataService.fbid = response.id;
        this.dataService.username = response.name;
        this.dataService.picture = response.picture.data.url;
        //this.menu.enable(true);
        this.loading.dismiss();
        this.debug('Hi '+this.dataService.username+' Welcome to LETS CHAT enjoy! ')
        this.nav.setRoot(HomePage);
      }, (err) => {
        console.log(err);
        let alert = this.alertCtrl.create({
          title: 'Oops!',
          subTitle: 'Something went wrong, please try again later.',
          buttons: ['Ok']
        });
        //this.loading.dismiss();
        alert.present();
      }
    );

  }

  debug(value:string) {

    let alert = this.alertCtrl.create({
      title: 'Oh Yeah!',
      subTitle: 'value ['+value+']',
      buttons: ['Ok']
    });
    alert.present();

  }

}