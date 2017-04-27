<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <h2>这个页面是我写测试用的</h2>
        <div class="ht">
            <router-link to="/login/"><h1>管理中心入口</h1></router-link>
            <router-link to="/state">State</router-link>
            组件点击事件
            <my-button @click.native="buttonClick"></my-button>
        </div>
        去除前后空格
        <input type="text" v-model.trim="content">
        <input type="text" v-model = 'content'>
        中奖 过滤器
        <p v-for='tel in telephone'>{{tel | filterPhone}}</p>
        List
        <ul>
            <li v-for="(item, index) in memberList" @click="memberDetail(item.id)">
                <span>{{item.name}}</span>
                <span>{{item.age}}</span>
                <span>{{item.birthday}}</span>
                <span>{{item.id}}</span>
            </li>
        </ul>
        Template 多层嵌套
        <template v-for="item in memberList">
            <p>{{item.name}}</p>
            <p>{{item.age}}</p>
            <p>{{item.birthday}}</p>
        </template>
        //组件传递数据
        {{name}}
        <my-article v-for="(item, index) in artList" :art-list="item" :name="name"></my-article>
        <button @click='push'>添加文章</button>
        <button @click='pop'>尾部去除一篇文章</button>
        <button @click='unshift'>在头部加入一条数据</button>
        <button @click='shift'>在头部去除一条数据</button>
        <button @click='reverse'>把所有数据进行反转</button>
        <button @click='clear'>清除所有数据</button>
        数组非变异
        <ul>
            <li v-for="(item, index) in list" v-text="`${item} - ${index}`"></li>
        </ul>
        <button @click="arrayFilter">数组取余过滤</button>
        <button @click="arrayConcat">数组合并</button>
        <button @click="arrayMap">数组映射</button>
        <button @click="arraySlice">返回截取后的数组</button>
        <button @click="changeValue">改变数组下标值</button>
        <ul>
            <li v-for="(item, index) in reComputed" v-text="`${item} - ${index}`"></li>
        </ul>
        <button @click="randomList">随机重置数组的值</button>
    </div>
</template>

<script>

    import myButton from './Button.vue'
    import myArticle from "../test/list.vue"

    import Vue from 'vue'

    export default {
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                content: '',
                list: [
                   1, 2, 3, 4
                ],
                list1: [
                    9, 10, 11, 13
                ],
                telephone: [
                    10000000000,
                    10000000001,
                    10000000002
                ],
                memberList: [
                    {
                        name: 'zs', age: 20, birthday: '2011-10-11', id: 1
                    },
                    {
                        name: 'ls', age: 22, birthday: '2001-10-09', id: 2
                    }
                ],
                artList : [],
                name: 999998828382099
            }
        },
        created () {
            this.artList = [
                {name : 'ziksang1' , startTime : '1小时前' , content:'aaaaaaaaa',good : 1},
                {name : 'ziksang2' , startTime : '2小时前' , content:'bbbbbbbbb',good : 2},
                {name : 'ziksang3' , startTime : '3小时前' , content:'ccccccccc',good : 3},
                {name : 'ziksang4' , startTime : '4小时前' , content:'ddddddddd',good : 4}
            ]
        },
        //计算
        computed: {
            reComputed() {
                return this.list.filter(item => {
                    return item % 2
                })
            }
        },
        components: {
            myButton,
            myArticle
        },
        methods: {
            buttonClick() {
                alert(333)
            },
            memberDetail(id) {
                sessionStorage.id = id
            },
            push() {
                this.artList.push({
                    name: 'hello', startTime: '刚刚', content: 'hahaha', good: 5
                })
            },
            pop() {
                this.artList.pop()
            },
            shift() {
                this.artList.shift()
            },
            unshift() {
                this.artList.unshift({
                    name: 'gogo', startTime: '1秒前', content: 'hengheng', good: 0
                })
            },
            reverse() {
                this.artList.reverse()
            },
            clear() {
                this.artList = []
            },
            arrayFilter() {
                //filter(), 2.concat(), 3.slice(), 4.map() 必须重新赋值一次
                this.list = this.list.filter((item, index) => {
                    console.log(item, index)
                    return item % 2
                })
            },
            arrayConcat() {
                //es6 写法
                //this.list = [...this.list, ...this.list1]
                //传统写法
                this.list = this.list.concat(this.list1);
            },
            arrayMap() {
                this.list = this.list.map(item => {
                    return `${item} map`
                })
            },
            arraySlice() {
                this.list = this.list.splice(2)
            },
            changeValue() {
                //改变下标值 及数组长度 以下哪些可行 哪些不可靠
                //this.list[2] = 55 //行不通
                //通过vue set来改变 但是头部要引入vue
                //Vue.set(this.list, 2, 55)
                this.list.splice(1, 1, 90) //还是常用此种方法来改变
            },
            randomList() {
                this.list = this.list.map(item => {
                    return item + Math.round(Math.random() * 9 + 1)
                })
            }
        },
        filters: {
            filterPhone(value) {
                if(!value) return
                //获取后四位
                value = value.toString().substr(7, 4)
                // repeat 将一个字符串重复多少次
                value = '*'.repeat(7)+value
                let endNumber = value.substr(-1, 1)
                if(endNumber % 2 == 0) {
                    value = value + '中奖'
                } else {
                    value = value + '感谢参与'
                }
                return value
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .ht {
        height: 100px;
    }

</style>
