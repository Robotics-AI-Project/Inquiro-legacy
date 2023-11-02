/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { User } from './User';

/**
 * Represents a Datasource record
 */
export type Datasource = {
    id: string;
    name: string;
    engine: string;
    userId: string;
    url: string;
    createdAt: string;
    updatedAt: string;
    User?: (User | null);
};

