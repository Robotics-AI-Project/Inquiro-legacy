/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Message } from './Message';
import type { User } from './User';

/**
 * Represents a Chat record
 */
export type Chat = {
    id: string;
    name?: (string | null);
    userId: string;
    createdAt: string;
    updatedAt: string;
    User?: (User | null);
    Message?: (Array<Message> | null);
};

