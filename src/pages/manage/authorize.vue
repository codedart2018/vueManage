<style src="../../assets/style/manage/authorize.less" lang="less" scoped></style>
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

                                        <tr class="ng-scope" v-for="(item, index) in rule">
                                            <td class="col-td-1"><Icon type="network"></Icon></i>&nbsp;{{item.name}}</td>
                                            <td class="col-td-2">
                                                <label class="checkbox-inline">
                                                    <Checkbox
                                                        :indeterminate="item.status"
                                                        :value="item.select"
                                                        @click.prevent.native="handleCheckAll(index)">全选</Checkbox>
                                                </label>
                                            </td>
                                            <td>
                                                <Checkbox v-for="(child, key) in item.children" :value="item.children[key].select" @on-change="changeData(index, key)">
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
                indeterminate: true,
                checkAll: false,
                checkAllGroup: ['香蕉', '西瓜'],

                rule: [
                    {
                        id: 1,
                        name: '角色权限',
                        status: true,
                        select: false,
                        children: [
                            {
                                id: 11,
                                name: '权限节点',
                                select: true
                            },
                            {
                                id: 12,
                                name: '添加',
                                select: false
                            },{
                                id: 13,
                                name: '修改节点',
                                select: false
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
                this.rule[index].children[key].select = !this.rule[index].children[key].select
            },
            handleCheckAll (index) {
                if (this.rule[index].status) {
                    this.rule[index].select = false
                    this.reversal(index, false)
                } else {
                    this.rule[index].select = !this.rule[index].select
                    this.reversal(index, true)
                }
                this.rule[index].status = false;

                if (this.rule[index].select) {
                    this.checkAllGroup = ['香蕉', '苹果', '西瓜'];
                } else {
                    this.checkAllGroup = [];
                }
            },
            //反转
            reversal(index, select) {
                for (let [key, item] of new Map(this.rule[index].children.map((item, i) => [i, item]))) {
                    if(select) {

                    }
                    item.select = select
                }
            }
        },
        mounted() {

        },
        components: {}
    }
</script>
