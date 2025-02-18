export interface paths {
    "/auth/register": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["RegisterRequest"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: {
                    useCookies?: boolean;
                    useSessionCookies?: boolean;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["LoginRequest"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["AccessTokenResponse"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/refresh": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["RefreshRequest"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["AccessTokenResponse"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/confirmEmail": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["MapIdentityApi-auth/confirmEmail"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/resendConfirmationEmail": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["ResendConfirmationEmailRequest"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/forgotPassword": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["ForgotPasswordRequest"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/resetPassword": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["ResetPasswordRequest"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/manage/2fa": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["TwoFactorRequest"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["TwoFactorResponse"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/manage/info": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["InfoResponse"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["InfoRequest"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["InfoResponse"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: {
                    page?: number;
                    search?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["PaginationResultOfUserPublicInfoDto"];
                        "application/json": components["schemas"]["PaginationResultOfUserPublicInfoDto"];
                        "text/json": components["schemas"]["PaginationResultOfUserPublicInfoDto"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/info": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["UserDto"];
                        "application/json": components["schemas"]["UserDto"];
                        "text/json": components["schemas"]["UserDto"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["ProblemDetails"];
                        "application/json": components["schemas"]["ProblemDetails"];
                        "text/json": components["schemas"]["ProblemDetails"];
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["ProblemDetails"];
                        "application/json": components["schemas"]["ProblemDetails"];
                        "text/json": components["schemas"]["ProblemDetails"];
                    };
                };
            };
        };
        put: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["SetProfileInfoRequestDto"];
                    "text/json": components["schemas"]["SetProfileInfoRequestDto"];
                    "application/*+json": components["schemas"]["SetProfileInfoRequestDto"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["UserDto"];
                        "application/json": components["schemas"]["UserDto"];
                        "text/json": components["schemas"]["UserDto"];
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["ProblemDetails"];
                        "application/json": components["schemas"]["ProblemDetails"];
                        "text/json": components["schemas"]["ProblemDetails"];
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["ProblemDetails"];
                        "application/json": components["schemas"]["ProblemDetails"];
                        "text/json": components["schemas"]["ProblemDetails"];
                    };
                };
            };
        };
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/invitations/recieved": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["Invitation"][];
                        "application/json": components["schemas"]["Invitation"][];
                        "text/json": components["schemas"]["Invitation"][];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/invitations/sent": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["InvitationDto"][];
                        "application/json": components["schemas"]["InvitationDto"][];
                        "text/json": components["schemas"]["InvitationDto"][];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/invitations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["CreateInvitationRequestDto"];
                    "text/json": components["schemas"]["CreateInvitationRequestDto"];
                    "application/*+json": components["schemas"]["CreateInvitationRequestDto"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["InvitationDto"];
                        "application/json": components["schemas"]["InvitationDto"];
                        "text/json": components["schemas"]["InvitationDto"];
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["ProblemDetails"];
                        "application/json": components["schemas"]["ProblemDetails"];
                        "text/json": components["schemas"]["ProblemDetails"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/invitations/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["ConversationDto"];
                        "application/json": components["schemas"]["ConversationDto"];
                        "text/json": components["schemas"]["ConversationDto"];
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["ProblemDetails"];
                        "application/json": components["schemas"]["ProblemDetails"];
                        "text/json": components["schemas"]["ProblemDetails"];
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["ProblemDetails"];
                        "application/json": components["schemas"]["ProblemDetails"];
                        "text/json": components["schemas"]["ProblemDetails"];
                    };
                };
            };
        };
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        AccessTokenResponse: {
            tokenType?: string | null;
            accessToken: string;
            /** Format: int64 */
            expiresIn: number;
            refreshToken: string;
        };
        ApplicationUser: {
            firstName?: string | null;
            lastName?: string | null;
            fromInvitations?: components["schemas"][];
            toInvitations?: components["schemas"][];
            firstConversations?: components["schemas"]["Conversation"][];
            secondConversations?: components["schemas"];
            messages?: components["schemas"];
            /** Format: uuid */
            id?: string;
            userName?: string | null;
            normalizedUserName?: string | null;
            email?: string | null;
            normalizedEmail?: string | null;
            emailConfirmed?: boolean;
            passwordHash?: string | null;
            securityStamp?: string | null;
            concurrencyStamp?: string | null;
            phoneNumber?: string | null;
            phoneNumberConfirmed?: boolean;
            twoFactorEnabled?: boolean;
            /** Format: date-time */
            lockoutEnd?: string | null;
            lockoutEnabled?: boolean;
            /** Format: int32 */
            accessFailedCount?: number;
        };
        ApplicationUser2: {
            firstName?: string | null;
            lastName?: string | null;
            fromInvitations?: components["schemas"];
            toInvitations?: components["schemas"];
            firstConversations?: components["schemas"];
            secondConversations?: components["schemas"][];
            messages?: components["schemas"]["Message"][];
            /** Format: uuid */
            id?: string;
            userName?: string | null;
            normalizedUserName?: string | null;
            email?: string | null;
            normalizedEmail?: string | null;
            emailConfirmed?: boolean;
            passwordHash?: string | null;
            securityStamp?: string | null;
            concurrencyStamp?: string | null;
            phoneNumber?: string | null;
            phoneNumberConfirmed?: boolean;
            twoFactorEnabled?: boolean;
            /** Format: date-time */
            lockoutEnd?: string | null;
            lockoutEnabled?: boolean;
            /** Format: int32 */
            accessFailedCount?: number;
        };
        ApplicationUser3: {
            firstName?: string | null;
            lastName?: string | null;
            fromInvitations?: components["schemas"];
            toInvitations?: components["schemas"];
            firstConversations?: components["schemas"];
            secondConversations?: components["schemas"];
            messages?: components["schemas"];
            /** Format: uuid */
            id?: string;
            userName?: string | null;
            normalizedUserName?: string | null;
            email?: string | null;
            normalizedEmail?: string | null;
            emailConfirmed?: boolean;
            passwordHash?: string | null;
            securityStamp?: string | null;
            concurrencyStamp?: string | null;
            phoneNumber?: string | null;
            phoneNumberConfirmed?: boolean;
            twoFactorEnabled?: boolean;
            /** Format: date-time */
            lockoutEnd?: string | null;
            lockoutEnabled?: boolean;
            /** Format: int32 */
            accessFailedCount?: number;
        };
        Conversation: {
            /** Format: uuid */
            id?: string;
            /** Format: uuid */
            firstUserId: string;
            firstUser?: components["schemas"]["ApplicationUser2"];
            /** Format: uuid */
            secondUserId: string;
            secondUser?: components["schemas"];
            messages?: components["schemas"];
        };
        Conversation2: {
            /** Format: uuid */
            id?: string;
            /** Format: uuid */
            firstUserId: string;
            firstUser?: components["schemas"];
            /** Format: uuid */
            secondUserId: string;
            secondUser?: components["schemas"]["ApplicationUser3"];
            messages?: components["schemas"][];
        };
        ConversationDto: {
            /** Format: uuid */
            id?: string;
            firstUser?: components["schemas"]["UserPublicInfoDto"];
            secondUser?: components["schemas"]["UserPublicInfoDto"];
        };
        CreateInvitationRequestDto: {
            /** Format: uuid */
            userId: string;
        };
        ForgotPasswordRequest: {
            email: string;
        };
        HttpValidationProblemDetails: {
            type?: string | null;
            title?: string | null;
            /** Format: int32 */
            status?: number | null;
            detail?: string | null;
            instance?: string | null;
            errors?: {
                [key: string]: string[];
            };
        };
        InfoRequest: {
            newEmail?: string | null;
            newPassword?: string | null;
            oldPassword?: string | null;
        };
        InfoResponse: {
            email: string;
            isEmailConfirmed: boolean;
        };
        Invitation: {
            /** Format: uuid */
            id?: string;
            /** Format: uuid */
            fromUserId: string;
            fromUser?: components["schemas"]["ApplicationUser"];
            /** Format: uuid */
            toUserId: string;
            toUser?: components["schemas"]["ApplicationUser3"];
            /** Format: date-time */
            timestamp?: string;
        };
        InvitationDto: {
            /** Format: uuid */
            id?: string;
            fromUser?: components["schemas"]["UserPublicInfoDto"];
            toUser?: components["schemas"]["UserPublicInfoDto"];
            /** Format: date-time */
            timestamp?: string;
        };
        LoginRequest: {
            email: string;
            password: string;
            twoFactorCode?: string | null;
            twoFactorRecoveryCode?: string | null;
        };
        Message: {
            /** Format: uuid */
            id?: string;
            /** Format: uuid */
            userId: string;
            user?: components["schemas"]["ApplicationUser3"];
            /** Format: uuid */
            convsersationId: string;
            conversation?: components["schemas"]["Conversation2"];
            /** Format: date-time */
            timestamp: string;
        };
        PaginationResultOfUserPublicInfoDto: {
            items: components["schemas"]["UserPublicInfoDto"][];
            /** Format: int32 */
            pages: number;
        };
        ProblemDetails: {
            type?: string | null;
            title?: string | null;
            /** Format: int32 */
            status?: number | null;
            detail?: string | null;
            instance?: string | null;
        };
        RefreshRequest: {
            refreshToken: string;
        };
        RegisterRequest: {
            email: string;
            password: string;
        };
        ResendConfirmationEmailRequest: {
            email: string;
        };
        ResetPasswordRequest: {
            email: string;
            resetCode: string;
            newPassword: string;
        };
        SetProfileInfoRequestDto: {
            firstName: string;
            lastName: string;
        };
        TwoFactorRequest: {
            enable?: boolean | null;
            twoFactorCode?: string | null;
            resetSharedKey?: boolean;
            resetRecoveryCodes?: boolean;
            forgetMachine?: boolean;
        };
        TwoFactorResponse: {
            sharedKey: string;
            /** Format: int32 */
            recoveryCodesLeft: number;
            recoveryCodes?: string[] | null;
            isTwoFactorEnabled: boolean;
            isMachineRemembered: boolean;
        };
        UserDto: {
            /** Format: uuid */
            id: string;
            firstName: string | null;
            lastName: string | null;
            email: string;
        };
        UserPublicInfoDto: {
            /** Format: uuid */
            id: string;
            firstName: string | null;
            lastName: string | null;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    "MapIdentityApi-auth/confirmEmail": {
        parameters: {
            query: {
                userId: string;
                code: string;
                changedEmail?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
