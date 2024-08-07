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
        console.log(res);
        products.value = res ;        
    }
    //取得顧客資料
    const getCusData = async() => {
        const res = await fetchCusData();
        customers.value = res ;
    }
    //搜尋顧客資料
    async function searchCus(num){
        if(num == ''){
            Swal.fire({
                text: '請輸入電話號碼',
            });
        }else{
            await getCusData();
            const theCus = customers.value.find((customer)=>customer.phone === num);
            if(theCus){
                Swal.fire({
                    text: '找到了' + theCus.name,
                });
                return theCus;
            }else{
                Swal.fire({
                    text: '未找到該顧客資料',
                });
            }
        }
    }
    //搜尋產品資料
    async function search(item){
        console.log('1');
        
        console.log(item);
        
        if(item == ''){
            Swal.fire({
                text: '請輸入品項名稱',
            });
        }else{
            await getProduct();
            console.log(products.value);
            const theProduct = products.value.find((product)=>product.name === item);
            console.log(theProduct);
            
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
    const getCurrentTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
        const date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
        return `${year}年${month}月${date}日` ;
    }
    return{
        products,
        search,
        searchCus,
        getProduct,
        getCusData,
        getCurrentTime
    }
})