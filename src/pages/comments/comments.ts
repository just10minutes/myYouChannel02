import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {YouTubeApi3} from "../../shared/youtubeapi3.service";


/**
 * Generated class for the CommentsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html', 
  
})
export class CommentsPage {
  videoId : string;
  videoComments: Array < Object >;
  pageToken :string;
  errorMsg :any;
  constructor(public navCtrl: NavController, public params: NavParams,public ytapi3 : YouTubeApi3) {
    this.videoId = params.data;
    this.ytapi3
      .getLatestComments(this.videoId)
      .subscribe((data : any) => {
        this.videoComments = data.items;        
        this.pageToken = data.nextPageToken;
        console.log(this.videoComments)
                
          
       }) 

  }

  loadMoreComments() {    
    this
      .ytapi3
      .getLatestCommentsPerPage(this.videoId,this.pageToken)
      .subscribe((r : any) => {
           r
          .items
          .map(o => this.videoComments.push(o));
        this.pageToken = r.nextPageToken;
        console.log( this.videoComments)
      }         
        
      ,      
       _loadError => this.errorMsg = _loadError);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
  }

  
}
