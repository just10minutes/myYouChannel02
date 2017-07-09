import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {HttpModule} from "@angular/http";
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
//import {YouTubeApi} from "../shared/youtubeapi.service";
import {YouTubeApi3} from "../shared/youtubeapi3.service";
import { YoutubePlayerModule } from 'ng2-youtube-player';
import {MyApp} from './app.component';
import {HomePage,VideoPage,FavouritePage,AboutPage,CommentsPage} from '../pages/pages';
import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicStorageModule } from '@ionic/storage';
import { OrderByPipe } from 'angular-pipes/src/array/order-by.pipe';

@NgModule({
  declarations: [
    MyApp, HomePage,VideoPage,FavouritePage,AboutPage,CommentsPage,OrderByPipe
  ],
  imports: [
    HttpModule, BrowserModule,YoutubePlayerModule, IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__youchannel',
      driverOrder: ['sqlite', 'indexeddb', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, HomePage,VideoPage,FavouritePage,AboutPage,CommentsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    YouTubeApi3,       
   // YouTubeApi, 
   {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    }
  ]
  
})
export class AppModule {}
