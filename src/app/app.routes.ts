import { SearchComponent } from './search/search.component';
import {RouterModule, Routes} from '@angular/router';
// import {}

const APP_ROUTES: Routes = [
{path: '', component: SearchComponent}
];

export const appRouterProviders = RouterModule.forRoot(APP_ROUTES);
