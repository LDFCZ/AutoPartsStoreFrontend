import axios from 'axios';

const OFFERS_URL = "http://localhost:8080/processing/offers";

class OfferService {

    getOffers() {
        return axios.get(OFFERS_URL + "/all-offers-page");
    }

    createOffer(offer) {
        console.log(offer)
        return axios.post(OFFERS_URL + "/new", offer);
    }

    completeOffer(id) {
        return axios.get(OFFERS_URL + "/complete/" + id);
    }
}

export default new OfferService()