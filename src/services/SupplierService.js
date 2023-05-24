import axios from 'axios';

const SUPPLIERS_URL = "http://localhost:8080/processing/suppliers";

class SupplierService {

    getSuppliers() {
        return axios.get(SUPPLIERS_URL + "/all-suppliers");
    }

    createSupplier(supplier) {
        console.log(supplier)
        return axios.post(SUPPLIERS_URL + "/new", supplier);
    }
}

export default new SupplierService()