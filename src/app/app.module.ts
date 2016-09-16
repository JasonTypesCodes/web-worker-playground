import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RootComponent } from './root.component';
import { BallPitComponent } from './ball-pit/ball-pit.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [RootComponent, BallPitComponent],
  bootstrap: [RootComponent]
})
export class AppModule{ }
