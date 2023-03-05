export interface ConfigResponse {
    name: string;
    description: string;
    usernames: string[];
    systemnames: string[];
    configurations: Map<string, string>;
}