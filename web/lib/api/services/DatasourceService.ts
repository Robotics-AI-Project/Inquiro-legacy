/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateDatasourceDTO } from '../models/CreateDatasourceDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DatasourceService {

    /**
     * Get All Datasource
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getAllDatasourceApiDatasourceGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/datasource/',
        });
    }

    /**
     * Create Datasource
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createDatasourceApiDatasourcePost({
        requestBody,
    }: {
        requestBody: CreateDatasourceDTO,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/datasource/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Datasource By Id
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getDatasourceByIdApiDatasourceDatasourceIdGet({
        datasourceId,
    }: {
        datasourceId: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/datasource/{datasource_id}',
            path: {
                'datasource_id': datasourceId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Datasource
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteDatasourceApiDatasourceDatasourceIdDelete({
        datasourceId,
    }: {
        datasourceId: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/datasource/{datasource_id}',
            path: {
                'datasource_id': datasourceId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
