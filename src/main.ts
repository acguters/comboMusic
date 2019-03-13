import { DemoMaterialModule } from './material-module';
import { appRouterProviders } from './app/app.routes';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { DemoMaterialModule } from "m";
import { AppModule } from './app/main/app.module';
import { environment } from './environments/environment';


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
