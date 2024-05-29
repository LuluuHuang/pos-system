<template>
    <div class="row">
        <div class="col-md-4 col-12">
            <h2>顧客資料</h2>
            <p>姓名</p><input type="text" name="" id="" class="form-control my-2">
            <p>電話</p><input type="text" name="" id="" class="form-control my-2">
            <p>藥單名稱</p><input type="text" name="" id="" class="form-control my-2">
            <p>品項</p>
            <input type="text" class="form-control my-2" v-model="searchItem"/>
            <p>重量</p>
            <input type="number" class="form-control my-2" v-model="selectedWeightNum">
            <p>單位</p>
            <select name="" id="" class="form-select my-2" v-model="selectedWeight">
                <option value="斤">斤</option>
                <option value="兩">兩</option>
                <option value="錢">錢</option>
            </select>
            <button class="btn btn-primary my-2" @click.prevent="search">計算</button>
            <p>計算結果</p>
            <p>{{selectdInfo}}</p>
            <button class="btn btn-primary" @click="putIntoCart">確定</button>
        </div>
        <div class="col-md-8 col-12">
            <h2>藥單</h2>
            <ul v-for="(item,i) in cartList" :key="i">
                <li>{{item}}</li>
            </ul>
            <div class="content">
            </div>
            <div class="total col-3">
                <p>總金額:{{totalPrice}}</p>
                <p>確認總金額:</p><input type="number" name="" id="" class="form-control">
                <button class="btn btn-primary my-2">儲存</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { useProductsStore } from "../stores/products";
    import { mapState } from "pinia";
    export default {
        data(){
            return{
                searchItem:'',
                selectedWeightNum:'',
                selectedWeight:'',
                selecteditemPrice:'',
                selectedProduct:'',
                selectdInfo:'',
                cartList:[],
                cartListPrice:[],
                totalPrice:''
            }
        },
        methods:{
            search(){
                this.selectedProduct = this.products.find((item)=>item.name === this.searchItem);
                console.log(this.selectedProduct);
                const priceOfWeight = this.selectedProduct.prices.find((item)=>item.weight === this.selectedWeight).price;
                this.selecteditemPrice = priceOfWeight*this.selectedWeightNum;
                console.log(this.selecteditemPrice);
                this.selectdInfo = `${this.selectedProduct.name}${this.selectedWeightNum}${this.selectedWeight}${this.selecteditemPrice}`;
                this.cartListPrice.push(this.selecteditemPrice);
            },
            putIntoCart(){
                this.cartList.push(this.selectdInfo);
                this.totalPrice = this.cartListPrice.reduce((a,b)=>a+b,0);
                console.log(this.totalPrice);
            }
        },
        computed:{
            ...mapState(useProductsStore,['products'])
        }
    }
</script>
