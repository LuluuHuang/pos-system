<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <router-link to="/" class="navbar-brand">首頁</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
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
            </div>
        </div>
    </nav>
</template>