<template>
<div class="row d-flex justify-content-center align-items-center flex-column">
    <div class="col-6">
        <p>HELLO！請先登入或註冊</p>
    </div>
    <div class="col-6 border border-1 p-3 rounded content">
        <ul class="nav nav-tabs col-12 pt-3" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="login-tab" data-bs-toggle="tab" data-bs-target="#login" type="button" role="tab" aria-controls="login" aria-selected="false">登入</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="reg-tab" data-bs-toggle="tab" data-bs-target="#reg" type="button" role="tab" aria-controls="reg" aria-selected="true">註冊</button>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div  class="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
                <div class="col-12 pt-3">
                <input class="form-control" type="text" v-model="loginAccount">
                <br>
                <input class="form-control" type="password" v-model="loginPassword">
                <br>
                <button type="button" class="btn btn-primary" @click="login">登入</button>
                </div>
            </div>
            <div class="tab-pane fade"  id="reg" role="tabpanel" aria-labelledby="reg-tab">
                <div class="col-12 pt-3">
                <input class="form-control" type="text" v-model="regAccount">
                <br>
                <input class="form-control" type="password" v-model="regPassword">
                <br>
                <button type="button" class="btn btn-primary" @click="reg">註冊</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';
import Swal from 'sweetalert2';

const regAccount = ref('');
const regPassword = ref('');
const loginAccount = ref('');
const loginPassword = ref('');
const router = useRouter();
const store = useUserStore();

const login = async() => {
    try{
        await store.login(loginAccount.value,loginPassword.value);
        router.push('/main/search');
    }
    catch(error){
        Swal.fire({
            text: '登入失敗',
        });
        loginAccount.value = '';
        loginPassword.value = '';
    }
}

const reg = async() => {
    try{
        await store.register(regAccount.value,regPassword.value);
        Swal.fire({
            text: '註冊成功,請重新登入',
        });
        regAccount.value = '';
        regPassword.value = '';
    }
    catch(error){
        Swal.fire({
            text: '註冊失敗',
        });
        regAccount.value = '';
        regPassword.value = '';
    }
}


</script>

<style lang="css">
    .row{
        height: 100vh;
        background-color: rgb(255, 255, 255);
    }
    .content{
        background-color: aliceblue;
    }
</style>