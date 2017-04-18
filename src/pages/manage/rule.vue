<template>
    <div>
        <Row class="mb-15">
            <Col span="12">
            <Button type="success"><Icon type="plus-round"></Icon>&nbsp;成功按钮</Button>
            </Col>
            <Col span="12">col-12</Col>
        </Row>
        <Row class="mb-15">
            <Table border :columns="columns4" :data="data1"></Table>
        </Row>
        <Row type="flex" justify="end">
            <Page :total="1000" :page-size=15 :page-size-opts="[15, 30, 45, 60]" show-total show-sizer show-sizer show-elevator></Page>
        </Row>
    </div>
</template>
<style scoped>
    .mb-15 {
        margin-bottom: 15px;
    }

</style>

<script>
    export default {
        data () {
            return {
                columns4: [
                    {
                        type: 'selection',
                        width: 50,
                        align: 'center'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: 'PATH',
                        key: 'name'
                    },
                    {
                        title: 'URL',
                        key: 'url'
                    },
                    {
                        title: '左侧菜单',
                        key: 'address'
                    },
                    {
                        title: '是否显示',
                        key: 'display',
                        width: 120,
                        align: 'center',
                        render (row) {
                            const color = row.display == 1 ? 'green' : 'red';
                            const text = row.display == 1 ? '显示' : '隐藏';
                            return `<tag type="dot" color="${color}">${text}</tag>`;
                        }
                    },
                    {
                        title: '节点认证',
                        key: 'auth',
                        width: 120,
                        align: 'center',
                        render (row) {
                            const color = row.auth == 1 ? 'green' : 'red';
                            const text = row.auth == 1 ? '认证' : '拒绝';
                            return `<tag type="dot" color="${color}">${text}</tag>`;
                        }
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width: 120,
                        align: 'center',
                        render (row) {
                            const color = row.status == 1 ? 'green' : 'red';
                            const text = row.status == 1 ? '正常' : '锁定';
                            return `<tag type="dot" color="${color}">${text}</tag>`;
                        }
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        width: 120,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="show(${index})">查看</i-button> <i-button type="error" size="small" @click="remove(${index})">删除</i-button>`;
                        }
                    }
                ],
                data1: [
                    {
                        name: '角色权限',
                        url: '/api/manage/auth',
                        path: 'auth',
                        address: '北京市朝阳区芍药居',
                        display: 2,
                        status: 1,
                        auth: 1
                    },
                    {
                        name: '权限节点',
                        url: '/api/manage/rule',
                        path: 'rule',
                        address: '北京市海淀区西二旗',
                        display: 1,
                        status: 2,
                        auth: 0
                    }
                ]
            }
        }
    }
</script>
