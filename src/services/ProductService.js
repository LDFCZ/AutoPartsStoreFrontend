import axios from 'axios';

const PRODUCTS_URL = "http://localhost:8080/processing/products";

class ProductService {

    getProducts() {
        return axios.get(PRODUCTS_URL + "/all-products");
    }

    createProduct(product) {
        console.log(product)
        return axios.post(PRODUCTS_URL + "/new", product);
    }

    updateProduct(product) {
        console.log(product)
        return axios.put(PRODUCTS_URL + "/update", product);
    }

    deleteProduct(id) {
        return axios.delete(PRODUCTS_URL + "/delete/" + id);
    }
}

export default new ProductService()