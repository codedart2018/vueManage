<style>
     .active {
        background-color: #dcdc33;

      }
</style>
<template>
    <div :class="[customizeClass]">
        dsadsd {{msg}}
        <br/>
        saad
    </div>
</template>

<script>
    export default{
        beforeCreate: function() {

            document.getElementsByTagName("body")[0].className="active";
        },
        data(){
            return{
                msg:'hello vue',
                customizeClass: 'active'
            }
        },
        beforeDestroy: function() {
            document.body.removeAttribute("class","active");
        }
    }
</script>
