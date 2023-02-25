export interface UnreadSecretMessageResponse {
    header: string;
    uuid: string;
    isOneTime: boolean;
    expireDate: Date
    new: boolean;
}