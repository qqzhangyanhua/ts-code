<template>
 <div class="role-list">
    <van-tabs v-model:active="active">
    <van-tab title="发起授权">
     <template v-for=" item in 4" :key="item">
        <InitiateList />
     </template>
    </van-tab>
    <van-tab title="申请记录"></van-tab>
  </van-tabs>
 </div>
</template>
<script lang="ts" setup>
import InitiateList from "../components/initiate-list.vue";
import { ref } from "vue";
const active = ref(0);
</script>
<style lang="scss" scoped>

.role-list {
    background-color:#FAF7F3;
 
}
</style>
