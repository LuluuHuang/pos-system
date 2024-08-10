<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <router-link to="/home" class="navbar-brand">首頁</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse d-lg-flex justify-content-between " id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link to="/search" class="nav-link">查詢價格</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/prescription" class="nav-link">計算藥單</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/addndelete" class="nav-link">新增刪除</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/searchpres" class="nav-link">查詢藥單</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <button type="button" class="btn btn-primary" @click="logout">登出</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script setup>
    import { useUserStore } from '../stores/user';
    import { useRouter } from 'vue-router';
    const router = useRouter();
    const store = useUserStore();
    const logout = async() => {
        await store.logout();
        store.checkAuthState();
        router.push('/login');
        
    }
</script>