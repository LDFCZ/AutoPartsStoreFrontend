import axios from 'axios';

const PRODUCT_TYPES_URL = "http://localhost:8080/processing/product-types";

class ProductTypeService {

    getProductTypess() {
        return axios.get(PRODUCT_TYPES_URL + "/all-product-types");
    }

    createProductType(productType) {
        console.log(productType)
        return axios.post(PRODUCT_TYPES_URL + "/new", productType);
    }
}

export default new ProductTypeService()