import axios from 'axios';

const SHOP_ORDERS_URL = "http://localhost:8080/processing/orders/shop";

class ShopOrderService {

    getShopOrders() {
        return axios.get(SHOP_ORDERS_URL + "/all-orders-page");
    }

    createShopOrder(shopOrder) {
        console.log(shopOrder)
        return axios.post(SHOP_ORDERS_URL + "/new", shopOrder);
    }
}

export default new ShopOrderService()