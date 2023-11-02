/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Chat } from './Chat';
import type { Datasource } from './Datasource';

/**
 * Represents a User record
 */
export type User = {
    id: string;
    uid: string;
    name: string;
    username?: (string | null);
    email: string;
    image?: (string | null);
    provider?: (string | null);
    Datasource?: (Array<Datasource> | null);
    Chat?: (Array<Chat> | null);
    createdAt: string;
    updatedAt: string;
};

