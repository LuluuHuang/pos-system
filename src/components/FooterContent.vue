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
        const month = now.getMonth() + 1; // 月份从0开始，需要加1
        const date = now.getDate();
        const hours = now.getHours()
        const minutes = now.getMinutes()
        const seconds = now.getSeconds()

        // 格式化时间
        this.currentTime = `${year}年${month}月${date}日 ${hours}:${minutes}:${seconds}`
        }
    },
    created() {
        // 在组件创建时调用获取当前时间的方法
        this.getCurrentTime()

        // 每秒钟更新一次时间
        setInterval(() => {
        this.getCurrentTime()
        }, 1000)
    }
}
</script>

<template>
    <div class="container-fluid">
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