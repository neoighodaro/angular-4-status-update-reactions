import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { StatusesComponent } from './statuses/statuses.component';

import { StatusesService } from './statuses/statuses.service';

export const firebaseConfig = {
  apiKey: "AIzaSyAL5_KDTjiqo9PI19qBJTu4xbuqu_snYTw",
  authDomain: "reactions-634d3.firebaseapp.com",
  databaseURL: "https://reactions-634d3.firebaseio.com",
  projectId: "reactions-634d3",
  storageBucket: "reactions-634d3.appspot.com",
  messagingSenderId: "25397341111"
};

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SidebarComponent,
    StatusesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [StatusesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
