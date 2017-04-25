<template>
    <div>
        <Row class="mb-15">
            <Col span="18" class="search">
            <Form :model="formSearch" :label-width="80" inline label-position="right">
                <Form-item label="角色名称：">
                    <Input v-model="formSearch.keywords" placeholder="请输入节点名称关键词"></Input>
                </Form-item>
                <Form-item label="节点状态：">
                    <Select v-model="formSearch.status" placeholder="请选择">
                        <Option value="1">正常</Option>
                        <Option value="0">锁定</Option>
                        <Option value="-1">删除</Option>
                    </Select>
                </Form-item>
                <Form-item :label-width="1">
                    <Button type="primary" @click="search('formSearch')" class="a1">搜索</Button>
                </Form-item>
            </Form>
            </Col>
            <Col span="6" class="text-align-right">
            <Button type="primary" @click="addModal = true"><Icon type="plus-round"></Icon>&nbsp;添加角色</Button></Button>
            </Col>
        </Row>
        <Row class="mb-15">
            <Table :context="self" :columns="columns" :data="list"></Table>
        </Row>
        <Row type="flex" justify="end">
            <Page :total="total" :page-size="pageSize" show-total show-elevator @on-change="changePage"></Page>
        </Row>

        <!--添加 Modal 对话框-->
        <Modal v-model="addModal" title="添加角色" class-name="customize-modal-center" @on-cancel="modalCancel()">
            <div>
                <Form ref="addForm" :model="addForm" :rules="ruleValidate" :label-width="80">
                    <Form-item label="角色名称" prop="name">
                        <Input v-model="addForm.name" placeholder="请填写节点名称"></Input>
                    </Form-item>
                    <Form-item label="角色状态" prop="status">
                        <Radio-group v-model="addForm.status">
                            <Radio label="1">正常</Radio>
                            <Radio label="0">锁定</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="角色说明" prop="desc">
                        <Input v-model="addForm.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="节点简要说明..."></Input>
                    </Form-item>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" @click="addSubmit('addForm')">提交</Button>
                <Button type="ghost" @click="handleReset('addForm')" style="margin-left: 8px">重置</Button>
            </div>
        </Modal>

        <!--编辑 Modal 对话框-->
        <Modal v-model="editModal" class-name="customize-modal-center">
            <div slot="header" class="ivu-modal-header-inner">编辑权限节点</div>
            <div>
                <Form ref="editForm" :model="editForm" :rules="ruleValidate" :label-width="80">
                    <Form-item label="角色名称" prop="name">
                        <Input v-model="editForm.name" placeholder="请填写节点名称"></Input>
                    </Form-item>
                    <Form-item label="角色状态" prop="status">
                        <Radio-group v-model="editForm.status">
                            <Radio label="1">正常</Radio>
                            <Radio label="0">锁定</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="角色说明" prop="desc">
                        <Input v-model="editForm.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="角色说明..."></Input>
                    </Form-item>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" @click="editSubmit('editForm')">提交</Button>
                <Button type="ghost" @click="modalCancel()" style="margin-left: 8px">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<style scoped>
    .search .ivu-form-item {
        margin-bottom: 0px;
        vertical-align: top;
        zoom: 1;
    }
</style>


<script>

    export default {
        data () {
            //参数验证
            const validateParams = (rule, value, callback) => {
                if (value) {
                    let reg = /^[a-zA-Z]+[,]?[a-zA-Z]+$/;
                    if (!reg.test(value)) {
                        callback(new Error('路由参数只能英文半角逗号'));
                    }
                }
                callback();
            }
            //验证正整数 自带的 number integer 好像有问题
            const validateInt = (rule, value, callback) => {
                if(value) {
                    if(value > 9999) {
                        callback(new Error('最大排序数9999'));
                    }
                    let reg = /^[0-9]?[0-9]+$/;
                    if (!reg.test(value)) {
                        callback(new Error('排序只能填写正正数'));
                    }
                }
                callback();
            }

            return {
                //render 里使用 如果没有此this 会导致找不到方法而报错
                self: this,
                columns: [
                    {
                        type: 'selection',
                        width: 50,
                        align: 'center'
                    },
                    {
                        title: 'ID',
                        key: 'id',
                        width: 60
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width: 120,
                        align: 'center',
                        render (row) {
                            const color = row.status == 1 ? 'green' : row.status == 0 ? 'yellow' : 'red';
                            const text = row.status == 1 ? '正常' : row.status == 0 ? '锁定' : '删除';
                            return `<tag type="dot" color="${color}">${text}</tag>`;
                        }
                    },
                    {
                        title: '角色名称',
                        key: 'name',
                        width: 200
                    },
                    {
                        title: '角色简介',
                        key: 'desc'
                    },
                    {
                        title: '添加时间',
                        key: 'create_time',
                        width: 135,
                        align: 'center',
                        render (row) {
                            return "<span>{{ row.create_time | formatDate('yyyy-MM-dd h:m') }}</span>"
                        }
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        width: 120,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="edit(${index})">查看</i-button> <i-button type="error" size="small" @click="del(${index}, ${row.id})">删除</i-button>`;
                        }
                    }
                ],
                //列表数据
                list: [],
                //总共数据多少条
                total: 0,
                //每页多少条数据
                pageSize: 1,
                addForm: {
                    id: '',
                    name: '',
                    status: 1,
                    desc: '',
                    create_time: ''
                },
                //验证规则
                ruleValidate: {
                    name: [
                        { required: true, message: '节点名称不能为空', trigger: 'blur' },
                        { type: 'string', min: 2, message: '节点名称不能少于2个字符', trigger: 'blur' }
                    ],
                    controller: [
                        { type: 'string', message: '控制器只能英文前小后驼峰', trigger: 'blur', pattern: /^[a-zA-z]+$/}
                    ],
                    action: [
                        { type: 'string', message: '方法只能是英文前小后驼峰', trigger: 'blur', pattern: /^[a-zA-z]+$/}
                    ],
                    sort: [
                        { validator: validateInt, trigger: 'blur'}
                    ],
                    params: [
                        { validator: validateParams, trigger: 'blur'}
                    ]

                },
                //搜索表单
                formSearch: {},
                //编辑表单
                editForm: {},
                //添加 modal
                addModal: false,
                //编辑 modal
                editModal: false,
            }
        },
        methods: {
            //取消 modal
            modalCancel() {
                this.editModal = false
            },
            //添加数据
            addSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.save("AddRule", this.addForm)
                    } else {
                        this.$Message.error('表单验证失败!')
                    }
                })
            },
            //修改数据
            editSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.save("EditRule", this.editForm)
                    } else {
                        this.$Message.error('表单验证失败!')
                    }
                })
            },
            //重置表单数据
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            //分页切换页码
            changePage (page) {
                let search = this.formSearch
                let query = Object.assign({page: page }, search)
                //分页
                this.$router.push({ name: this.$router.currentRoute.name, query: query})
                //获取最新数据
                this.getData({page: page, params: search})
            },
            getData (params) {
                if (!params) params = {page: 1}
                this.request('GetRule', params, true).then((res) => {
                    if(res.status) {
                        //列表数据
                        this.list = res.data.list
                        //总页数
                        this.total = res.data.count
                        //每页多少条数据
                        this.pageSize = res.data.size
                    }
                }).catch((response) => {

                })
            },
            edit (index) {

            },
            //删除节点数据
            del (index, id) {
                this.$Modal.confirm({
                    title: '确认删除',
                    width: 300,
                    content: '<p>你确定要删除?删除后不可恢复!</p>',
                    loading: true,
                    onOk: () => {
                        this.request('DelRule', {id, id}).then((res) => {
                            if(res.status) {
                                this.$Message.info(res.msg)
                                this.$Modal.remove();
                                this.list[index].status = -1
                            } else {
                                this.$Message.error(res.msg)
                            }
                        })
                    }
                });
            },
            //表单搜索
            search() {

            },
            //保存数据方法
            save(url, data) {

            }
        },
        mounted() {
            //服务端获取数据

        }
    }
</script>
