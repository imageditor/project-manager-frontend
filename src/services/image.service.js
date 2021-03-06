import { getHttpTransport } from "../http-common";

const httpJson = getHttpTransport('image')
const httpFormData= getHttpTransport('imagesFormData')

class ImageDataService {
    getAll() {
        return httpJson.get(`/images`);
    }

    get(id) {
        return httpJson.get(`/images/${id}`);
    }

    create(data) {
        return httpFormData.post("/images/", data);
    }

    update(id, data) {
        return httpJson.put(`/images/${id}`, data);
    }

    delete(id) {
        return httpJson.delete(`/images/${id}`);
    }

    deleteAll() {
        return httpJson.delete(`/images`);
    }

    findByProjectId(projectId) {
        return httpJson.get(`/images?projectid=${projectId}`);
    }

    transform(data){
        return httpJson.post("/images/transform", data);
    }
}

export default new ImageDataService();