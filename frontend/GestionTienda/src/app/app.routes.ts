import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
    {
        path: 'products',
        component: ProductsComponent
    },
    {
        path: 'categories',
        component: CategoriesComponent
    },
    {
        path: '**',
        component: HomeComponent
    }
];
