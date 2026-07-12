/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { AcademyService } from './services/academy.service';
import { BranchManagementPortalUiService } from './services/branch-management-portal-ui.service';
import { InvoicesApiVultService } from './services/invoices-api-vult.service';
import { PromosService } from './services/promos.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    AcademyService,
    BranchManagementPortalUiService,
    InvoicesApiVultService,
    PromosService,
    ApiConfiguration
  ],
})
export class AcademyApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<AcademyApiModule> {
    return {
      ngModule: AcademyApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: AcademyApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('AcademyApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
