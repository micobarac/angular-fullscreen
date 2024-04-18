import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullscreenModule } from './fullscreen/fullscreen.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, FullscreenModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
