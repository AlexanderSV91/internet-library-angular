import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {BoardBookComponent} from './board-book/board-book.component';
import {BoardUserComponent} from './board-user/board-user.component';
import {BoardOrderBookComponent} from './board-order-book/board-order-book.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'orderbook', component: BoardOrderBookComponent},
  {path: 'book', component: BoardBookComponent},
  {path: 'user', component: BoardUserComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
