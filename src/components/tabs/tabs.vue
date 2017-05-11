<template>
    <div class="tab-container">
        <ul class="tab-box">
            <li :class="{ active: current == i }" @click="toggle(i)" v-for="(tab, i) in tabList">{{ tab.title }}</li>
        </ul>
        <div class="tpl-box">
            <slot></slot>
        </div>
    </div>
</template>
<style>
    .tab-container{
        display: flex;
        width: 100%;
        overflow-y: auto;
    }
    .tab-container .tab-box {
        width: 90px;
        height: 100%;
        background: #23b7e5;
    }
    .tab-container .tab-box li{
        text-align: center;
        font-size: 14px;
        padding: 13px 8px;
        color: white;
        font-weight: 400;
        cursor: pointer;
    }
    .tab-container .tab-box li.active, .tab-container .tab-box li:hover{
        color: #fff;
        background-color: #4c4342;
        text-decoration: none;
    }
    .tab-container .tpl-box {
        flex: 1;
        overflow-y: scroll;
    }
    .tab-container .tpl-box li {
        background: #FFF;
        border-bottom: 1px dotted #dedede;
        padding: 15px 10px;
        cursor: pointer;
        animation: fade-translate-03 250ms backwards;
    }
    .tab-container .tpl-box li:hover{
        background-color:#d9d9d9;
    }
</style>
<script>

    export default{
    	//props
        props: ['active'],
        //data
        data() {
            return {
                tabList: [],
                current: 0
            }
        },
        //方法
        methods: {
            toggle: function(index) {
                this.current = index;
            }
        },
        //创建
        created() {
            this.current = this.active;
        },
        //挂载
        mounted() {
            this.tabList = this.$children.map(function(i) {
                return {
                    title: i.title
                }
            });
        }
    }
</script>
