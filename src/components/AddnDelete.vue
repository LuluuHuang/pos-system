<template>
    <div class="row">
        <div class="col-6">
        <h2>新增商品</h2>
        <p>品名</p>
        <input 
            type="text" 
            class="form-control my-2" 
            v-model="newProductName" 
        />
        <p>價錢</p>
        <input
            type="number"
            name=""
            id=""
            class="form-control my-2"
            v-model.number="newProductPricePerJin"
        />
        <div>元/斤</div>
        <input
            type="number"
            name=""
            id=""
            class="form-control my-2"
            v-model.number="newProductPricePerLiang"
        />
        <div>元/兩</div>
        <input
            type="number"
            name=""
            id=""
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
        <button class="btn btn-primary" @click="store.deleteProduct()">確定刪除</button>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useProductsStore } from '../stores/products'
// import { mapActions, mapState } from "pinia";
const store = useProductsStore()
// export default{
//     computed:{
//         ...mapState(products,['products','searchItem','currentProduct'])
//     },
//     methods:{
//         ...mapActions(products,['search'])
//     }
// }
//本地新增商品狀態
const newProductName = ref('')
const newProductPricePerJin = ref()
const newProductPricePerLiang = ref()
const newProductPricePerQian = ref()
const add = () => {
    const newProduct = {
        name: newProductName.value,
        prices: [
            { weight: '斤', price: newProductPricePerJin.value },
            { weight: '兩', price: newProductPricePerLiang.value },
            { weight: '錢', price: newProductPricePerQian.value }
        ]
    }
    store.addProduct(newProduct)
    console.log('add!');
    newProductName.value = '';
    newProductPricePerJin.value = '';
    newProductPricePerLiang.value = '';
    newProductPricePerQian.value = '';
}
</script>
