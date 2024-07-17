<template>
    <div class="row">
        <div class="col-md-3 col-12 pt-3">
            <h2>計算</h2>
            <p>品項</p>
            <input type="text" class="form-control my-2" v-model="store.searchItem"/>
            <p>重量</p>
            <input type="number" class="form-control my-2" v-model="selectedWeightNum">
            <p>單位</p>
            <select name="" id="" class="form-select my-2" v-model="selectedWeight">
                <option value="斤">斤</option>
                <option value="兩">兩</option>
                <option value="錢">錢</option>
            </select>
            <button class="btn btn-primary my-2" @click.prevent="calculate()">計算</button>
            <p>計算結果</p>
            <p>{{selectdInfo.content}}</p>
            <button class="btn btn-primary" @click="putIntoCart()">確定</button>
        </div>
        <div class="col-md-9 col-12 pt-3">
            <form action="" class="row">
                <div class="col-md-6 col-12 pt-md-0 pt-3">
                    <h2>藥單</h2>
                    <ul v-for="(item) in cartList" :key="item.id">
                        <li>{{item.content}}</li>
                    </ul>
                    <div class="content">
                    </div>
                    <div class="total">
                        <p>總金額:{{totalPrice}}</p>
                        <p>確認總金額:</p>
                        <input type="number" name="" id="" class="form-control" v-model="finalPrice" required>
                    </div>
                </div>
                <div class="col-md-6 col-12 pt-md-0 pt-3">
                    <h2>顧客資料</h2>
                    <p>姓名</p>
                    <input type="text" name="" id="" class="form-control my-2" v-model="cusName" required>
                    <p>電話</p>
                    <input type="text" name="" id="" class="form-control my-2" v-model="cusPhone" required>
                    <p>藥單名稱</p>
                    <input type="text" name="" id="" class="form-control my-2" v-model="presName" required>
                    <input class="btn btn-primary" type="submit" value="儲存" @click="putIntoCusData">
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
    import { ref,onMounted } from "vue";
    import { useProductsStore } from "../stores/products.js";
    import { addDoc } from 'firebase/firestore';
    import { addCus } from '@/stores/firebase.js';


    const store = useProductsStore();
    const selectedProduct = ref('');
    const selectedWeightNum = ref();
    const selectedWeight = ref();
    const selecteditemPrice = ref();
    const selectdInfo = ref('');
    const cartListPrice = ref([]);
    const cartList = ref([]);
    const totalPrice = ref();
    const finalPrice = ref();
    const cusName = ref('');
    const cusPhone = ref('');
    const presName = ref('');
    onMounted(() => {
        store.getProduct();
    });
    const calculate = () =>{
        selectedProduct.value = store.products.find((item)=>item.name === store.searchItem);
        const priceOfWeight = selectedProduct.value.prices.find((item)=>item.weight === selectedWeight.value).price;
        selecteditemPrice.value = priceOfWeight*selectedWeightNum.value;
        selectdInfo.value = {
            content:`${selectedProduct.value.name}${selectedWeightNum.value}${selectedWeight.value}${selecteditemPrice.value}`,
            id:new Date().getTime()
        }
        cartListPrice.value.push(selecteditemPrice.value);
    }
    const putIntoCart = () => {
        cartList.value.push(selectdInfo.value);
        totalPrice.value = cartListPrice.value.reduce((a,b)=>a+b,0);
    }

    const putIntoCusData = (e) => {
        e.preventDefault();
        const cusData = {
            name:cusName.value,
            phone:cusPhone.value,
            presName:presName.value,
            presContent:cartList.value,
            totalPrice:totalPrice.value,
            finalPrice:finalPrice.value
        }
        addDoc(addCus(),cusData);
    }
</script>
