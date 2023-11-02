/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Chat } from '../models/Chat';
import type { CreateChatDTO } from '../models/CreateChatDTO';
import type { CreateMessageDTO } from '../models/CreateMessageDTO';
import type { Message } from '../models/Message';
import type { UpdateChatDTO } from '../models/UpdateChatDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ChatService {

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

    /**
     * Get All Chats
     * @returns Chat Successful Response
     * @throws ApiError
     */
    public static getAllChats({
        n = 10,
    }: {
        n?: number,
    }): CancelablePromise<Array<Chat>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/chat/',
            query: {
                'n': n,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Chat
     * @returns Chat Successful Response
     * @throws ApiError
     */
    public static createChat({
        requestBody,
    }: {
        requestBody: CreateChatDTO,
    }): CancelablePromise<Chat> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Chat
     * @returns Chat Successful Response
     * @throws ApiError
     */
    public static getChatById({
        chatId,
    }: {
        chatId: string,
    }): CancelablePromise<Chat> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/chat/{chat_id}',
            path: {
                'chat_id': chatId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Chat
     * @returns Chat Successful Response
     * @throws ApiError
     */
    public static updateChatById({
        chatId,
        requestBody,
    }: {
        chatId: string,
        requestBody: UpdateChatDTO,
    }): CancelablePromise<Chat> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/chat/{chat_id}',
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
