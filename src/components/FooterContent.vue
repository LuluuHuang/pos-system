<script>
export default {
    data() {
        return {
        currentTime: ''
        }
    },
    methods: {
        getCurrentTime() {
        const now = new Date()
        const year = now.getFullYear();
        const month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1
        const date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
        const hours = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
        const minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
        const seconds = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()

        // 格式化时间
        this.currentTime = `${year}年${month}月${date}日 ${hours}:${minutes}:${seconds}`
        }
    },
    created() {
        // 在组件创建时调用获取当前时间的方法
        this.getCurrentTime()

        // 每秒更新一次时间
        setInterval(() => {
        this.getCurrentTime()
        }, 1000)
    }
}
</script>

<template>
    <div class="container-fluid footer">
        <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div class="col-md-4 d-flex align-items-center">
                <span class="text-muted">&copy; 2024 LuluHuang</span>
            </div>
            <div class="nav col-md-4 justify-content-end list-unstyled d-flex">
                {{ currentTime }}
            </div>
        </footer>
    </div>
</template>