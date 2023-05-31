import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { NgClass } from "@angular/common";
import { IonicModule } from "@ionic/angular";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, NgClass, IonicModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
