import {Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../app/login/login.component';
import { ForgotPasswordComponent } from '../app/login/forgot-password/forgot-password.component';
import { ConfirmationComponent} from '../app/login/confirmation/confirmation.component';
import { ResetpasswordComponent } from '../app/login/resetpassword/resetpassword.component';
//import { DashboardComponent } from './dashboard'

const appRoutes: Routes = [
    //  { path: '', component: LoginComponent },
//will probably get rid of the login path since cms by default should be login screens
    {path: 'login', component: LoginComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent },
    {path: 'email-link-confirmation', component: ConfirmationComponent},
    {path: 'resetpassword', component: ResetpasswordComponent}
];

export const appRoutingProviders: any[] = [];
export const routing = RouterModule.forRoot(appRoutes);