<template>
    <div class="row">
        <div class="col-md-3 col-12 d-flex">
            <div class="col-2 m-2 col-form-label">品項</div>
            <div class="col-10">
                <input type="text" v-model="searchItem" class="form-control m-2" placeholder="輸入品項">
            </div>
        </div>
        <div class="col-md-3 col-12">
            <button @click="search" class="btn btn-primary m-2">查詢</button>
            <button @click="clean" class="btn btn-primary m-2">清除</button>
        </div>
        <div class="col-md-3 col-12" v-if="this.currentProduct">
            <ul>
                <li>{{this.currentProduct.name}}</li>
            </ul>
            <ul v-for="(item,i) in this.currentProduct.prices" :key="i">
                <li>{{item.price}}/{{item.weight}}</li>
            </ul>
        </div>
        <div class="col-md-3 col-12" v-else>
            <p>查無此商品</p>
        </div>
    </div>
</template>
<script>
    import products from "../stores/products";
    import { mapState } from "pinia";
    export default{
        data(){
            return{
                searchItem:'',
                currentProduct:''
            }
        },
        methods:{
            search(){
                console.log(this.products);
                this.currentProduct = this.products.find((item)=>item.name===this.searchItem);
                console.log(this.currentProduct);
            },
            clean(){
                this.searchItem = '';
                this.currentProduct = '';
            },
        },
        computed:{
            ...mapState(products,['products'])
        },
    }
</script>