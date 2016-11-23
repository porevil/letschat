import { Component, ViewChild } from "@angular/core";
import { Facebook } from 'ionic-native';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { Data } from '../providers/data';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  //rootPage = HomePage;
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  homePage: any = HomePage;
  aboutPage: any = AboutPage;
  // https://6c9ec0f0-311e-4779-8f3c-ed0522b3dcfc-bluemix.cloudant.com/letschatdb/_all_docs?limit=100
  constructor(public platform: Platform, public dataService: Data, public menu: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      platform.ready().then(() => {
      });
    });
  }

  openPage(page): void {
    this.menu.close();
    this.nav.setRoot(page);
  }

  logout(): void {
    this.menu.close();
    this.menu.enable(false);
    this.nav.setRoot(LoginPage);
    this.dataService.fbid = null;
    this.dataService.username = null;
    this.dataService.picture = null;
    Facebook.logout();
  }

}
