<template>
    <div class="row">
        <div class="col-lg-4 col-md-6 col-12 p-4">
            <h2>查詢價格</h2>
            <form @submit.prevent="search">
                <input type="text" v-model="searchItem" class="form-control my-3" placeholder="輸入品項名稱" required>
                <button type="submit" class="btn btn-primary me-3">查詢</button>
                <button type="reset" class="btn btn-primary" @click="clean">清除</button>
            </form>
        </div>
        <div class="col-lg-4 col-md-6 col-12 p-4" >
            <h2>現今價格</h2>
            <form @submit.prevent="updatePrice">
                <div class="input-group mb-3">
                    <input type="number" class="form-control" v-model="purchasePrice">
                    <span class="input-group-text">/斤（進價）</span>
                </div>
                <div class="input-group mb-3">
                    <input type="number" class="form-control" v-model="priceJin">
                    <span class="input-group-text">/斤</span>
                </div>
                <div class="input-group mb-3">
                    <input type="number" class="form-control" v-model="priceLiang">
                    <span class="input-group-text">/兩</span>
                </div>
                <div class="input-group mb-3">
                    <input type="number" class="form-control" v-model="priceQian">
                    <span class="input-group-text">/錢</span>
                </div>
                <input type="submit" class="btn btn-primary" value="更新">
            </form>
        </div>
        <div class="col-lg-4 col-md-6 col-12 p-4">
            <h2>歷史價格</h2>
            <div v-if="hasSearched">        
                <div v-if="searchResult.history.length === 0">
                    <p>尚無歷史價格</p>
                </div>
                <div v-else>
                    <p>{{ searchResult.history.date }}</p>
                    <p>進價：{{ searchResult.history.purchasePrice }} /斤</p>
                    <p>售價：</p>
                    <ul>
                        <li v-for="(item, i) in searchResult.history.prices" :key="i">
                            {{ item.price }} /{{ item.weight }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import Swal from 'sweetalert2';
    import { useProductsStore } from "../stores/products.js";
    import { getID, updateData }from '@/stores/firebase.js';
    import { updateDoc } from "firebase/firestore";
    const store = useProductsStore();
    const purchasePrice = ref();
    const priceJin = ref();
    const priceLiang = ref();
    const priceQian = ref();
    const productID = ref();
    const newPrice = ref({});
    const searchItem = ref();
    const searchResult = ref();
    const hasSearched = ref(false);

    const search = async(item) => {
        console.log('123',item);
        
        console.log(searchItem.value);
        searchResult.value = await store.search(searchItem.value);
        console.log(searchResult.value);
        purchasePrice.value = searchResult.value.purchasePrice;
        priceJin.value = searchResult.value.prices[0].price;
        priceLiang.value = searchResult.value.prices[1].price;
        priceQian.value = searchResult.value.prices[2].price;
        hasSearched.value = true;
    }

    const clean = () => {
        searchItem.value = '';
        priceJin.value = '';
        priceLiang.value = '';
        priceQian.value = '';
        purchasePrice.value = '';
        hasSearched.value = false;
    }
    
    //更新價格
    const updatePrice = async() => {
        productID.value = await getID(searchResult.value.name);
        console.log(productID.value);
        newPrice.value = {
            date:store.getCurrentTime(),
            purchasePrice:purchasePrice.value,
            prices:[
                { weight:'斤', price:priceJin.value },
                { weight:'兩', price:priceLiang.value },
                { weight:'錢', price:priceQian.value },
            ],
            history:{
                purchasePrice:searchResult.value.purchasePrice,
                date:searchResult.value.date,
                prices:searchResult.value.prices
            }
        }
        Swal.fire({
            text: '已更新',
        });
        updateDoc(updateData(productID.value),newPrice.value,{merge:true});
        search(123);
    }
</script>