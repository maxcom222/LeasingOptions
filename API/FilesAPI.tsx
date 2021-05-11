export class FilesAPI {
    private static baseUrl = process.env.NEXT_PUBLIC_MICROSERVICE_FILES_URL;

    public static async UploadFile(fileData: any, bucket: string, path: string = null) {
        const response = await fetch(this.baseUrl + "api/files/upload?bucketPath=" + bucket + "/" + path, {
            method: "POST",
            cache: "no-cache",
            body: fileData
        });

        return await response.json();
    }
}