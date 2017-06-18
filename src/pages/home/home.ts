import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {YouTubeApi} from "../../shared/youtubeapi.service";
import {YouTubeApi3} from "../../shared/youtubeapi3.service";
import {VideoPage, FavouritePage} from "../pages";
import { SocialSharing } from '@ionic-native/social-sharing';
import { Storage } from '@ionic/storage';


@Component({selector: 'page-home', templateUrl: 'home.html'})
export class HomePage {
  videos : Array < Object >;
  videoDetails :any;
  pageToken :string;
  channelInfo : object;
  errorMsg :any;
  isFavExists:boolean;
  fav : any;
  
  constructor(public navCtrl : NavController, public ytapi : YouTubeApi, public ytapi3 : YouTubeApi3, private socialSharing: SocialSharing, public storage: Storage) {   

    this
      .ytapi3
      .getChannelInfo()
      .subscribe(_channel =>  this.channelInfo = _channel.items[0],
                 _channelError => this.errorMsg = _channelError );
      
      
      

    this
      .ytapi3
      .getDefaultChannelVideos()
      .subscribe((data : any) => { 
         //console.log(data.items);
        this.videos = data.items;
        this.pageToken = data.nextPageToken;
        data.items.map((entry) => {
          this.ytapi3.getSingleVideo(entry.id.videoId).subscribe(videoData => {
            //this.videoDetails = videoData.items;
            //console.log(videoData.items);
          return entry.extra = videoData.items;
          
          
          })
          
        })
       console.log(data.items);
      },
      _listError => this.errorMsg = _listError );
     

  }

  viewVideo(_video) {
    this
      .navCtrl
      .push(VideoPage, _video)
  }

  loadMore() {    
    this
      .ytapi3
      .getVideosPerPage(this.pageToken)
      .subscribe((r : any) => {
        this.pageToken = r.nextPageToken;
        r.items
          .map(o => {
          this.ytapi3.getSingleVideo(o.id.videoId).subscribe(videoData => {            
            this.videos.push(o)
            return o.extra = videoData.items;

          })
          
        
      })},
      
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

   favouritePage(){
    this.navCtrl.push(FavouritePage)
  }


  favouriteSet2(_video){
      this.storage.get('myFav').then((data) => {
      this.fav = _video
      if(data != null)
      {         
        data.push((this.fav));
        this.storage.set('myFav', data);
        
      }
      else
      {
        let array = [];
        array.push((this.fav));
        this.storage.set('myFav', array);
       
      }    
    });
}
/*
  favouriteSet(videoId,title){
    this.storage.get(videoId).then((dataExist) => {
      if (dataExist != null){
      alert("This video already stored as favorite")
      console.log("This video already stored as favorite")
    } else{
      console.log("This video getting stored as favorite")
    this.storage.get('myFav').then((data) => {
      this.fav = { "videoId" :videoId , "title" : title }
      if(data != null)
      {        
        data.push((this.fav));
        this.storage.set('myFav', data);
        this.storage.set(videoId, title);
      }
      else
      {
        let array = [];
        array.push((this.fav));
        this.storage.set('myFav', array);
        this.storage.set(videoId, title);
      }    
    });
  }} )}


  favouriteSet(videoId,title){
    console.log('data added '+videoId); 
    this.storage.get('myFav').then((data) => {
      var fav = { "videoId" :videoId , "title" : title }
      if(data != null)
      {
        data.push(JSON.stringify(fav));
        this.storage.set('myFav', data);
      }
      else
      {
        let array = [];
        array.push(JSON.stringify(fav));
        this.storage.set('myFav', array);
      }
    console.log(data)
    console.log(data[10]);
    });
  };
 

favExists(videoId){
  this.storage.get(videoId).then((value) => {    
    value ? this.isFavExists = true : this.isFavExists = false
  }).catch(() => this.isFavExists = false);
}
*/ 
 
   

}


