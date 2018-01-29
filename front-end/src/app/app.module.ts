import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PotService } from './pot.service';
import { PotComponent } from './pots/pot.component';

@NgModule({
  declarations: [
    AppComponent,
    PotComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    PotService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
