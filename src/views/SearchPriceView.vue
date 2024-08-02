<script setup>
    import { ref } from "vue";
    import { useProductsStore } from "../stores/products.js";
    import { getID, updateData }from '@/stores/firebase.js';
    import { setDoc } from "firebase/firestore";
    const store = useProductsStore();
    const priceJin = ref();
    const priceLiang = ref();
    const priceQian = ref();
    // const history = ref([]);
    const productID = ref();
    const newPrice = ref({});
    const searchItem = ref();
    const searchResult = ref();
    // const hasSearched = ref(false);


    const search = async(e) => {
        e.preventDefault();
        searchResult.value = await store.search(searchItem.value);
        console.log(searchResult.value.name);
        priceJin.value = searchResult.value.prices[0].price;
        priceLiang.value = searchResult.value.prices[1].price;
        priceQian.value = searchResult.value.prices[2].price;
    }

    const clean = () => {
        searchItem.value = '';
        priceJin.value = '';
        priceLiang.value = '';
        priceQian.value = '';
    }
    
    //更新價格
    const updatePrice = async(e) => {
        e.preventDefault();
        productID.value = await getID(searchResult.value.name);
        console.log(productID.value);
        newPrice.value = {
            date:store.getCurrentTime(),
            prices:[
                { weight:'斤', price:priceJin.value },
                { weight:'兩', price:priceLiang.value },
                { weight:'錢', price:priceQian.value },
            ]
        }
        setDoc(updateData(productID.value),newPrice.value,{merge:true});
    }

</script>
<template>
    <div class="row">
        <div class="col-lg-4 col-md-6 col-12 p-4">
            <h2>查詢價格</h2>
            <form>
                <input type="text" v-model="searchItem" class="form-control my-3" placeholder="輸入品項名稱" required>
                <input type="submit" class="btn btn-primary me-3" value="查詢" @click="search">
                <input type="button" class="btn btn-primary" value="清除" @click="clean">
            </form>
        </div>
        <div class="col-lg-4 col-md-6 col-12 p-4" >
            <h2>現今價格</h2>
            <!-- <p v-if="hasSearched">{{searchResult.value.name}}</p> -->
            <form>
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
                <input type="submit" class="btn btn-primary" value="更新" @click="updatePrice">
            </form>
        </div>
        <div class="col-lg-4 col-md-6 col-12 p-4">
            <h2>歷史價格</h2>
        </div>
        <!-- <div class="col-lg-3 col-md-6 col-12 p-4" v-if="store.hasSearched">
            <div v-if="store.currentProduct">
                <h4>{{store.currentProduct.name}}</h4>
                <ul v-for="(item,i) in store.currentProduct.prices" :key="i">
                    <li>{{item.price}}/{{item.weight}}</li>
                </ul>
            </div>
            <div v-else>
                <p>查無此商品</p>
            </div>
        </div>
        <div v-else></div> -->
    </div>
</template>
