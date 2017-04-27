<style src="../../../assets/style/manage/authorize.less" lang="less" scoped></style>
<!--角色授权-->
<template>
    <div style="background:#eee;">
        <Card dis-hover>
            <p slot="title">角色授权分配</p>
            <Row>
                <Col span="24" class="mb-20">
                <Row>
                    <Col span="22" push="2" class="col">
                    <Input placeholder="请输入..." style="width: 300px"></Input></Col>
                    <Col span="2" pull="22" class="text-align-right col pr-20">
                    分组名称</Col>
                </Row>
                </Col>
                <Col span="24">
                    <Row>
                        <Col span="22" push="2">
                            <div class="rule-box">
                                <table class="table">
                                    <tbody>

                                        <tr class="ng-scope" v-for="(item, index) in rule" :key="item.id">
                                            <td class="col-td-1"><Icon type="network"></Icon></i>&nbsp;{{item.name}}</td>
                                            <td class="col-td-2">
                                                <label class="checkbox-inline">
                                                    <Checkbox
                                                        :indeterminate="item.status"
                                                        :value="item.select"
                                                        @click.prevent.native="checkAll(index)">全选</Checkbox>
                                                </label>
                                            </td>
                                            <td>
                                                <Checkbox v-for="(child, key) in item.children" :value="item.children[key].select" :key="item.id" @on-change="changeData(index, key)">
                                                    {{child.name}}
                                                </Checkbox>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </Col>
                        <Col span="2" pull="22" class="text-align-right col pr-20">权限分配</Col>
                    </Row>
                </Col>
                <Col span="24"> {{rule}} </Col>
            </Row>
        </Card>


    </div>
</template>

<script>

    export default{
        beforeCreate: function () {
            let id = this.$route.params.id
            if (!id) {
                this.$Message.info("授权角色ID不存在")
                setTimeout(() => {
                    this.$router.go(-1)
                }, 2000)
            }
            console.log('deviceid: ' + this.$route.params.id)
        },
        data(){
            return {
                rule: [
                    {
                        id: 1,
                        name: '角色权限',
                        status: false, //样式 全选择 false
                        select: true, //选择
                        children: [
                            {
                                id: 11,
                                name: '权限节点',
                                select: true
                            },
                            {
                                id: 12,
                                name: '添加',
                                select: true
                            },{
                                id: 13,
                                name: '修改节点',
                                select: true
                            },{
                                id: 14,
                                name: '删除节点',
                                select: true
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            changeData(index, key) {
                //反转
                this.rule[index].children[key].select = !this.rule[index].children[key].select
                //获取子菜单长度
                let len = this.rule[index].children.length
                let count = 0
                //判断
                let is = false //全选状态
                for(let item of this.rule[index].children) {
                    if(item.select == false){
                        count++
                        is = true //总有一个反选
                    }
                }
                if(is && count != len) {
                    this.rule[index].status = true;
                    this.rule[index].select = false;
                }else if(is && count == len){
                    this.rule[index].status = false;
                    this.rule[index].select = false;
                }else{
                    this.rule[index].status = false;
                    this.rule[index].select = true;
                }
            },
            //全不选 全选
            checkAll (index) {
                if (this.rule[index].status == false && this.rule[index].select == true) {
                    this.rule[index].status = false
                    this.rule[index].select = false
                    this.reversal(index, false)
                } else if(this.rule[index].status == false && this.rule[index].select == false) {
                    this.rule[index].status = false
                    this.rule[index].select = true
                    this.reversal(index, true)
                } else {
                    this.rule[index].status = false
                    this.rule[index].select = false
                    this.reversal(index, false)
                }

            },
            //反转所有
            reversal(index, select) {
                for(let item of this.rule[index].children) {
                    item.select = select
                }
            },
        },
        mounted() {

        },
        components: {}
    }
</script>
