import axios from 'axios';

const CLIENT_ORDERS_URL = "http://localhost:8080/processing/orders/client";

class ClientOrderService {

    getClientOrders() {
        return axios.get(CLIENT_ORDERS_URL + "/all-orders");
    }

    createClientOrder(order) {
        console.log(order)
        return axios.post(CLIENT_ORDERS_URL + "/new", order);
    }
}

export default new ClientOrderService()