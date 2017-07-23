import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {YouTubeApi3} from "../../shared/youtubeapi3.service";
import { SocialSharing } from '@ionic-native/social-sharing';
import { Storage } from '@ionic/storage';
import {VideoPage} from "../pages";

/**
 * Generated class for the SingleplaylistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-singleplaylist',
  templateUrl: 'singleplaylist.html',
})
export class SingleplaylistPage {
  playListId: string;
  playListTitle: string;
  playListVideos: any;
  pageToken : string;
   errorMsg :any;  
   fav : any;
  favList: string;
  constructor(public navCtrl: NavController, public params: NavParams, public ytapi3 : YouTubeApi3,
  private socialSharing: SocialSharing, public storage: Storage) {
    this.playListId = params.get('id');
    this.playListTitle = params.get('name');

    this.ytapi3
      .getSinglePlayList(this.playListId)
      .subscribe((data : any) => {
        this.playListVideos = data.items;        
        this.pageToken = data.nextPageToken;
         console.log(this.playListVideos)
      })
   
  }

 loadMorePlayListVideos() { 
   this
      .ytapi3
      .loadMoreSinglePlayList(this.playListId,this.pageToken)
       .subscribe((r : any) => {
           r
          .items
          .map(o => this.playListVideos.push(o));
        this.pageToken = r.nextPageToken;
        
        console.log( this.playListVideos)
      }         
        
      ,      
       _loadError => this.errorMsg = _loadError);
  }

  shareInfo(title, videoId)
  {
    console.log(title,videoId);
    this.socialSharing.share(title, title, "", "https://www.youtube.com/watch?v="+videoId).
    then(() => {
    alert("Sharing success");
    // Success!
    }).catch(() => {
    // Error!
    alert("Share failed");
    });
    }




  favouriteSet2(_video){
      this.storage.get('myFav').then((data) => {
      this.fav = _video
      console.log(this.fav)
      if(data != null)
        { 
          //Create a new list everytime you add a fav
          let favList = [];
          for (let x of data) {          
            favList.push(x["id"].videoId);                   
          }
           //Verify the new videoID already part of existing list
            if (favList.some(x => x === this.fav.id.videoId)){
              alert ("This Video is Already part of your Favorite List")
            }
            else {
            data.push((this.fav));
            this.storage.set('myFav', data);
            }
          
        }
      else
        {
          let array = [];
          array.push((this.fav));
          this.storage.set('myFav', array);
        
        }    
    });

}

 viewVideo(_video) {
    this
      .navCtrl
      .push(VideoPage, _video)
    console.log(_video)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingleplaylistPage');
  }

}
