/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthActionsComponent } from './components/auth-actions/auth-actions.component';
import { InteroperabilityActionsComponent } from './components/interoperability-actions/interoperability-actions.component';
import { KycActionsComponent } from './components/kyc-actions/kyc-actions.component';
import { MfaActionsComponent } from './components/mfa-actions/mfa-actions.component';
import { MultipassActionsComponent } from './components/multipass-actions/multipass-actions.component';
import { SocialActionsComponent } from './components/social-actions/social-actions.component';
import { UserWalletsActionsComponent } from './components/user-wallets-actions/user-wallets-actions.component';
import { NoCacheInterceptor } from './interceptors/no-cache.interceptor';
import { HeaderComponent } from './shared/header/header.component';
import { IntroComponent } from './shared/intro/intro.component';
import { JsonShowcaseComponent } from './shared/json-showcase/json-showcase.component';
import { PrettyPrintPipe } from './shared/pipes/prety.pipe';
import { DocsLinkComponent } from './shared/docs-link/docs-link.component';

@NgModule({
    declarations: [
        AppComponent,
        AuthActionsComponent,
        MfaActionsComponent,
        KycActionsComponent,
        SocialActionsComponent,
        MultipassActionsComponent,
        InteroperabilityActionsComponent,
        UserWalletsActionsComponent,
        JsonShowcaseComponent,
        PrettyPrintPipe,
        HeaderComponent,
        IntroComponent,
        DocsLinkComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NoCacheInterceptor,
            multi: true
        }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
