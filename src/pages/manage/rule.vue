<template>
    <div>
        <Row class="mb-15">
            <Col span="12">
            <Button type="primary" @click="modal_rule = true"><Icon type="plus-round"></Icon>&nbsp;添加节点</Button></Button>
            </Col>
            <Col span="12">col-12</Col>
        </Row>
        <Row class="mb-15">
            <Table border :columns="columns4" :data="data1"></Table>
        </Row>
        <Row type="flex" justify="end">
            <Page :total="1000" :page-size="15" show-total show-elevator @on-change="changePage"></Page>
        </Row>

        <!--Modal 对话框-->
        <Modal v-model="modal_rule" title="添加权限节点" class-name="customize-modal-center">
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
                        <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
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
    .mb-15 {
        margin-bottom: 15px;
    }

</style>


<script>
    import Http from '../../libs/http'

    export default {
        data () {
            //参数验证
            const validateParams = (rule, value, callback) => {
                if (value) {
                    let reg = /^[a-zA-Z]+[,]?[a-zA-Z]+$/;
                    if (!reg.test(value)) {
                        callback(new Error('路由参数只能英文半角逗号'));
                    } else {
                        callback();
                    }
                }
            }

            return {
                modal_title: '添加权限节点',
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
                        display: 2,
                        status: 1,
                        auth: 1
                    },
                    {
                        name: '权限节点',
                        url: '/api/manage/rule',
                        path: 'rule',
                        display: 1,
                        status: 2,
                        auth: 0
                    }
                ],
                formValidate: {
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
                        { type: 'number', message: '排序只能填写正正数', trigger: 'blur'},
                        { type: 'number', max: 9999, message: '排序最大9999', trigger: 'blur'},
                    ],
                    params: [
                        { validator: validateParams, trigger: 'blur'}
                    ]

                },
                modal_rule: false,
            }
        },
        methods: {
            ok (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            cancel () {
                this.$Message.info('点击了取消');
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        console.log(this.formValidate)
                        this.request('AddRule', this.formValidate).then((res) => {
                            if (res.status) {
                                this.modal_rule = false
                                this.$Message.success('提交成功!');
                            } else {
                                this.$Message.error(res.msg)
                            }
                        })
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            //分页切换页码
            changePage (page) {
                console.log(page)
            }
        },
        mounted() {
            //服务端获取数据

        }
    }
</script>
