import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { PortalSharedModule } from 'app/shared/shared.module';
import { PortalCoreModule } from 'app/core/core.module';
import { PortalAppRoutingModule } from './app-routing.module';
import { PortalHomeModule } from './home/home.module';
import { PortalEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    PortalSharedModule,
    PortalCoreModule,
    PortalHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    PortalEntityModule,
    PortalAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class PortalAppModule {}
