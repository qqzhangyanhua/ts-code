<template>
   <div class="role-text">
      <img src='../assets/rule-bg.png'/>
      <span>{{roleText}}</span>
      <van-icon name="arrow" class="role-text_icon" />
    </div>
</template>
<script lang='ts' setup>
    defineProps<{
      roleText: string;
    }>();
</script>
<style lang="scss" scoped>
.role-text {
  height: 24px;
  display: flex;
  align-items: center;
  font-size:14px ;
  color: #CBB486;
  background-color:#FAF7F3;
  width: fit-content;
font-weight: 500;
  img{
    height: 24px;
    margin-right: 8px;
  }
  .role-text_icon{
    margin-right: 10px;
  }
 
}
</style>
