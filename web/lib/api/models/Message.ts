/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Agent_Output } from './Agent_Output';
import type { Chat } from './Chat';

/**
 * Represents a Message record
 */
export type Message = {
    id: string;
    content: string;
    agent: Agent_Output;
    chatId: string;
    createdAt: string;
    updatedAt: string;
    chat?: (Chat | null);
};

