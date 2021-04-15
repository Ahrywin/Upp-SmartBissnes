import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';

//locale
import { registerLocaleData } from '@angular/common';
import localeMx from '@angular/common/locales/es-MX';
registerLocaleData(localeMx, 'es-MX');

//aal
import { FormsModule } from "@angular/forms";
import { AlertComponent } from './components/alert/alert.component';
import { CommonModule } from '@angular/common'; //for pipes
import { HttpClientModule } from '@angular/common/http';

const APP_CONTAINERS = [
	DefaultLayoutComponent
];

import {
	AppAsideModule,
	AppBreadcrumbModule,
	AppHeaderModule,
	AppFooterModule,
	AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { CardComponent } from './components/card/card.component';
import { ProgressbarComponent } from './components/progressbar/progressbar.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { BankEditorComponent } from './views/banks/bank-editor/bank-editor.component';
import { BankViewerComponent } from './views/banks/bank-viewer/bank-viewer.component';
import { TranEditorComponent } from './views/banks/tran-editor/tran-editor.component';
import { TranViewerComponent } from './views/banks/tran-viewer/tran-viewer.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { WizardImportComponent } from './views/banks/wizard-import/wizard-import.component';
import { BankResumeComponent } from './views/banks/bank-resume/bank-resume.component';
import { TranDeleteViewerComponent } from './views/banks/tran-delete-viewer/tran-delete-viewer.component';
import { TranDeleteDetailComponent } from './views/banks/tran-delete-detail/tran-delete-detail.component';

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		AppAsideModule,
		AppBreadcrumbModule.forRoot(),
		AppFooterModule,
		AppHeaderModule,
		AppSidebarModule,
		PerfectScrollbarModule,
		BsDropdownModule.forRoot(),
		TabsModule.forRoot(),
		ChartsModule,

		//aal
		FormsModule,
		HttpClientModule,
		CommonModule, //for pipes
	],
	declarations: [
		AppComponent,
		...APP_CONTAINERS,
		P404Component,
		P500Component,
		LoginComponent,

		//aal
		AlertComponent,
		CardComponent,
		ProgressbarComponent,

		//editors
		DashboardComponent,
		BankEditorComponent,
		BankViewerComponent,
		TranEditorComponent,
		TranViewerComponent,
		PaginatorComponent,
		WizardImportComponent,
		BankResumeComponent,
		TranDeleteViewerComponent,
		TranDeleteDetailComponent,
	],
	providers: [
		{
			provide: LocationStrategy,
			useClass: HashLocationStrategy
		},
		{
			provide: LOCALE_ID,
			useValue: "es-MX"
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
