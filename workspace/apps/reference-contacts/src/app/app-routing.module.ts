import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './modules/site/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('@angular-architecture/reference/micro-apps/contacts-app').then(m => m.ContactsAppModule),
  },
  {
    path: 'contacts/landing',
    component: LayoutComponent,
    loadChildren: () => import('@angular-architecture/reference/micro-apps/contacts-app').then(m => m.ContactsAppModule),
  },
  {
    path: 'contacts/add',
    component: LayoutComponent,
    loadChildren: () => import('@angular-architecture/reference/micro-apps/contacts-app').then(m => m.ContactsAppModule),
  },
  {
    path: 'contacts/list',
    component: LayoutComponent,
    loadChildren: () => import('@angular-architecture/reference/micro-apps/contacts-app').then(m => m.ContactsAppModule),
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true, useHash: false, scrollPositionRestoration: 'top', anchorScrolling: 'enabled' }),
  ],
})
export class AppRoutingModule {}
