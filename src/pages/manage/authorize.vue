<!--角色授权-->
<template>
    <div style="background:#eee;">
        <Card dis-hover>
            <p slot="title">角色授权分配</p>
            <Row>
                <Col span="24" class="mb-20">
                    <Row>
                        <Col span="22" push="2" class="col"><Input placeholder="请输入..." style="width: 300px"></Input></Col>
                        <Col span="2" pull="22" class="text-align-right col pr-20">分组名称</Col>
                    </Row>
                </Col>
                <Col span="24">
                    <Row>
                        <Col span="22" push="2" class="col">
                            <div style="width: 100%; height: 300px;">

                            </div>
                        </Col>
                        <Col span="2" pull="22" class="text-align-right col pr-20">权限分配</Col>
                    </Row>
                </Col>
                <Col span="24">col-12</Col>
            </Row>
            <div>角色授权</div>
            <Checkbox-group v-model="fruit">
                <Checkbox label="香蕉"></Checkbox>
                <Checkbox label="苹果"></Checkbox>
                <Checkbox label="西瓜"></Checkbox>
            </Checkbox-group>
            {{fruit}}
            <br/>
            <br/>
            <br/>
            <br/>
            <Checkbox v-for="(item, index) in abc" :value="abc[index].status" @on-change="changeData(index)">{{item.name}}</Checkbox>
            {{abc}}
        </Card>
    </div>
</template>
<style scoped>
    .col {
        height: 34px;
        line-height: 34px;
    }
    .pr-20 {
        padding-right: 20px;
    }
</style>
<script>


    export default{
        beforeCreate: function () {
            let id = this.$route.params.id
            if(!id) {
                this.$Message.info("授权角色ID不存在")
                setTimeout(() => {
                    this.$router.go(-1)
                }, 2000)
            }
            console.log('deviceid: ' + this.$route.params.id)
        },
        data(){
            return{
                fruit: ['苹果'],
                abc: [{
                    id: 1,
                    name: '苹果',
                    status: true
                },{
                    id: 2,
                    name: '西瓜',
                    status: false
                },{
                    id: 3,
                    name: '香焦',
                    status: true
                }]
            }
        },
        methods: {
            changeData(index) {
                this.abc[index].status = !this.abc[index].status
                console.log(index)
            }
        },
        mounted() {

        },
        components:{

        }
    }
</script>
