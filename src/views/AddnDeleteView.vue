<template>
    <div class="row">
        <div class="col-md-6 col-12 mt-3">
        <h2>新增商品</h2>
        <p>品名</p>
        <input 
            type="text" 
            class="form-control my-2" 
            v-model="productName"
            required
        />
        <form>
            <p>價錢</p>
            <div class="input-group mb-3">
                <input type="number" class="form-control" v-model="purchasePrice" required>
                <span class="input-group-text">/斤（進價）</span>
            </div>
            <div class="input-group mb-3">
                <input type="number" class="form-control" v-model="priceJin" required>
                <span class="input-group-text">/斤</span>
            </div>
            <div class="input-group mb-3">
                <input type="number" class="form-control" v-model="priceLiang" required>
                <span class="input-group-text">/兩</span>
            </div>
            <div class="input-group mb-3">
                <input type="number" class="form-control" v-model="priceQian" required>
                <span class="input-group-text">/錢</span>
            </div>
            <input type="submit" class="btn btn-primary" value="確定新增" @click="add">
        </form>
        </div>
        <div class="col-md-6 col-12 mt-3">
        <h2>刪除商品</h2>
        <p>品名</p>
        <form @submit.prevent="search">
            <input type="text" class="form-control my-2" v-model="searchItem" required/>
            <input type="submit" class="btn btn-primary" value="查詢">    
        </form>
        <div v-if="searchResult">
            <p>進價：</p>
            <p>{{ searchResult.name }}/斤</p>
            <p>售價：</p>
            <p v-for="(item, i) in searchResult.prices" :key="i">
                {{ item.price }}/{{ item.weight }}
            </p>
        </div>
        <div v-else>
            <p>無此商品</p>
        </div>
        <button class="btn btn-primary" @click="deleteBtn">確定刪除</button>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useProductsStore } from '../stores/products';
import { deleteProduct, colPro } from '@/stores/firebase.js';
import { addDoc } from 'firebase/firestore';
const store = useProductsStore();
const productName = ref('');
const purchasePrice = ref();
const priceJin = ref();
const priceLiang = ref();
const priceQian = ref();
const productContent = ref({});
const searchItem = ref('');
const searchResult = ref([]);
const hasSearched = ref(false);

const add = () => {
    productContent.value = {
        name: productName.value,
        date: store.getCurrentTime(),
        purchasePrice: purchasePrice.value,
        prices: [
            { weight: '斤', price: priceJin.value },
            { weight: '兩', price: priceLiang.value },
            { weight: '錢', price: priceQian.value }
        ]
        //新增history:[]
    }
    addDoc(colPro,productContent.value)
    .then((res)=>{
        console.log(res.id);
    })
    productName.value = '';
    priceJin.value = '';
    priceLiang.value = '';
    priceQian.value = '';
    purchasePrice.value = '';
    alert('已新增');
}

const search = async() => {
    try {
        searchResult.value = await store.search(searchItem.value);
        console.log(searchResult.value);
        console.log(searchResult.value.name);
        console.log(searchResult.value.prices);
        hasSearched.value = true;
    } catch (error) {
        console.error('Error during search:', error);
    }
}

const deleteBtn = () => {
    deleteProduct(searchItem.value);
    alert('已刪除');
    searchItem.value = '';
}
</script>
