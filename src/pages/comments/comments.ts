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
  videoComments: any;
  pageToken :string;
  comment_description : any;
  errorMsg :any;  
  showReplies: boolean = false;
  addNewComment: boolean = false;
  addNewReply: boolean = false;
  showHideReplies : boolean = false;
  constructor(public navCtrl: NavController, public params: NavParams,public ytapi3 : YouTubeApi3) {
    this.videoId = params.data; 

        
    this.ytapi3
      .getLatestComments(this.videoId)
      .subscribe((data : any) => {
        this.videoComments = data.items;        
        this.pageToken = data.nextPageToken;
        this.videoComments.forEach(comment => {                                
                                if(!!comment.replies) {
                                comment.replies.comments = comment.replies.comments.sort((a, b) => +new Date(a.snippet.publishedAt) - +new Date(b.snippet.publishedAt));
                              }
                            });  
        
       // console.log(this.videoComments)
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
        this.videoComments.forEach(comment => { 
                                                            
                                if(!!comment.replies) {                                  
                                comment.replies.comments = comment.replies.comments.sort((a, b) => +new Date(a.snippet.publishedAt) - +new Date(b.snippet.publishedAt));                               
                              }
                            }); 
        console.log( this.videoComments)
      }         
        
      ,      
       _loadError => this.errorMsg = _loadError);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
        
  }

  onShowRepliesClick(index) {
    //this.showReplies = !this.showReplies;
    if (this.showReplies != index){
    this.showReplies = index;   
    this.showHideReplies = true;
    } else {
    this.showReplies = false;   
    this.showHideReplies = false; 
    }
  }

onAddNewCommentClick(){
  this.addNewComment = !this.addNewComment;
}

uploadComment(){ 
  
  console.log(this.comment_description)  

  if (this.comment_description != null){
    alert('Thank you for your comment')
    this.addNewComment = !this.addNewComment;
    console.log('Comment Uploaded')
  } else{
  alert('No Comment found')
  console.log('Comment is blank')
  }
}

onAddNewReplyClick(){
  console.log('New reply add clicked')
  this.addNewReply = !this.addNewReply;
}
}
