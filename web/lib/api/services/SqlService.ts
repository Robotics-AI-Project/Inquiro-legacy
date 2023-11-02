/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GenerateSQLDTO } from '../models/GenerateSQLDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SqlService {

    /**
     * Generate Sql
     * Generate SQL
     * @returns any Successful Response
     * @throws ApiError
     */
    public static generateSqlApiInferenceSqlPost({
        requestBody,
    }: {
        requestBody: GenerateSQLDTO,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/inference/sql/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
