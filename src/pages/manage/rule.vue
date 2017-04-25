<template>
    <div>
        <Row class="mb-15">
            <Col span="18" class="search">
                <Form :model="formSearch" :label-width="80" inline label-position="right">
                    <Form-item label="节点名称：">
                        <Input v-model="formSearch.keywords" placeholder="请输入节点名称关键词"></Input>
                    </Form-item>
                    <Form-item label="添加日期：">
                        <Date-picker type="date" placeholder="选择日期" v-model="formSearch.date"></Date-picker>
                    </Form-item>
                    <Form-item label="是否显示：">
                        <Select v-model="formSearch.display" placeholder="请选择">
                            <Option value="1">显示</Option>
                            <Option value="0">隐藏</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="节点认证：">
                        <Select v-model="formSearch.auth" placeholder="请选择">
                            <Option value="1">认证</Option>
                            <Option value="0">拒绝</Option>
                        </Select>
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
                <Button type="primary" @click="modalOpen(); modalRule = true"><Icon type="plus-round"></Icon>&nbsp;添加节点</Button></Button>
            </Col>
        </Row>
        <Row class="mb-15">
            <Table :context="self" :columns="columns" :data="list"></Table>
        </Row>
        <Row type="flex" justify="end">
            <Page :total="total" :page-size="pageSize" show-total show-elevator @on-change="changePage"></Page>
        </Row>

        <!--Modal 对话框-->
        <Modal v-model="modalRule" title="添加权限节点" class-name="customize-modal-center" @on-cancel="modalCancel()">
            <div slot="header" class="ivu-modal-header-inner">{{modal_title}}</div>
            <div>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <Form-item label="所属模块">
                        <Select v-model="formValidate.select" placeholder="请选择">
                            <Option value="beijing">管理</Option>
                            <Option value="shanghai">上海市</Option>
                            <Option value="shenzhen">深圳市</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="节点名称" prop="name">
                        <Input v-model="formValidate.name" placeholder="请填写节点名称"></Input>
                    </Form-item>
                    <Form-item label="节点图标" prop="icon">
                        <Input v-model="formValidate.icon" placeholder="请填写节点图标"></Input>
                    </Form-item>
                    <Form-item label="控制器名称" prop="controller">
                        <Input v-model="formValidate.controller" placeholder="请填写控制器名称"></Input>
                    </Form-item>
                    <Form-item label="方法名称" prop="action">
                        <Input v-model="formValidate.action" placeholder="请填写方法名称"></Input>
                    </Form-item>
                    <Form-item label="路由路径" prop="path">
                        <Input v-model="formValidate.path" placeholder="请填写path路径"></Input>
                        <div class="ng-mb-15 label-color">path路径vue前端路由路径</div>
                    </Form-item>
                    <Form-item label="路由参数" prop="params">
                        <Input v-model="formValidate.params" placeholder="多个参数请用半角逗号分隔"></Input>
                    </Form-item>
                    <Form-item label="组件地址" prop="component">
                        <Input v-model="formValidate.component" placeholder="请填写组件地址"></Input>
                        <div class="ng-mb-15 label-color">填写了path路径请一定填写组件地址,且地址是相对地址</div>
                    </Form-item>
                    <Form-item label="排序" prop="sort">
                        <Input type="text" v-model="formValidate.sort" placeholder="只能填写正数,数值越大越靠前" number></Input>
                    </Form-item>
                    <Row>
                        <Col span="12">
                            <Form-item label="是否显示" prop="display">
                                <Radio-group v-model="formValidate.display">
                                    <Radio label="1">显示</Radio>
                                    <Radio label="0">隐藏</Radio>
                                </Radio-group>
                            </Form-item>
                        </Col>
                        <Col span="12">
                            <Form-item label="节点认证" prop="auth">
                                <Radio-group v-model="formValidate.auth">
                                    <Radio label="1">认证</Radio>
                                    <Radio label="0">拒绝</Radio>
                                </Radio-group>
                            </Form-item>
                        </Col>
                    </Row>
                    <Form-item label="节点状态" prop="status">
                        <Radio-group v-model="formValidate.status">
                            <Radio label="1">正常</Radio>
                            <Radio label="0">锁定</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="节点说明" prop="desc">
                        <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="节点简要说明..."></Input>
                    </Form-item>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
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
                modal_title: '添加权限节点',
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
                        title: '名称',
                        key: 'name',
                        width: 200
                    },
                    {
                        title: 'ICON',
                        key: 'icon'
                    },
                    {
                        title: 'PATH',
                        key: 'path'
                    },
                    {
                        title: 'URL',
                        key: 'url'
                    },
                    {
                        title: '组件路径',
                        key: 'component'
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
                            const color = row.status == 1 ? 'green' : row.status == 0 ? 'yellow' : 'red';
                            const text = row.status == 1 ? '正常' : row.status == 0 ? '锁定' : '删除';
                            return `<tag type="dot" color="${color}">${text}</tag>`;
                        }
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
                //数据当前指针 用于添加编辑中切换数据以免被双向
                listNeedle: 0,
                //总共数据多少条
                total: 0,
                //每页多少条数据
                pageSize: 1,
                //搜索表单
                formSearch: {},
                formValidate: {
                    id: '',
                    name: '',
                    icon: '',
                    controller: '',
                    action: '',
                    path: '',
                    params: '',
                    component: '',
                    display: 0,
                    status: 1,
                    auth: 1,
                    sort: 0,
                    desc: ''
                },
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
                formSearch: {

                },
                modalRule: false,
                apiType: 'add'
            }
        },
        methods: {
            //确保打开modal
            modalOpen() {

            },
            //取消 modal
            modalCancel() {
                //取消表单 重置表单
                if(this.apiType == 'add') {
                    this.$refs['formValidate'].resetFields()
                }
            },
            //提交数据
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let apiUrl = ''
                        if(this.apiType == 'add') {
                            apiUrl = 'AddRule'
                        }else {
                            apiUrl = 'EditRule'
                        }
                        this.request(apiUrl, this.formValidate).then((res) => {
                            if (res.status) {
                                this.modalRule = false
                                this.$Message.success(res.msg)
                                //重置数据
                                this.$refs[name].resetFields()
                                //重新拉取服务端数据
                                this.getData()
                            } else {
                                this.$Message.error(res.msg)
                            }
                        })
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
                //打开 modal 窗口
                this.modalRule = true
                //获取原数据
                this.formValidate = this.list[index]
                //改变 apiUrl
                this.apiType = 'edit'
                //重新改变当前指针
                this.listNeedle = index
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
                let search = this.formSearch
                this.getData({ params : search })
            }
        },
        mounted() {
            //服务端获取数据
            this.getData();
            let page = { page: 1 }
            console.log(Object.assign(page, this.formSearch));

            console.log(this.$route.query)
            console.info(this.$router)
            console.log('deviceid: ' + this.$route.params.page)
            console.log('deviceid: ' + this.$route)
        }
    }
</script>
