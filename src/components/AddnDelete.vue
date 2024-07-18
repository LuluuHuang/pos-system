<template>
    <div class="row">
        <div class="col-6">
        <h2>新增商品</h2>
        <p>品名</p>
        <input 
            type="text" 
            class="form-control my-2" 
            v-model="newProductName"
            required
        />
        <p>價錢</p>
        <input
            type="number"
            class="form-control my-2"
            v-model.number="newProductPricePerJin"
        />
        <div>元/斤</div>
        <input
            type="number"
            class="form-control my-2"
            v-model.number="newProductPricePerLiang"
        />
        <div>元/兩</div>
        <input
            type="number"
            class="form-control my-2"
            v-model.number="newProductPricePerQian"
        />
        <div>元/錢</div>
        <br />
        <button class="btn btn-primary" @click="add">確定新增</button>
        </div>
        <div class="col-6">
        <h2>刪除商品</h2>
        <p>品名</p>
        <input type="text" class="form-control my-2" v-model="store.searchItem" />
        <button class="btn btn-primary" @click="store.search()">查詢</button>
        <p>商品內容</p>
        <div v-if="store.currentProduct">
            <p>{{ store.currentProduct.name }}</p>
            <p v-for="(item, i) in store.currentProduct.prices" :key="i">
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
const newProductName = ref('')
const newProductPricePerJin = ref()
const newProductPricePerLiang = ref()
const newProductPricePerQian = ref()
const productContent = ref({})

const add = () => {
    productContent.value = {
        name: newProductName.value,
        date: store.getCurrentTime(),
        prices: [
            { weight: '斤', price: newProductPricePerJin.value },
            { weight: '兩', price: newProductPricePerLiang.value },
            { weight: '錢', price: newProductPricePerQian.value }
        ]
    }
    addDoc(colPro,productContent.value)
    .then((res)=>{
        console.log(res.id);
    })
    newProductName.value = '';
    newProductPricePerJin.value = '';
    newProductPricePerLiang.value = '';
    newProductPricePerQian.value = '';
    alert('已新增');
}

const deleteBtn = () => {
    deleteProduct(store.searchItem);
    alert('已刪除');
    store.searchItem = '';
    store.currentProduct = '';
}
</script>
