import { defineStore } from "pinia";
import { ref } from "vue";
import Swal from 'sweetalert2';
import { fetchProductData,fetchCusData } from '@/stores/firebase.js';

export const useProductsStore = defineStore('data',() => {
    const products = ref([]);
    const customers = ref([]);
    const hasSearched = ref(false);

    //取得品項資料
    const getProduct = async() => {
        const res = await fetchProductData();
        products.value = res ;
        console.log(products.value);
    }
    // getProduct();
    //取得顧客資料
    const getCusData = async() => {
        const res = await fetchCusData();
        console.log(res);
        customers.value = res ;
        console.log(customers.value);
    }
    getCusData();
    const searchItem = ref('');
    const currentProduct = ref('');

    async function search(e){
        e.preventDefault();
        await getProduct();
        hasSearched.value = true ;
        currentProduct.value = products.value.find((item)=>item.name===searchItem.value);
        if (currentProduct.value) {
            console.log('找到了產品:', currentProduct.value);
            Swal.fire({
                text: '找到了' + currentProduct.value.name,
            });
        } else {
            alert('未找到該品項');
            searchItem.value = '';
        }
    };
    function clean(){
        searchItem.value = '';
        currentProduct.value = '';
        hasSearched.value = false ;
    }
    function addProduct(obj){
        products.value.push(obj);
        console.log(products.value);
        getProduct();
    };
    return{
        products,
        searchItem,
        clean,
        currentProduct,
        search,
        addProduct,
        hasSearched
    }
})
// export const useProductsStore = defineStore('products',{
//     state:()=>({
//         // products: [
//         //     {
//         //         "name": "黃芪",
//         //         "prices": [
//         //             { "weight": "斤", "price": 300 },
//         //             { "weight": "兩", "price": 20 },
//         //             { "weight": "錢", "price": 5 }
//         //         ]
//         //     },
//         //     {
//         //         "name": "紅棗",
//         //         "prices": [
//         //             { "weight": "斤", "price": 200 },
//         //             { "weight": "兩", "price": 100 },
//         //             { "weight": "錢", "price": 10 }
//         //         ]
//         //     },
//         //     {
//         //         "name": "黑棗",
//         //         "prices": [
//         //             { "weight": "斤", "price": 100 },
//         //             { "weight": "兩", "price": 30 },
//         //             { "weight": "錢", "price": 10 }
//         //         ]
//         //     }
//         // ],
//         products:[],
//         searchItem:'',
//         currentProduct:''
//     }),
//     actions:{
//         fetchData(){
//             storeData().then(data => {
//                 console.log(data[0].product);
//                 this.products = data[0].product;
//                 console.log(this.products);
//             }).catch(error => {
//             console.error("Error: ", error);
//             })
//         },
//         search(){
//             this.currentProduct = this.products.find((item)=>item.name===this.searchItem);
//             if (this.currentProduct) {
//                 console.log('找到了產品:', this.currentProduct);
//                 Swal.fire({
//                     text: '找到了' + this.currentProduct.name,
//                 });
//             } else {
//                 alert('未找到該品項');
//                 this.searchItem = '';
//             }
//         },
//         addProduct(obj){
//             this.products.push(obj);
//             console.log(this.products);
//         },
//         deleteProduct(){
//             if (this.currentProduct) {
//                 let index = this.products.findIndex((item) => item.name === this.currentProduct.name);
//                 if (index !== -1) {
//                     this.products.splice(index, 1);
//                     this.currentProduct = ''; // 清除 currentProduct
//                     this.searchItem = '';
//                     console.log(this.products);
//                     alert('產品已刪除');
//                 } else {
//                     console.log('未找到該產品');
//                 }
//             } else {
//                 alert('請先輸入欲刪除品項');
//             }
//         }
//     },
// })