import { Login } from "types/account/Login";

export class AuthenticationAPI {
    private static baseUrl = process.env.NEXT_PUBLIC_MICROSERVICE_AUTH_URL;

    public static async IsInternal() {
        const response = await fetch(this.baseUrl + "api/authentication/isInternal", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        return data;
    }

    public static async Login(username:string, password:string) {

        var data:Login = {
            username: username, 
            password: password
        }

        const response = await fetch(this.baseUrl + "api/authentication/login", {
            method: "POST",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return await response.json();
    }

}