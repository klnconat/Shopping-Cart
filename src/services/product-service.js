import axiosHelper from './axios-helper';

export default {
    getProductList(){
        return axiosHelper.get('https://5fc9346b2af77700165ae514.mockapi.io/products');
    },
    getProductDetail(id){
        return axiosHelper.get(`https://5fc9346b2af77700165ae514.mockapi.io/products/${id}`);
    }
}