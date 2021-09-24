import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'hsystem',
    loadChildren: () => import('./hsystem/hsystem.module').then( m => m.HsystemPageModule)
  },
  {
    path: 'tab1',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../app/tab1/tab1.module').then(m => m.Tab1PageModule)
      }
    ]
  },
  {
    path: 'tab2',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../app/tab2/tab2.module').then(m => m.Tab2PageModule)
      }
    ]
  },
  {
    path: 'tab4',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./contact/contact.module').then(m => m.ContactPageModule)
      }
    ]
  },
  {
    path: 'tab5',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./viewhagz/viewhagz.module').then(m => m.ViewhagzPageModule)
      }
    ]
  },
  {
    path: 'tab6',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./massages/massages.module').then(m => m.MassagesPageModule)
      }
    ]
  },
  {
    path: 'tab3',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../app/tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  },
  {
    path: 'tablehgz',
    loadChildren: () => import('./tablehgz/tablehgz.module').then( m => m.TablehgzPageModule)
  },
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then( m => m.PostPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'viewhagz',
    loadChildren: () => import('./viewhagz/viewhagz.module').then( m => m.ViewhagzPageModule)
  },
  {
    path: 'massages',
    loadChildren: () => import('./massages/massages.module').then( m => m.MassagesPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'sendresetemail',
    loadChildren: () => import('./sendresetemail/sendresetemail.module').then( m => m.SendresetemailPageModule)
  },
  {
    path: 'downloadd',
    loadChildren: () => import('./downloadd/downloadd.module').then( m => m.DownloaddPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
