import axios from 'axios'

const baseurl = '';
const apiurl = 'http://rap.taobao.org/mockjsdata/21639'

class Services {
    getWechatSignature(url){
        return axios.get(`${baseurl}/wechat-signature?url=${url}`);
    }

    getUserByOAuth(url){
        return axios.get(`${baseurl}/wechat-signature?url=${url}`);
    }

    fetchHouses(){
        return axios.get(`${apiurl}/wiki/houses`);
    }

    fetchCities(){
        return axios.get(`${apiurl}/wiki/cities`);
    }

    fetchCharacters(){
        return axios.get(`${apiurl}/wiki/characters`);
    }

    fetchHouse(id){
        return axios.get(`${apiurl}/wiki/houses/${id}`);
    }

    fetchCharacter(id){
        return axios.get(`${apiurl}/wiki/characters/${id}`);
    }

    fetchProducts(){
        return axios.get(`${apiurl}/wiki/products`);
    }

    showProduct(id){
        return axios.get(`${apiurl}/wiki/products/${id}`);
    }

    fetchUserAndOrders(){
        
    }
}

export default new Services()
