import { environment } from "src/environments/environment";

const API_URL = environment.apiUrl;

export class VaultManagementApi {

    public static readonly HOME: string = `${API_URL}/`;

    public static readonly SIGNIN: string = `${API_URL}/api/auth/signin`;
    public static readonly SIGNUP: string = `${API_URL}/api/auth/signup`;
    public static readonly SIGNUP_SYSTEM: string = `${API_URL}/api/auth/signup-system`;
    public static readonly SIGNOUT: string = `${API_URL}/api/auth/signout`;

    public static readonly GET_CONFIGS_ALL: string = `${API_URL}/api/config/all`;
    public static readonly GET_CONFIG_DATA: string = `${API_URL}/api/config/get-data`;
    public static readonly UPDATE_CONFIG_CONFIGS: string = `${API_URL}/api/config/update`;
    public static readonly CREATE_CONFIG: string = `${API_URL}/api/config/create`;
    public static readonly DELETE_CONFIG: string = `${API_URL}/api/config/delete`;
    public static readonly CHANGE_CONFIG_USERS: string = `${API_URL}/api/config/change-users`;
    public static readonly CHANGE_CONFIG_SYSTEMS: string = `${API_URL}/api/config/change-systems`;
    public static readonly EXPORT_CONFIGS: string = `${API_URL}/api/config/export`;
    public static readonly IMPORT_CONFIGS: string = `${API_URL}/api/config/import`;

    public static readonly UNREAD_SECRETS: string = `${API_URL}/api/secret-message/unread`;
    public static readonly UNREAD_SECRETS_COUNT: string = `${API_URL}/api/secret-message/unread-count`;
    public static readonly GET_SECRET: string = `${API_URL}/api/secret-message/get`;
    public static readonly CREATE_SECRET: string = `${API_URL}/api/secret-message/create`;

    public static readonly GET_USERNAMES: string = `${API_URL}/api/user/usernames`;
    public static readonly GET_USERNAMES_BY_ROLE: string = `${API_URL}/api/user/usernames-by-role`;
    public static readonly GET_USER_DETAILS: string = `${API_URL}/api/user/details`;
    public static readonly MARK_USERS_AS_ADMINS: string = `${API_URL}/api/user/mark-users-as-admins`;
}
