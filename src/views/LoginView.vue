<template>
<div class="row d-flex justify-content-center align-items-center flex-column">
    <div class="col-6">
        <p>ＨＥＬＬＯ！請先登入或註冊</p>
    </div>
    <div class="col-6 border border-1 p-3 rounded content">
        <ul class="nav nav-tabs col-12 pt-3" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="reg-tab" data-bs-toggle="tab" data-bs-target="#reg" type="button" role="tab" aria-controls="reg" aria-selected="true">註冊</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="login-tab" data-bs-toggle="tab" data-bs-target="#login" type="button" role="tab" aria-controls="login" aria-selected="false">登入</button>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="reg" role="tabpanel" aria-labelledby="reg-tab">
                <div class="col-12 pt-3">
                <input class="form-control" type="text" name="" id="" v-model="regAccount">
                <br>
                <input class="form-control" type="text" name="" id="" v-model="regPassword">
                <br>
                <button type="button" class="btn btn-primary" @click="reg">註冊</button>
                </div>
            </div>
            <div class="tab-pane fade" id="login" role="tabpanel" aria-labelledby="login-tab">
                <div class="col-12 pt-3">
                <input class="form-control" type="text" name="" id="" v-model="loginAccount">
                <br>
                <input class="form-control" type="text" name="" id="" v-model="loginPassword">
                <br>
                <button type="button" class="btn btn-primary" @click="login">登入</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { auth } from '@/stores/firebase.js';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const regAccount = ref('');
const regPassword = ref('');
const loginAccount = ref('');
const loginPassword = ref('');
const router = useRouter();

function reg(){
createUserWithEmailAndPassword(auth,regAccount.value,regPassword.value)
.then(
    ()=>{
    console.log('註冊成功');
    router.push('/homepage');
    }
)
}

function login(){
signInWithEmailAndPassword(auth,loginAccount.value,loginPassword.value)
.then(
    ()=>{
    console.log('登入成功');
    router.push('/homepage');
    }
)
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