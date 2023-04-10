<template>
    <ul class="authorization">
        <li class="van-hairline--bottom">
            <span>企业授权</span>
            <van-icon name="arrow" />
        </li>
        <li @click="handelClick">
            <span>角色授权</span>
            <van-icon name="arrow" />
        </li>
    </ul>
</template>
<script lang='ts' setup>
const handelClick = () => {
    console.log(1);
}
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
        position: relative;
       }
    }
</style>
