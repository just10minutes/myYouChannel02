import {Component} from "@angular/core";
import {NavParams, Events, NavController} from "ionic-angular";
import { SocialSharing } from '@ionic-native/social-sharing';
import { Storage } from '@ionic/storage';
import {CommentsPage} from "../pages";

declare var YT;

@Component({selector: 'page-video', templateUrl: './video.page.html'})

export class VideoPage {
  video : object;
  private player;
  private ytEvent;
  playerVars : object;
  fav : any;
  favList: string;
  descriptionClicked: boolean = false;
  constructor(public navCtrl : NavController, public params : NavParams, public events : Events,private socialSharing: SocialSharing, public storage: Storage) {
    this.video = params.data;
    /**
     * view all the params
     * https://developers.google.com/youtube/player_parameters
     */
    this.playerVars = {
      'loop': 1,
      'controls': 2,
      'showinfo': 0,
      'rel': 0,
      'modestbranding': 1
    };

    //To avoid the play store rejection
    this
      .events
      .subscribe('App:Paused', () => {
        this.pauseVideo();
      });
  }

  onStateChange(event) {
    this.ytEvent = event.data;
  }
  savePlayer(player) {
    if (player) {
      this.player = player;
      this.playVideo();
    }

  }

  playVideo() {
    this
      .player
      .playVideo();
  }
  pauseVideo() {
    this
      .player
      .pauseVideo();
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

 commentsPage(videoId){
   if (this.player) {
      this.pauseVideo()
   }
      this.navCtrl.push(CommentsPage, videoId)
    }

 onDescriptionClick() {
    this.descriptionClicked = !this.descriptionClicked;
  }
}
