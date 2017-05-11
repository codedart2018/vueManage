<template>
    <div v-show="show">
        <slot></slot>
    </div>
</template>

<script>

    export default{
    	//props
    	props: ['title'],
        //计算
        computed: {
    	    show(){
    	    	return this.$parent.current == this.index
            }
        },
        data(){
            return{
                index: ''
            }
        },
        //创建
        created() {
        	if(!this.index) {
        		this.index = this.$parent.$children.indexOf(this) + ''
            }
        },
        components:{

        }
    }
</script>
