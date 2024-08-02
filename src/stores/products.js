import { defineStore } from "pinia";
import { ref } from "vue";
import Swal from 'sweetalert2';
import { fetchProductData, fetchCusData } from '@/stores/firebase.js';

export const useProductsStore = defineStore('data',() => {
    const products = ref([]);
    const customers = ref([]);
    //取得品項資料
    const getProduct = async() => {
        const res = await fetchProductData();
        products.value = res ;
    }
    //取得顧客資料
    const getCusData = async() => {
        const res = await fetchCusData();
        customers.value = res ;
    }
    const searchItem = ref('');
    const currentProduct = ref('');
    async function search(item){
        if(item == ''){
            Swal.fire({
                text: '請輸入品項名稱',
            });
        }else{
            await getProduct();
            const theProduct = products.value.find((product)=>product.name===item);
            if(theProduct){
                Swal.fire({
                    text: '找到了' + theProduct.name,
                });
            return theProduct;
            }else{
                alert('未找到該品項');
            }
        }
    }
    function clean(){
        searchItem.value = '';
        currentProduct.value = '';
    }
    const getCurrentTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
        const date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
        return `${year}年${month}月${date}日` ;
    }
    return{
        products,
        searchItem,
        clean,
        currentProduct,
        search,
        getProduct,
        getCusData,
        getCurrentTime
    }
})