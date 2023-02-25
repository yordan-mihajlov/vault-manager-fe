export interface SecretMessageRequest {
    header: string;
    content: string;
    expireDays: number;
    isOneTime: boolean;
    toUsers: string[];
}