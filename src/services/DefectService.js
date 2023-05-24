import axios from 'axios';

const DEFECTS_URL = "http://localhost:8080/processing/defects";

class DefectService {

    getDefects() {
        return axios.get(DEFECTS_URL + "/all-defects-page");
    }

    createDefect(defect) {
        console.log(defect)
        return axios.post(DEFECTS_URL + "/new", defect);
    }
}

export default new DefectService()