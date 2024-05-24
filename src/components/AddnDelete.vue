<template>
    <div class="row">
        <div class="col-6">
            <h2>新增商品</h2>
            <p>品名</p>
            <input type="text" class="form-control my-2">
            <p>價錢</p>
            <input type="number" name="" id="" class="form-control my-2">
            <div>元/斤</div>
            <input type="number" name="" id="" class="form-control my-2">
            <div>元/兩</div>
            <input type="number" name="" id="" class="form-control my-2">
            <div>元/錢</div>
            <br>
            <button class="btn btn-primary">確定新增</button>
        </div>
        <div class="col-6">
            <h2>刪除商品</h2>
            <p>品名</p>
            <input type="text" class="form-control my-2" v-model="searchItem">
            <button class="btn btn-primary" @click="search">查詢</button>
            <p>商品內容</p>
            <p>{{currentProduct}}</p>
            <button class="btn btn-primary">確定刪除</button>
        </div>
    </div>
</template>
<script>
import  products  from "../stores/products";
import { mapActions, mapState } from "pinia";
export default{
    computed:{
        ...mapState(products,['products','searchItem','currentProduct'])
    },
    methods:{
        ...mapActions(products,['search'])
    }
}
</script>
