import { defineStore } from "pinia";
export default defineStore('products',{
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
            console.log(1);
            this.currentProduct = this.products.find((item)=>item.name===this.searchItem);
        }
    },
})