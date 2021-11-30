import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ToggleDirective, ToggleButtonComponent } from './toggle.directive';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule ],
  declarations: [ AppComponent, HelloComponent, ToggleDirective, ToggleButtonComponent ],
  entryComponents: [ ToggleButtonComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
