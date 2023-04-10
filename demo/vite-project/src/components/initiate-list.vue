<template>
    <div class="card-list">
        <p>王箫二</p>
        <RoleBtn role-text="管理员"/>
        <p>
            <span>授权时间:</span>
            <span>2022-07-09 15:33:11</span>
        </p>
    </div >
</template>
<script lang='ts' setup>
import RoleBtn from './role-btn.vue';
</script>
<style lang="scss" scoped>
.card-list{
    margin-top: 12px;
    background-color: #fff;
    margin: 0 16px;
}

</style>
