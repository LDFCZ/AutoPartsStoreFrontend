import axios from 'axios';

const CLIENTS_URL = "http://localhost:8080/processing/clients";

class ClientService {

    getClients() {
        return axios.get(CLIENTS_URL + "/all-clients");
    }

    createClient(supplier) {
        console.log(supplier)
        return axios.post(CLIENTS_URL + "/new", supplier);
    }
}

export default new ClientService()