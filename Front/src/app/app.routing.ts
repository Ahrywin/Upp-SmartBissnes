import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { BankEditorComponent } from './views/banks/bank-editor/bank-editor.component';
import { BankViewerComponent } from './views/banks/bank-viewer/bank-viewer.component';
import { TranEditorComponent } from './views/banks/tran-editor/tran-editor.component';
import { TranViewerComponent } from './views/banks/tran-viewer/tran-viewer.component';
import { WizardImportComponent } from './views/banks/wizard-import/wizard-import.component';
import { TranDeleteViewerComponent } from './views/banks/tran-delete-viewer/tran-delete-viewer.component';
import { TranDeleteDetailComponent } from './views/banks/tran-delete-detail/tran-delete-detail.component';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'dashboard',
		pathMatch: 'full',
	},
	{
		path: '404',
		component: P404Component,
		data: {
			title: 'Page 404'
		}
	},
	{
		path: '500',
		component: P500Component,
		data: {
			title: 'Page 500'
		}
	},
	{
		path: 'login',
		component: LoginComponent,
		data: {
			title: 'Login Page'
		}
	},
	{
		path: '',
		component: DefaultLayoutComponent,
		data: {
			title: 'Inicio'
		},
		children: [
			{
				path: 'dashboard',
				component: DashboardComponent
			},
			{
				path: "bank/list",
				component: BankViewerComponent,
				data: {
					title: 'Cuentas Registradas'
				}
			},
			{
				path: "bank/new",
				component: BankEditorComponent,
				data: {
					title: 'Nueva Cuenta'
				}
			},
			{
				path: "bank/edit",
				component: BankEditorComponent,
				data: {
					title: 'Editar Cuenta'
				}
			},

			{
				path: "bank/tran/new",
				component: TranEditorComponent,
				data: {
					title: 'Nuevo Movimiento'
				}
			},
			{
				path: "bank/tran/edit",
				component: TranEditorComponent,
				data: {
					title: 'Editar Movimiento'
				}
			},
			{
				path: "bank/tran/list",
				component: TranViewerComponent,
				data: {
					title: 'Movimientos de la Cuenta'
				}
			},
			{
				path: "bank/wizard/import",
				component: WizardImportComponent,
				data: {
					title: 'Importar Movimientos'
				}
			},
			{
				path: "bank/deletions/list",
				component: TranDeleteViewerComponent,
				data: {
					title: 'Movimientos Eliminados por Confirmar'
				}
			},
			{
				path: "bank/deletions/detail",
				component: TranDeleteDetailComponent,
				data: {
					title: 'Detalle de Movimientos Eliminados'
				}
			}
		]
	},
	{ path: '**', component: P404Component }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
