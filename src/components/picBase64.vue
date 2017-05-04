<!-- 图片转换成base64 组件 -->
<template>
    <div class="base-box">
        <!--上传数据-->
        <div class="base-list" v-for="(img, index) in files" :key="index" v-if="files">
            <img :src="img.data">
            <div class="list-cover">
                <i class="ivu-icon ivu-icon-ios-trash-outline" @click="handleRemove(index)"></i>
            </div>
        </div>
        <div class="base-upload">
            <div class="base-upload base-upload-drag" @click="handleClick">
                <input type="file" ref="input" :multiple="multiple" accept="image/jpeg,image/jpg,image/png,image/gif" class="ivu-upload-input" @change="handleChange">
                <div class="icon-box">
                    <i class="ivu-icon ivu-icon-camera" style="font-size: 20px;"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .base-box {
        height: 60px;
        width: auto;
    }
    .base-upload {
        display: inline-block;
        width: 58px;
    }
    .base-upload input[type="file"] {
        display: none;
    }
    .base-upload-drag {
        background: #fff;
        border: 1px dashed #d7dde4;
        border-radius: 4px;
        text-align: center;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: border-color .2s ease;
    }
    .base-list {
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        margin-right: 4px
    }

    .base-list img {
        width: 100%;
        height: 100%
    }

    .list-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .6)
    }

    .base-list:hover .list-cover {
        display: block
    }

    .list-cover i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px
    }

    .icon-box {
        width: 58px; height: 58px; line-height: 58px;
    }
</style>
<script>
    //在这组件里处理上传图片
    export default{
        props: {
            // 是否支持多文件
            multiple: {
                type: Boolean,
                default: false //true 支持多文件
            },
            // 当完成后要执行的方法
            done: {
                type: Function,
                default: () => {}
            },
            number: {
            	type: Number,
                default: 1
            },
            list: {
                type: Array,
                default:() => {
                    return [];
                }
            }
        },
        data(){
            return {
                files: []
            }
        },
        methods: {
            handleClick () {
                this.$refs.input.click()
            },
            handleChange (e) {
                //拿到表单获取文件
                const files = e.target.files
                if (!files) {
                    return;
                }

                if(this.number > 1 && (files.length > this.number || this.files.length >= this.number)) {
                    console.log("最多只能选择" + this.number + "个文件")
                    this.$Message.error("最多只能选择" + this.number + "个文件")
                    return
                }
                for (var i = 0; i < files.length; i++) {
                    let file = files[i]
                    let reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onload = () => {
                        let fileInfo = {
                            name: file.name,
                            type: file.type,
                            size: Math.round(file.size / 1000)+' kB',
                            data: reader.result,
                            file: file
                        }
                        //如果只能传一个直接替换，有多个只能删除
                        if(this.number == 1) {
                            this.files = []
                        }
                        this.files.push(fileInfo)
                        //判断是否已经选择过文件了
                        if(this.files.length == files.length){
                            if(this.multiple){
                                this.done(this.files)
                            } else {
                                this.done(this.files[0])
                            }
                        }
                    }
                }
            },
            handleRemove (index) {
                this.files.splice(index, 1)
            }
        },
        //监听数据是否有变化
        watch: {
            'list' () {

            }
        },
    }
</script>
