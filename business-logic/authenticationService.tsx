import { AuthenticationAPI } from "API/AuthenticationAPI";

export class AuthenticationService {
    public static async IsInternalPage() {
        return AuthenticationAPI.IsInternal();
    }
} 