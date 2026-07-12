/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { apiV1AcademyAcademyIdSportsCategoriesPost } from '../fn/sports/api-v-1-academy-academy-id-sports-categories-post';
import { ApiV1AcademyAcademyIdSportsCategoriesPost$Params } from '../fn/sports/api-v-1-academy-academy-id-sports-categories-post';
import { apiV1AcademyAcademyIdSportsGet } from '../fn/sports/api-v-1-academy-academy-id-sports-get';
import { ApiV1AcademyAcademyIdSportsGet$Params } from '../fn/sports/api-v-1-academy-academy-id-sports-get';
import { apiV1AcademyAcademyIdSportsPost } from '../fn/sports/api-v-1-academy-academy-id-sports-post';
import { ApiV1AcademyAcademyIdSportsPost$Params } from '../fn/sports/api-v-1-academy-academy-id-sports-post';
import { apiV1AcademyAcademyIdSportsSportIdDelete } from '../fn/sports/api-v-1-academy-academy-id-sports-sport-id-delete';
import { ApiV1AcademyAcademyIdSportsSportIdDelete$Params } from '../fn/sports/api-v-1-academy-academy-id-sports-sport-id-delete';
import { apiV1AcademyAcademyIdSportsSportIdPut } from '../fn/sports/api-v-1-academy-academy-id-sports-sport-id-put';
import { ApiV1AcademyAcademyIdSportsSportIdPut$Params } from '../fn/sports/api-v-1-academy-academy-id-sports-sport-id-put';
import { apiV1AcademyAcademyIdSportsSportIdSkillsPost } from '../fn/sports/api-v-1-academy-academy-id-sports-sport-id-skills-post';
import { ApiV1AcademyAcademyIdSportsSportIdSkillsPost$Params } from '../fn/sports/api-v-1-academy-academy-id-sports-sport-id-skills-post';
import { apiV1SportsSportIdSkillsAvailableGet } from '../fn/sports/api-v-1-sports-sport-id-skills-available-get';
import { ApiV1SportsSportIdSkillsAvailableGet$Params } from '../fn/sports/api-v-1-sports-sport-id-skills-available-get';
import { SportsAddCategoryResponse } from '../models/sports-add-category-response';
import { SportsAddSkillResponse } from '../models/sports-add-skill-response';
import { SportsAddSportToAcademyResponse } from '../models/sports-add-sport-to-academy-response';
import { SportsDeleteSportResponse } from '../models/sports-delete-sport-response';
import { SportsGetAllSportsResponse } from '../models/sports-get-all-sports-response';
import { SportsGetAvailableSkillsResponse } from '../models/sports-get-available-skills-response';
import { SportsUpdateSportResponse } from '../models/sports-update-sport-response';

@Injectable({ providedIn: 'root' })
export class SportsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiV1AcademyAcademyIdSportsGet()` */
  static readonly ApiV1AcademyAcademyIdSportsGetPath = '/api/v1/academy/{academy_id}/sports';

  /**
   * Get All Sports.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1AcademyAcademyIdSportsGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdSportsGet$Response(params: ApiV1AcademyAcademyIdSportsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<SportsGetAllSportsResponse>> {
    return apiV1AcademyAcademyIdSportsGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get All Sports.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1AcademyAcademyIdSportsGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdSportsGet(params: ApiV1AcademyAcademyIdSportsGet$Params, context?: HttpContext): Observable<SportsGetAllSportsResponse> {
    return this.apiV1AcademyAcademyIdSportsGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<SportsGetAllSportsResponse>): SportsGetAllSportsResponse => r.body)
    );
  }

  /** Path part for operation `apiV1AcademyAcademyIdSportsPost()` */
  static readonly ApiV1AcademyAcademyIdSportsPostPath = '/api/v1/academy/{academy_id}/sports';

  /**
   * Add Sport to Academy.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1AcademyAcademyIdSportsPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdSportsPost$Response(params: ApiV1AcademyAcademyIdSportsPost$Params, context?: HttpContext): Observable<StrictHttpResponse<SportsAddSportToAcademyResponse>> {
    return apiV1AcademyAcademyIdSportsPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Add Sport to Academy.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1AcademyAcademyIdSportsPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdSportsPost(params: ApiV1AcademyAcademyIdSportsPost$Params, context?: HttpContext): Observable<SportsAddSportToAcademyResponse> {
    return this.apiV1AcademyAcademyIdSportsPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<SportsAddSportToAcademyResponse>): SportsAddSportToAcademyResponse => r.body)
    );
  }

  /** Path part for operation `apiV1AcademyAcademyIdSportsSportIdPut()` */
  static readonly ApiV1AcademyAcademyIdSportsSportIdPutPath = '/api/v1/academy/{academy_id}/sports/{sport_id}';

  /**
   * Update Sport.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1AcademyAcademyIdSportsSportIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdSportsSportIdPut$Response(params: ApiV1AcademyAcademyIdSportsSportIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<SportsUpdateSportResponse>> {
    return apiV1AcademyAcademyIdSportsSportIdPut(this.http, this.rootUrl, params, context);
  }

  /**
   * Update Sport.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1AcademyAcademyIdSportsSportIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdSportsSportIdPut(params: ApiV1AcademyAcademyIdSportsSportIdPut$Params, context?: HttpContext): Observable<SportsUpdateSportResponse> {
    return this.apiV1AcademyAcademyIdSportsSportIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<SportsUpdateSportResponse>): SportsUpdateSportResponse => r.body)
    );
  }

  /** Path part for operation `apiV1AcademyAcademyIdSportsSportIdDelete()` */
  static readonly ApiV1AcademyAcademyIdSportsSportIdDeletePath = '/api/v1/academy/{academy_id}/sports/{sport_id}';

  /**
   * Delete Sport.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1AcademyAcademyIdSportsSportIdDelete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdSportsSportIdDelete$Response(params: ApiV1AcademyAcademyIdSportsSportIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<SportsDeleteSportResponse>> {
    return apiV1AcademyAcademyIdSportsSportIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete Sport.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1AcademyAcademyIdSportsSportIdDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdSportsSportIdDelete(params: ApiV1AcademyAcademyIdSportsSportIdDelete$Params, context?: HttpContext): Observable<SportsDeleteSportResponse> {
    return this.apiV1AcademyAcademyIdSportsSportIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<SportsDeleteSportResponse>): SportsDeleteSportResponse => r.body)
    );
  }

  /** Path part for operation `apiV1SportsSportIdSkillsAvailableGet()` */
  static readonly ApiV1SportsSportIdSkillsAvailableGetPath = '/api/v1/sports/{sport_id}/skills/available';

  /**
   * Get Available Skills.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1SportsSportIdSkillsAvailableGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1SportsSportIdSkillsAvailableGet$Response(params: ApiV1SportsSportIdSkillsAvailableGet$Params, context?: HttpContext): Observable<StrictHttpResponse<SportsGetAvailableSkillsResponse>> {
    return apiV1SportsSportIdSkillsAvailableGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Available Skills.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1SportsSportIdSkillsAvailableGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1SportsSportIdSkillsAvailableGet(params: ApiV1SportsSportIdSkillsAvailableGet$Params, context?: HttpContext): Observable<SportsGetAvailableSkillsResponse> {
    return this.apiV1SportsSportIdSkillsAvailableGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<SportsGetAvailableSkillsResponse>): SportsGetAvailableSkillsResponse => r.body)
    );
  }

  /** Path part for operation `apiV1AcademyAcademyIdSportsSportIdSkillsPost()` */
  static readonly ApiV1AcademyAcademyIdSportsSportIdSkillsPostPath = '/api/v1/academy/{academy_id}/sports/{sport_id}/skills';

  /**
   * Add Skill.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1AcademyAcademyIdSportsSportIdSkillsPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdSportsSportIdSkillsPost$Response(params: ApiV1AcademyAcademyIdSportsSportIdSkillsPost$Params, context?: HttpContext): Observable<StrictHttpResponse<SportsAddSkillResponse>> {
    return apiV1AcademyAcademyIdSportsSportIdSkillsPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Add Skill.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1AcademyAcademyIdSportsSportIdSkillsPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdSportsSportIdSkillsPost(params: ApiV1AcademyAcademyIdSportsSportIdSkillsPost$Params, context?: HttpContext): Observable<SportsAddSkillResponse> {
    return this.apiV1AcademyAcademyIdSportsSportIdSkillsPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<SportsAddSkillResponse>): SportsAddSkillResponse => r.body)
    );
  }

  /** Path part for operation `apiV1AcademyAcademyIdSportsCategoriesPost()` */
  static readonly ApiV1AcademyAcademyIdSportsCategoriesPostPath = '/api/v1/academy/{academy_id}/sports/categories';

  /**
   * Add category.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiV1AcademyAcademyIdSportsCategoriesPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdSportsCategoriesPost$Response(params: ApiV1AcademyAcademyIdSportsCategoriesPost$Params, context?: HttpContext): Observable<StrictHttpResponse<SportsAddCategoryResponse>> {
    return apiV1AcademyAcademyIdSportsCategoriesPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Add category.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiV1AcademyAcademyIdSportsCategoriesPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiV1AcademyAcademyIdSportsCategoriesPost(params: ApiV1AcademyAcademyIdSportsCategoriesPost$Params, context?: HttpContext): Observable<SportsAddCategoryResponse> {
    return this.apiV1AcademyAcademyIdSportsCategoriesPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<SportsAddCategoryResponse>): SportsAddCategoryResponse => r.body)
    );
  }

}
