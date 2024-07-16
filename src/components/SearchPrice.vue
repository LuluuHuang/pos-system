<script setup>
    import { useProductsStore } from "../stores/products.js";
    const store = useProductsStore();
</script>
<template>
    <div class="row">
        <div class="col-lg-3 col-md-6 col-12 p-4">
            <h2>查詢價格</h2>
            <form>
                <input type="text" v-model="store.searchItem" class="form-control" placeholder="輸入品項名稱" required>
                <input type="submit" class="btn btn-primary me-3 mt-3" value="查詢" @click="store.search">
                <input type="button" class="btn btn-primary me-3 mt-3" value="清除" @click="store.clean">
            </form>
        </div>
        <div class="col-lg-3 col-md-6 col-12 p-4" v-if="store.hasSearched">
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
        <div v-else></div>
    </div>
</template>
