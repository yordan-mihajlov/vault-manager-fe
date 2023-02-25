import { environment } from "src/environments/environment";

const API_URL = environment.apiUrl;

export class VaultManagementApi {

    public static readonly HOME: string = `${API_URL}/`;

    public static readonly SIGNIN: string = `${API_URL}/api/auth/signin`;
    public static readonly SIGNUP: string = `${API_URL}/api/auth/signup`;
    public static readonly SIGNOUT: string = `${API_URL}/api/auth/signout`;

    public static readonly GET_PROJECTS_ALL: string = `${API_URL}/api/project/all`;
    public static readonly GET_PROJECT_DATA: string = `${API_URL}/api/project/get-configs`;
    public static readonly UPDATE_PROJECT_CONFIGS: string = `${API_URL}/api/project/update-configs`;
    public static readonly CREATE_PROJECT: string = `${API_URL}/api/project/create`;
    public static readonly DELETE_PROJECT: string = `${API_URL}/api/project/delete`;
    public static readonly CHANGE_PROJECT_USERS: string = `${API_URL}/api/project/change-users`;

    public static readonly UNREAD_SECRETS: string = `${API_URL}/api/secret-message/unread-secrets`;
    public static readonly UNREAD_SECRETS_COUNT: string = `${API_URL}/api/secret-message/unread-secrets-count`;
    public static readonly GET_SECRET: string = `${API_URL}/api/secret-message/get-secret`;
    public static readonly CREATE_SECRET: string = `${API_URL}/api/secret-message/create-secret`;

    public static readonly GET_USERNAMES: string = `${API_URL}/api/user/usernames`;
    public static readonly GET_USER_DETAILS: string = `${API_URL}/api/user/user-details`;
}
