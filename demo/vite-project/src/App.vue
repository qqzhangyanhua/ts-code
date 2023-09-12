<template>
  <RouterView />

  <TButton type="ADD" text="新增用户" :userEntity="UserEntity"></TButton>
        <TButton type="Edit" text="编辑用户" :userEntity="UserEntity"></TButton>


</template>
<script lang='ts' setup>

import  TButton from './components/Tbutton.vue';
import {UserEntity} from './hooks/useEntity';
</script>
<style lang="scss" scoped>

</style>
