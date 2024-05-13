<template>
    <div class="row">
        <div class="col-md-4 col-12">
            <h2>顧客資料</h2>
            <p>姓名</p><input type="text" name="" id="" class="form-control my-2">
            <p>電話</p><input type="text" name="" id="" class="form-control my-2">
            <p>品項</p>
            <input type="text" class="form-control my-2" />
            <p>重量</p>
            <input type="number" class="form-control my-2" />
            <p>單位</p>
            <select name="" id="" class="form-select my-2">
                <option value="">斤</option>
                <option value="">兩</option>
                <option value="">錢</option>
            </select>
            <button class="btn btn-primary my-2">計算</button>
            <p>計算結果</p>
            <button class="btn btn-primary">確定</button>
        </div>
        <div class="col-md-8 col-12">
            <h1>藥單</h1>
            <div class="content">
            </div>
            <div class="total col-3">
                <p>總金額:</p>
                <p>確認總金額:</p><input type="number" name="" id="" class="form-control">
                <button class="btn btn-primary my-2">儲存</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {}
</script>
