<template>
    <div class="row">
        <div class="col-3">
            <form>
                <input type="text" class="form-control my-3" v-model="cusPhone" placeholder="輸入手機號碼" required>
                <input type="submit" class="btn btn-primary me-3" value="查詢" @click="search">
                <input type="button" class="btn btn-primary" value="清除" @click="clean">
            </form>
        </div>
        <div class="col-3">
            <h2>藥單內容</h2>
            <div v-if="hasSearched">
                <p>
                    {{ searchResult.name }}
                </p>
                <p>
                    藥單名稱：{{ searchResult.presName }}
                </p>
                <p>
                    藥單內容：{{ searchResult.presContent[0].content }}
                </p>
                <p>
                    總金額：{{ searchResult.totalPrice }}
                </p>
                <p>
                    結帳金額：{{ searchResult.finalPrice }}
                </p>
                <p>
                    日期：{{ searchResult.date }}
                </p>
                <button class="btn btn-primary" @click="deleteCus">刪除</button>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref } from "vue";
    import Swal from 'sweetalert2';
    import { useProductsStore } from "../stores/products.js";
    import { deleteCustomer } from '@/stores/firebase.js';
    const cusPhone = ref();
    const hasSearched = ref(false);
    const store = useProductsStore();
    const searchResult = ref();

    const search = async(e) => {
        e.preventDefault();
        searchResult.value = await store.searchCus(cusPhone.value);
        console.log(searchResult.value);
        hasSearched.value = true;
    }

    const clean = () => {
        hasSearched.value = false;
        cusPhone.value = '';
    }

    const deleteCus = () => {
        deleteCustomer(cusPhone.value);
        Swal.fire({
            text: '已刪除',
        });
        hasSearched.value = false;
        cusPhone.value = '';
    }

</script>