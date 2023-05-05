/* Copyright (C) HyperSphere.ai - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
    imports: [ RouterModule.forRoot(routes, {
        anchorScrolling: 'enabled',
    }) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
