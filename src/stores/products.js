import { defineStore } from "pinia";
import Swal from 'sweetalert2';
export const useProductsStore = defineStore('products',{
    state:()=>({
        products: [
            {
                "name": "黃芪",
                "prices": [
                    { "weight": "j斤", "price": 300 },
                    { "weight": "兩", "price": 20 },
                    { "weight": "錢", "price": 5 }
                ]
            },
            {
                "name": "紅棗",
                "prices": [
                    { "weight": "斤", "price": 200 },
                    { "weight": "兩", "price": 100 },
                    { "weight": "錢", "price": 10 }
                ]
            },
            {
                "name": "黑棗",
                "prices": [
                    { "weight": "斤", "price": 100 },
                    { "weight": "兩", "price": 30 },
                    { "weight": "錢", "price": 10 }
                ]
            }
        ],
        searchItem:'',
        currentProduct:''
    }),
    actions:{
        search(){
            this.currentProduct = this.products.find((item)=>item.name===this.searchItem);
            if (this.currentProduct) {
                console.log('找到了產品:', this.currentProduct);
                Swal.fire({
                    text: '找到了' + this.currentProduct.name,
                });
            } else {
                alert('未找到該品項');
                this.searchItem = '';
            }
        },
        addProduct(obj){
            this.products.push(obj);
            console.log(this.products);
        },
        deleteProduct(){
            if (this.currentProduct) {
                let index = this.products.findIndex((item) => item.name === this.currentProduct.name);
                if (index !== -1) {
                    this.products.splice(index, 1);
                    this.currentProduct = ''; // 清除 currentProduct
                    this.searchItem = '';
                    console.log(this.products);
                    alert('產品已刪除');
                } else {
                    console.log('未找到該產品');
                }
            } else {
                alert('請先輸入欲刪除品項');
            }
        }
    },
})