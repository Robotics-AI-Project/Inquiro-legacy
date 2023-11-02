/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateMessageDTO } from '../models/CreateMessageDTO';
import type { Message } from '../models/Message';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MessageService {

    /**
     * Get All Messages
     * @returns Message Successful Response
     * @throws ApiError
     */
    public static getAllMessages({
        chatId,
    }: {
        chatId: string,
    }): CancelablePromise<Array<Message>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/chat/{chat_id}/message/',
            path: {
                'chat_id': chatId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Message
     * @returns Message Successful Response
     * @throws ApiError
     */
    public static createMessage({
        chatId,
        requestBody,
    }: {
        chatId: string,
        requestBody: CreateMessageDTO,
    }): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/{chat_id}/message/',
            path: {
                'chat_id': chatId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
