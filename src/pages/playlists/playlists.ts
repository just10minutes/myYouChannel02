import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {YouTubeApi3} from "../../shared/youtubeapi3.service";
import {SingleplaylistPage} from "../pages";

/**
 * Generated class for the PlaylistsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-playlists',
  templateUrl: 'playlists.html',
})
export class PlaylistsPage {
  playLists : Array < Object >;
  pageToken :string;
  errorMsg :any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ytapi3 : YouTubeApi3,) {
    this.ytapi3
      .getDefaultPlaylist()
      .subscribe((data : any) => {
        this.playLists = data.items; 
        this.pageToken = data.nextPageToken; 
        console.log(this.playLists)
       }) 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaylistsPage');
  }

  loadMorePlayList() {    
    this
      .ytapi3
      .loadMorePlayList(this.pageToken)
      .subscribe((r : any) => {
           r
          .items
          .map(o => this.playLists.push(o));
        this.pageToken = r.nextPageToken;
        console.log( this.playLists)
      }         
        
      ,      
       _loadError => this.errorMsg = _loadError);
  }

  viewPlayList(playListId,playListTitle){
    this.navCtrl.push(SingleplaylistPage,{
      id: playListId,
      name: playListTitle
    }) 

  }

}
