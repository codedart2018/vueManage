<template>
    <div class="wrap">
        <p class="shine">呃，一溜烟不知道开到哪儿去了</p>
        <p class="go-back" @click="goBack">返回上一页</p>
    </div>
</template>

<style>
    body {
        background-color: #fff;
    }
</style>
<style src="../../assets/style/common/404.less" lang="less" scoped></style>

<script>
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
        methods: {
            goBack() {
                window.history.go(-1)
            }
        },
        components: {}
    }
</script>
