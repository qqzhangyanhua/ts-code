<template>
    <ul class="authorization">
        <li>
            <span>企业授权</span>
            <van-icon name="arrow" />
        </li>
        <li>
            <span>角色授权</span>
            <van-icon name="arrow" />
        </li>
    </ul>
</template>
<script lang='ts' setup>
</script>
<style lang="scss" scoped>
    .authorization{
       li{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
        height: 50px;
        background-color: #fff;
        font-size: 16px;
        color: #333;
        border-bottom: 1px solid #eee;
       }
    }
</style>
