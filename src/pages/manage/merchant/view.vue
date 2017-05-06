<!--查看商户组件-->
<style src="../../../assets/style/manage/merchant.less" lang="less" scoped></style>
<template>
    <Card dis-hover>
        <Form ref="data" :model="data" :rules="ruleValidate" :label-width="110">
            <Row>
                <Col span="8">
                    <Row style="margin-bottom: 24px;">
                        <Col span="24"><span style="font-size: 16px; color: #657180;">基本信息</span></Col>
                    </Row>
                    <Form-item label="商户名称">
                        <Input v-model="data.name" disabled ></Input>
                    </Form-item>
                    <Form-item label="商户类型">
                        <Tag color="green" v-if="data.type == 1">个人</Tag>
                        <Tag color="blue" v-if="data.type == 2">企业</Tag>
                    </Form-item>
                    <Form-item label="帐号等级">
                        <Tag color="green">普通商户</Tag>
                        <!--<Tag color="blue">一级商户</Tag>-->
                    </Form-item>
                    <Form-item label="管理员帐号">
                        <Input v-model="data.account" disabled></Input>
                    </Form-item>
                    <Form-item label="所在地区">
                        <Cascader :data="data" v-model="value2"></Cascader>
                    </Form-item>
                    <Form-item label="所属行业">
                        <Cascader :data="data" v-model="value2"></Cascader>
                    </Form-item>
                    <Row style="margin-bottom: 24px;">
                        <Col span="24"><span style="font-size: 16px; color: #657180;">联系信息</span></Col>
                    </Row>
                    <Form-item label="联系人" prop="contacts">
                        <Input v-model="data.contacts" placeholder="请填写联系人"></Input>
                    </Form-item>
                    <Form-item label="手机号码" prop="mobile">
                        <Input v-model="data.mobile" placeholder="请填写手机号码"></Input>
                    </Form-item>
                    <Form-item label="电话号码" prop="tel">
                        <Input v-model="data.tel" placeholder="请填写电话号码"></Input>
                    </Form-item>
                    <Form-item label="联系邮箱" prop="email">
                        <Input v-model="data.email" placeholder="请填写邮箱地址"></Input>
                    </Form-item>

                    <Form-item label="简要说明" prop="desc">
                        <Input v-model="data.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                    </Form-item>
                </Col>
                <Col span="1">&nbsp;</Col>
                <Col span="8">
                    <Row style="margin-bottom: 24px;">
                        <Col span="24"><span style="font-size: 16px; color: #657180;">财务信息</span></Col>
                    </Row>
                    <Form-item label="帐户余额">
                        <Input v-model="data.balance" disabled></Input>
                    </Form-item>
                    <Form-item label="已消费金额">
                        <Input v-model="data.name" disabled ></Input>
                    </Form-item>
                    <Form-item label="支付宝帐号">
                        <Input v-model="data.account" disabled></Input>
                    </Form-item>

                    <Row style="margin-bottom: 24px;">
                        <Col span="24"><span style="font-size: 16px; color: #657180;">认证信息</span></Col>
                    </Row>
                    <Form-item label="商户认证">
                        <Tag>未认证</Tag>    <Tag color="green">已认证</Tag>
                    </Form-item>
                    <div v-if="data.type == 1">
                    <Form-item label="姓名">
                        <Input v-model="data.name" disabled ></Input>
                    </Form-item>

                    <Form-item label="身份证号">
                        <Input v-model="data.account" disabled></Input>
                    </Form-item>
                    </div>
                    <!--企业-->
                    <div v-if="data.type == 2">
                    <Form-item label="企业名称">
                        <Input v-model="data.name" disabled ></Input>
                    </Form-item>
                    <Form-item label="社会信用代码认证">
                        <Input v-model="data.account" disabled></Input>
                    </Form-item>
                    <Form-item label="营业执照号认证">
                        <Input v-model="data.account" disabled></Input>
                    </Form-item>
                    <Form-item label="非盈利组织认证">
                        <Input v-model="data.account" disabled></Input>
                    </Form-item>
                    </div>
                </Col>
                <Col span="1">&nbsp;</Col>
                <Col span="6">
                    <Row style="margin-bottom: 24px;">
                        <Col span="24"><span style="font-size: 16px; color: #657180;">快捷面板</span></Col>
                    </Row>

                    <Row type="flex" justify="space-around" class="code-row-bg">
                        <Col span="4" class="col-plan">
                            <div class="box">
                                <div class="item">
                                    <Icon type="social-yen" class="icon"></Icon>
                                </div>
                                <div class="item" style="">财务信息</div>
                            </div>
                        </Col>
                        <Col span="4" class="col-plan">
                            <div class="box">
                                <div class="item">
                                    <Icon type="clipboard" class="icon"></Icon>
                                </div>
                                <div class="item" style="">操作日志</div>
                            </div>
                        </Col>
                        <Col span="4" class="col-plan">
                            <div class="box">
                                <div class="item">
                                    <Icon type="person-stalker" class="icon"></Icon>
                                </div>
                                <div class="item" style="">商户管理员</div>
                            </div>
                        </Col>
                    </Row>
                    <br> <br>
                    <Row type="flex" justify="space-around" class="code-row-bg">
                        <Col span="4" class="col-plan">
                        <div class="box">
                            <div class="item">
                                <Icon type="arrow-swap" class="icon"></Icon>
                            </div>
                            <div class="item" style="">切换平台</div>
                        </div>
                        </Col>
                        <Col span="4" class="col-plan">
                        <div class="box">
                            <div class="item">
                                <Icon type="at" class="icon"></Icon>
                            </div>
                            <div class="item" style="">公众号</div>
                        </div>
                        </Col>
                        <Col span="4" class="col-plan">

                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span="6" push="18">
                    <Form-item>
                        <Button type="info" @click="handleSubmit('data')">审核</Button>
                        <Button type="primary" @click="handleSubmit('data')" style="margin-left: 8px">保存</Button>
                        <Button type="ghost" style="margin-left: 8px" @click="goBack()">返回</Button>
                    </Form-item>
                </Col>
            </Row>
        </Form>
    </Card>
</template>

<script>
    export default {
        data () {
            return {
                data: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                ruleValidate: {
                    mail: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ]
                },
                value2: ['jiangsu', 'suzhou', 'zhuozhengyuan'],
                data: [{
                    value: 'beijing',
                    label: '北京',
                    children: [
                        {
                            value: 'gugong',
                            label: '故宫'
                        },
                        {
                            value: 'tiantan',
                            label: '天坛'
                        },
                        {
                            value: 'wangfujing',
                            label: '王府井'
                        }
                    ]
                }, {
                    value: 'jiangsu',
                    label: '江苏',
                    children: [
                        {
                            value: 'nanjing',
                            label: '南京',
                            children: [
                                {
                                    value: 'fuzimiao',
                                    label: '夫子庙',
                                }
                            ]
                        },
                        {
                            value: 'suzhou',
                            label: '苏州',
                            children: [
                                {
                                    value: 'zhuozhengyuan',
                                    label: '拙政园',
                                },
                                {
                                    value: 'shizilin',
                                    label: '狮子林',
                                }
                            ]
                        }
                    ],
                }]
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            getData (params) {
                let id = this.$route.params.id
                this.request('MerchantView', {id: id}, true).then((res) => {
                    if(res.status) {
                        //数据
                        this.data = res.data
                    }
                })
            },
            //后退海阔天空
            goBack() {
                this.$router.go(-1)
            }
        },
        mounted() {
            //服务端获取数据
            this.getData();
        },
    }
</script>
