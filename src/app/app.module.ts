import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import {LayoutComponent} from './core/layout/layout.component';
import {ForbiddenComponent} from './core/forbidden/forbidden.component';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';
import {FooterComponent} from './core/layout/footer/footer.component';
import {ProvinceModule} from './modules/province/province.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ForbiddenComponent,
    PageNotFoundComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ProvinceModule,
    CoreModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
