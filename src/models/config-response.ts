export interface ConfigResponse {
    name: string;
    description: string;
    username: string[];
    configurations: Map<string, string>;
}