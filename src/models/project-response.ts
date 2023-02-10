export interface ProjectResponse {
    name: string;
    description: string;
    username: string[];
    configurations: Map<string, string>;
}