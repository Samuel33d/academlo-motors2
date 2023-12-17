import { utilsFireBase } from "../../config/plugins/firebase.plugin.js";

export class uploadFile {
    static async uploadToFireBase(path, data) {
        const imgRef = utilsFireBase.ref(
            utilsFireBase.storage,
            path
        )

        await utilsFireBase.uploadBytes(imgRef, data)

        return await utilsFireBase.getDownloadURL(imgRef)
    }
}