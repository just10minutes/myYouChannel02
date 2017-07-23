import {Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import  'rxjs/add/operator/map';
import  'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import  'rxjs/add/observable/throw';

const URL_BASE = 'https://www.googleapis.com/youtube/v3/';
const YT_API_KEY = 'AIzaSyDakOEmUYr0Fq_1-DQLkZCDSPn8vFuvVtg';
const CHANNEL_ID = 'UCfwHP1M0AFSPqTdjzXhV0Zg';//UChYheBnVeCfhCmqZfCUdJQw
const MAX_RES = 10;

@Injectable()

export class YouTubeApi3 {
    constructor(public http : Http) {}

    getChannelInfo() {
    return this
            .http
            .get(`${URL_BASE}channels?part=snippet,brandingSettings,statistics&id=${CHANNEL_ID}&key=${YT_API_KEY}`)
            .map((response: Response) => response.json())
            .catch(this._errorHandler);
    }

getVideosByChannelID(channelId) {
    return this
        .http
        .get(`${URL_BASE}search?order=date&part=id,snippet&channelId=${channelId}&key=${YT_API_KEY}`)
        .map((response: Response) => response.json())
            .catch(this._errorHandler);    
  }

getDefaultChannelVideos() {
    return this
        .http
        .get(`${URL_BASE}search?type=video&maxResults=${MAX_RES}&order=date&part=id,snippet&channelId=${CHANNEL_ID}&key=${YT_API_KEY}`)
        .map((response: Response) => response.json())
            .catch(this._errorHandler);      

  }

  getVideosPerPage(pageToken) {
    return this
        .http
        .get(`${URL_BASE}search?type=video&maxResults=${MAX_RES}&order=date&part=id,snippet&channelId=${CHANNEL_ID}&pageToken=${pageToken}&key=${YT_API_KEY}`)
        .map((response: Response) => response.json())
            .catch(this._errorHandler);  
  }

  getSingleVideo(videoId){
      return this
        .http
        .get(`${URL_BASE}videos?part=id,snippet,contentDetails,statistics&id=${videoId}&key=${YT_API_KEY}`)
        .map((response: Response) => response.json())
            .catch(this._errorHandler); 
  }

  getLatestComments(videoId){
      return this
        .http
        .get(`${URL_BASE}commentThreads?maxResults=${MAX_RES}&order=time&part=snippet,replies&videoId=${videoId}&key=${YT_API_KEY}`)
        .map((response: Response) => response.json())
            .catch(this._errorHandler); 
  }

    getLatestCommentsPerPage(videoId,pageToken){
      return this
        .http
        .get(`${URL_BASE}commentThreads?maxResults=${MAX_RES}&order=time&part=snippet,replies&videoId=${videoId}&pageToken=${pageToken}&key=${YT_API_KEY}`)
        .map((response: Response) => response.json())
            .catch(this._errorHandler); 
  }

  getDefaultPlaylist(){
      return this
        .http
        .get(`${URL_BASE}playlists?part=snippet,contentDetails&channelId=${CHANNEL_ID}&maxResults=${MAX_RES}&key=${YT_API_KEY}`)
        .map((response: Response) => response.json())
            .catch(this._errorHandler);  
  }

loadMorePlayList(pageToken){
    return this
        .http
        .get(`${URL_BASE}playlists?part=snippet,contentDetails&channelId=${CHANNEL_ID}&maxResults=${MAX_RES}&pageToken=${pageToken}&key=${YT_API_KEY}`)
        .map((response: Response) => response.json())
            .catch(this._errorHandler);

}


getSinglePlayList(playListId){
     return this
        .http
        .get(`${URL_BASE}playlistItems?part=snippet,contentDetails&maxResults=${MAX_RES}&playlistId=${playListId}&key=${YT_API_KEY}`)
        .map((response: Response) => response.json())
            .catch(this._errorHandler);
}

loadMoreSinglePlayList(playListId,pageToken){
    return this
        .http
        .get(`${URL_BASE}playlistItems?part=snippet,contentDetails&maxResults=${MAX_RES}&playlistId=${playListId}&pageToken=${pageToken}&key=${YT_API_KEY}`)
        .map((response: Response) => response.json())
            .catch(this._errorHandler);

}
   _errorHandler(error: Response){
       console.error(error)
       return Observable.throw(error || "Server Error")

   }

   
}