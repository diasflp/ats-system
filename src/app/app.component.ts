import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem, PoMenuPanelItem } from '@po-ui/ng-components';
import { delay } from 'rxjs/operators';

import { LoadingService } from './services/loading.service';

const ROUTE: { [key: string]: string } = {
  'Novo(a) canditato(a)': 'canditato',
  'Nova vaga': 'oportunidades',
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading = false;

  constructor(private _loading: LoadingService, private router: Router) {}

  readonly menus: Array<PoMenuItem> = [
    {
      label: 'Nova vaga',
      icon: 'po-icon-news',
      shortLabel: 'Register',
      action: this.goToNewRouter.bind(this),
    },
    {
      label: 'Novo(a) canditato(a)',
      icon: 'po-icon-user',
      shortLabel: 'Register User',
      action: this.goToNewRouter.bind(this),
    },
  ];

  ngOnInit() {
    this.listenToLoading();
  }

  goToNewRouter(menu: PoMenuPanelItem) {
    this.router.navigate([`/${ROUTE[menu.label]}`]);
  }

  /**
   * Listen to the loadingSub property in the LoadingService class. This drives the
   * display of the loading spinner.
   */
  listenToLoading(): void {
    this._loading.loadingSub.pipe(delay(0)).subscribe((loading) => {
      this.loading = loading;
    });
  }
}
