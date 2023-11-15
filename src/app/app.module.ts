import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { ApiService } from './services/api.service';
import { LoadingComponent } from './components/loading/loading.component';

import { UserdetailsComponent } from './components/userdetails/userdetails.component';
import { RepositoriesComponent } from './components/repositories/repositories.component';
import { RepoCardComponent } from './components/repo-card/repo-card.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';





@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,

    UserdetailsComponent,
    RepositoriesComponent,
    RepoCardComponent,
    LandingpageComponent,






  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule { }
