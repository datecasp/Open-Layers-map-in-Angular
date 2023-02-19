import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { OlMapComponent } from './ol-map/ol-map.component';

@NgModule({
  imports: [BrowserModule, FormsModule, MatButtonModule, MatIconModule],
  declarations: [AppComponent, OlMapComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
