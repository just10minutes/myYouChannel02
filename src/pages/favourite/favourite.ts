import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {VideoPage} from "../pages";

/**
 * Generated class for the FavouritePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-favourite',
  templateUrl: 'favourite.html',
})
export class FavouritePage {
  favs: any;
  searchTerm: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavouritePage'); 
    this.loadFavs()
      
  }

loadFavs(){
     this.storage.get('myFav').then((data) => {   
       this.favs = data     
      console.log(typeof(data));
     })
}


  viewFavVideo(_video) {
    this
      .navCtrl
      .push(VideoPage, _video)
  }
}
