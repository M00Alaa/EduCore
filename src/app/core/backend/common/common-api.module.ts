/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { AuthService } from './services/auth.service';
import { CitiesService } from './services/cities.service';
import { DistrictsService } from './services/districts.service';
import { SportsService } from './services/sports.service';
import { AcademyService } from './services/academy.service';
import { BrandingService } from './services/branding.service';
import { SocialmediaService } from './services/socialmedia.service';
import { PackagesService } from './services/packages.service';
import { PoliciesService } from './services/policies.service';
import { ZatcaService } from './services/zatca.service';
import { TeamPositionsService } from './services/team-positions.service';
import { LookupsApiFilterService } from './services/lookups-api-filter.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    AuthService,
    CitiesService,
    DistrictsService,
    SportsService,
    AcademyService,
    BrandingService,
    SocialmediaService,
    SportsService,
    PackagesService,
    PoliciesService,
    ZatcaService,
    TeamPositionsService,
    LookupsApiFilterService,
    ApiConfiguration
  ],
})
export class CommonApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<CommonApiModule> {
    return {
      ngModule: CommonApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor(
    @Optional() @SkipSelf() parentModule: CommonApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('CommonApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
        'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
