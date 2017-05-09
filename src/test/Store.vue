<template>
    <div>
        <div style="width: 1000px; margin: 30px auto;">
            <div class="container">
                <div class="box">
                    <div class="left">
                        <vue-tabs active="0">
                            <tab title="标题">
                                <ul>
                                    <li @click="dd('dom')" ref="dom">
                                        <section>
                                            <blockquote style="margin: 0px; padding: 10px; border: 6px double rgb(0, 187, 236); color: rgb(68, 68, 68); font-family: 微软雅黑; word-break: break-all; word-wrap: break-word !important; box-sizing: border-box !important;">
                                                <p class="ue_t" style="margin-top: 0px; margin-bottom: 0px; padding: 0px; border: 0px;">
                                                    可在这输入内容，代码兔 - 微信图文排版,微信图文编辑器,微信公众号编辑器，微信编辑首选。
                                                </p>
                                            </blockquote>
                                        </section>
                                    </li>
                                    <li @click="dd('dom1')" ref="dom1">
                                        <section>
                                            <section class="unieditor">
                                                <fieldset style="margin: 20px 0px 0px 10px; padding: 0px; border: 0px; max-width: 100%; color: rgb(62, 62, 62); font-family: 微软雅黑; line-height: 25px; white-space: normal; word-wrap: break-word !important; box-sizing: border-box !important; background-color: rgb(255, 255, 255);">
                                                    <section style="max-width: 100%; word-wrap: break-word !important; box-sizing: border-box !important; margin-left: -0.5em; line-height: 1.4em;">
                                                        <section class="wxqq-bg" style="max-width: 100%; word-wrap: break-word !important; box-sizing: border-box !important; display: inline-block; padding: 0.2em 0.5em; border-top-left-radius: 0.3em; border-top-right-radius: 0.3em; border-bottom-right-radius: 0.3em; border-bottom-left-radius: 0.3em; color: white; font-size: 0.8em; text-align: center; -webkit-transform: rotateZ(-10deg); -webkit-transform-origin: 0% 100%; background-color: #00BBEC;">
                                                            我的观点
                                                        </section>
                                                    </section>
                                                    <section class="wxqq-borderTopColor wxqq-borderRightColor wxqq-borderBottomColor wxqq-borderLeftColor" style="max-width: 100%; word-wrap: break-word !important; box-sizing: border-box !important; margin-top: -1.5em; border: 1px solid #00BBEC; font-size: 1em;">
                                                        <section style="max-width: 100%; word-wrap: break-word !important; box-sizing: border-box !important; padding: 1.4em 1em 1em;">
                                                            <span style="max-width: 100%; word-wrap: break-word !important; box-sizing: border-box !important; font-size: 1em; line-height: 1.2; font-family: inherit; text-align: inherit; text-decoration: inherit; color: rgb(253, 176, 0);"></span><span style="max-width: 100%; word-wrap: break-word !important; box-sizing: border-box !important; font-size: 1em; line-height: 1.2; font-family: inherit; text-align: inherit; text-decoration: inherit; color: rgb(51, 51, 51);">可在这输入内容，代码兔 - 微信图文排版,微信图文编辑器,微信公众号编辑器，微信编辑首选。</span>
                                                        </section>
                                                    </section>
                                                </fieldset>
                                            </section>
                                            <p>
                                                <br/>
                                            </p>
                                        </section>
                                    </li>

                                </ul>
                            </tab>
                            <tab title="关注">
                                <ul>
                                    <li>
                                        <section>
                                            <section style="border: none; margin: 5px auto; width: 90%; background-image: none;">
                                                <section style="text-align: left; vertical-align: top;">
                                                    <section style="width: 0px; margin-left:50px; border-top-color: transparent !important; border-right-color: transparent !important; border-bottom-color: rgb(0, 187, 236); border-left-color: transparent !important; border-right-width: 0.8em !important; border-bottom-width: 0.8em; border-left-width: 0.8em !important; border-right-style: solid !important; border-bottom-style: solid; border-left-style: solid !important;"></section>
                                                    <section style="margin: 0px; border-radius: 2em; height: 2.5em; line-height:2.5em; background-color: rgb(0, 187, 236);">
                                                        <img style="margin: 0.5em 0.6em; height: 1.6em; vertical-align: top;" src="http://img.imeibian.com/Public/images/home/userimg/user2/2_imb_9981BDF06D1BB2ECCCBF3926D9A552D4.gif" title="https://mmbiz.qlogo.cn/mmbiz/CItRLtZlHnCXE117LFkibibmrLFLibQOTpzMb6VgvFftfZYfPHKM1f6r4BUIGqMKFWopcC1xNDEcSQp5s50iaZPOUA/0?wx_fmt=gif">
                                                        <section style="text-align: center; overflow: hidden; display: inline-block;">
                                                            <p style="color:rgb(255,255,255); font-size:16px; text-align:center; margin:0">
                                                                <span style="color:inherit">点击上"XXX"关注我们</span>
                                                            </p>
                                                        </section>
                                                    </section>
                                                </section>
                                            </section>
                                        </section>
                                    </li>
                                </ul>
                            </tab>
                        </vue-tabs>
                    </div>
                    <div class="right">
                        <UEditor ref="editor" @ready="editorReady" :config="config"></UEditor>
                    </div>
                </div>
                <div class="position">
                    <div class="item">客服咨询</div>
                    <div class="item">复制</div>
                    <div class="item" @click="modalShow = true">手机预览</div>
                    <div class="item">清空</div>
                </div>
            </div>
            <br/>
            <button @click="setContent">追加内容</button>
            <button @click="insertHtml">追加指定内容</button>
        </div>

        <!--modal-->
        <div class="phone-modal" v-if="modalShow">
            <div class="box">
                <div class="title">代码兔，我们专注于微信公众号</div>
                <div class="tips">
                    <em style="color: rgb(140, 140, 140); font-size: 12px; font-style: normal;">2020-02-02</em>
                    <a style="color: rgb(96, 127, 166); font-size: 12px;" href="">代码兔 www.daimatu.cn</a>
                </div>
                <div class="preview">
                    <section><blockquote class="wxqq-borderTopColor wxqq-borderRightColor wxqq-borderBottomColor wxqq-borderLeftColor" style="margin: 0px; padding: 15px; border: 3px dashed rgb(0, 187, 236); border-top-left-radius: 10px; border-top-right-radius: 10px; border-bottom-right-radius: 10px; border-bottom-left-radius: 10px;"><p class="ue_t">可在这输入内容，代码兔 - 微信图文排版,微信图文编辑器,微信公众号编辑器，微信编辑首选。</p></blockquote></section><p><br></p><section class="unieditor"><blockquote class="wxqq-borderTopColor wxqq-borderRightColor wxqq-borderBottomColor wxqq-borderLeftColor" style="margin: 0px; padding: 15px; border: 1px solid rgb(0, 187, 236);"><p class="ue_t">可在这输入内容，代码兔 - 微信图文排版,微信图文编辑器,微信公众号编辑器，微信编辑首选。</p></blockquote></section><p><br></p><section class="unieditor"><blockquote class="wxqq-borderTopColor wxqq-borderRightColor wxqq-borderBottomColor wxqq-borderLeftColor" style="margin: 0px; padding: 15px; border: 1px solid rgb(0, 187, 236); border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px;"><p class="ue_t">可在这输入内容，代码兔 - 微信图文排版,微信图文编辑器,微信公众号编辑器，微信编辑首选。</p></blockquote></section><p><br></p><section class="unieditor"><blockquote class="wxqq-borderLeftColor" style="margin: 0px; max-width: 100%; word-wrap: break-word; padding: 15px 25px; top: 0px; line-height: 24px; font-size: 14px; vertical-align: baseline; border-left-color: rgb(0, 187, 236); border-left-width: 10px; border-left-style: solid; display: block; background-color: rgb(239, 239, 239);"><p class="ue_t">可在这输入内容，代码兔 - 微信图文排版,微信图文编辑器,微信公众号编辑器，微信编辑首选。</p></blockquote></section><p><br></p><section class="unieditor"><blockquote class="wxqq-borderTopColor wxqq-borderRightColor wxqq-borderBottomColor wxqq-borderLeftColor" style="margin: 0px; padding: 20px 15px 15px 48px; border: 1px solid rgb(0, 187, 236); border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; line-height: 1.5; background-image: url(http://img03.store.sogou.com/net/a/04/link?appid=100520031&amp;w=710&amp;url=https://mmbiz.qlogo.cn/mmbiz/6xsuhALdNEr8ZmVegySCLnxIFNbiapIkjzQtojyF4Yc6cqozUlj2iaWK6yhTuFgUGK7ibNVaqFdMbMA1eLo2nAjVA/0/mmbizgif); background-position: 10px 11px; background-repeat: no-repeat;"><p class="ue_t">可在这输入内容，代码兔 - 微信图文排版,微信图文编辑器,微信公众号编辑器，微信编辑首选。</p></blockquote></section><p><br></p><p><br></p>
                    <div>
                        <a style="font-size:12px;color:#607fa6" href="" target="_blank" id="post-user">阅读原文</a> <em style="color:#8c8c8c;font-style:normal;font-size:12px;">阅读 100000+</em>
                        <span class="fr"><a style="font-size:12px;color:#607fa6" href="" target="_blank">我要举报</a></span>
                    </div>
                </div>
                <div id="close" @click="modalShow = false">×</div>
            </div>
        </div>
    </div>

</template>

<style>
    .container {
        width: 1000px;
        display: flex;
        height: 855px;
        position: relative;
    }
    .container .box {
        display: flex;
        flex: 1;
    }
    .container .box .left{
        width: 460px;
        height: 853px;
        border: 1px solid #dedede;
        display: flex;
    }
    .container .box .right {
        flex: 1;
        margin-left: 10px;
        height: 502px;
    }
    .container .position {
        width: 100px;
        height: 500px;
        position: absolute;
        top: 0;
        right: -110px;
        z-index: 999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .container .position .item {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #FFFFFF;
        text-align: center;
        cursor: pointer;
        background: #23b7e5;
        margin-bottom: 10px;
        border-radius: 5px;
    }

    /*modal*/
    .phone-modal {
        z-index:10000;
        position:fixed;
        left:0;
        top:0;
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.6);
        background-size:contain;
        padding:0 0 0 0;
    }
    .phone-modal .box{
        background: url(../assets/images/iphone.png) no-repeat;
        width: 358px;
        height: 660px;
        margin: 100px auto 0;
        padding: 100px 0 0 0;
        position: relative;
    }
    .phone-modal .box .title{
        line-height: 30px;
        font-size: 18px;
        font-weight: 600;
        padding: 0 10px;
        color:#585858;
    }
    .phone-modal .box .tips{
        padding: 0 10px;
    }
    .phone-modal .box .preview{
        height: 420px;
        overflow-y: scroll;
        width: 338px;
        margin-top: 10px;
        padding: 0 10px;
    }
    .phone-modal .box #close{
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        position: absolute;
        top: 50px;
        right: -70px;
        font-size: 50px;
        font-weight: 700;
        cursor: pointer;
        color: #fff;
        border: 2px solid #fff;
    }

</style>

<script>
    import Vue from 'vue'
    import Vuex from 'vuex'
    import UEditor from '../components/editor'
    import TabPanel from '../components/tabs/tab_panel.vue'
    import Tabs from '../components/tabs/tabs.vue'

    Vue.use(Vuex)

    const store = new Vuex.Store({
        state: {
            count: 0
        },
        mutations: {
            increment (state, value) {
                console.log(value, 2)
                state.count++ + value
            }
        }
    })

    export default{
        data(){
            return {
                msg: 'hello vue',
                modalShow: false,
                config: {
                    initialFrameWidth: 525, // 宽度
                    initialFrameHeight: 773, // 高度
                	toolbars: [["undo","redo","bold","italic","forecolor","backcolor","paragraph","fontfamily","fontsize","autotypeset",'insertorderedlist',"lineheight","inserttable","removeformat",'insertvideo','link',"insertimage","justifyleft","justifycenter","justifyright",'justifyjustify', "indent",'source']],
                    zIndex: 0, // 编辑器层级
                    charset:"utf-8", //编码
                    saveInterval: 5000,
                    autoHeightEnabled: false
                }
            }
        },
        store,
        mounted() {
            store.commit('increment', 5)
            console.log(store.state.count)
        },
        methods: {
            editorReady(instance) {
                instance.setContent('');
                instance.addListener('contentChange', () => {
                    this.content = instance.getContent()
                })
            },
            setContent() {
                this.$refs.editor.setContent('<p><span style="color: rgb(192, 0, 0);"><strong>这是重新设置的内容</strong></span></p>')
            },
            insertHtml() {
                this.$refs.editor.insertHtml('<p><span style="color: rgb(192, 0, 0);"><strong>这是重新设置的内容</strong></span></p>')
            },
            dd(e) {
            	let dom = this.$refs[e].querySelector("*")
                this.$refs.editor.insertHtml(dom.innerHTML + "<p><br/></p>")
            }
        },
        components: {
            UEditor,
            'vue-tabs': Tabs,
            'tab': TabPanel
        },
        watch: {
            '$route' (to, from) {
                console.log(to.path, 23)
            }
        }
    }
</script>
