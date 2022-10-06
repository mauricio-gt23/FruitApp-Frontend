import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router';

import { HomeAdminComponent } from './pages/admin/home/homeadmin.component';
import { SaleComponent } from './pages/admin/sale/sale.component';
import { BuyComponent } from './pages/client/buy/buy.component';
import { FruitComponent } from './pages/client/fruit/fruit.component';
import { HomeClientComponent } from './pages/client/home/homeclient.component';
import { JuiceComponent } from './pages/client/juice/juice.component';
import { OrderComponent } from './pages/client/order/order.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'homeclient',
                component: HomeClientComponent
            },
            {
                path: 'fruits',
                component: FruitComponent
            },
            {
                path: 'juices',
                component: JuiceComponent
            },
            {
                path: 'myorders',
                component: OrderComponent
            },
            {
                path: 'buy',
                component: BuyComponent
            },
            {
                path: 'homeadmin',
                component: HomeAdminComponent
            },
            {
                path: 'sales',
                component: SaleComponent
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoutingModule { }