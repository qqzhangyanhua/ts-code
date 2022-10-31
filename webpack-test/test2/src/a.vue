
<template>
    <div>
        {{msg}}
                <button @click="handelClick">按钮</button>
    </div>
    <!-- //quejob new -->
</template>
<script>
export default {
   data() {
      return {
            msg: 'hello world'
      }
   },
   created(){
   },
   computed:{
   },
   methods:{
    handelClick(){
        this.$nexTick(()=>{
            console.log('click')
        })
        this.msg = 'hello webpack1'
         this.msg = 'hello webpack2'
          this.msg = 'hello webpack3'
    }
   },
}
</script>
<style lang="scss" scoped>

</style>
