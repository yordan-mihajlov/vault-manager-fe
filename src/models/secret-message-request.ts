export interface SecretMessageRequest {
    header: string;
    content: string;
    expireDays: number;
    uisOneTimeuid: boolean;
    toUsers: string[];
}