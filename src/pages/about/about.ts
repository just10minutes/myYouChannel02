import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {YouTubeApi3} from "../../shared/youtubeapi3.service";

/**
 * Generated class for the AboutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  channelInfo : object;
  channelInfoNew : string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public ytapi3 : YouTubeApi3) {
      this.ytapi3
      .getChannelInfo()
      .subscribe((data : any) => {
        this.channelInfo = data.items[0];
        console.log(this.channelInfo)         
          
       }) 
      
  }


  

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');   
    

  }

}
