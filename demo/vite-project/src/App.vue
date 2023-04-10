<template>
  <RouterView />
  <div>
    <Steps :step-list="list" />
    <van-button type="primary" @click="handelClick">主要按钮</van-button>
    <div class="identity-btn">管理员</div>
    <RoleBtn role-text="管理员" />
  </div>
  <van-cell-group>
    <van-cell title="姓名" value="张三" />
    <van-cell title="手机号码" value="13212222222" />
  </van-cell-group>
  <van-field name="checkbox" label="复选框">
    <template #input>
      <van-checkbox v-model="checked" shape="square" />
    </template>
  </van-field>
  <van-checkbox-group v-model="groupChecked" direction="horizontal">
    <ul class="checkbox-box">
      <li v-for="item in 4" :key="item" class="van-hairline--bottom">
        <van-space>
          <span>复选框</span>
          <van-icon name="question-o" color="#cbb486" />
        </van-space>
        <van-checkbox :name="item" shape="square" />
      </li>
    </ul>
  </van-checkbox-group>
</template>
<script lang="ts" setup>
import { showConfirmDialog } from "vant";
import Steps from "./components/steps.vue";
import { h, createTextVNode, ref, onMounted } from "vue";
import RoleBtn from "./components/role-btn.vue";
const checked = ref(false);
const groupChecked = ref([]);
const list = [
  { name: "选择服务", id: 1, active: true },
  { name: "选择角色", id: 2, active: true },
  { name: "选择有效期", id: 3, active: true },
  { name: "申请完成", id: 4, active: false },
];
const handelClick = () => {
  console.log(groupChecked.value);

  showConfirmDialog({
    title: "温馨提示",
    message() {
      return h("div", null, [
        createTextVNode("是否撤消您向"),
        h("span", { style: { color: "red" } }, "xxx公司"),
        createTextVNode("发起的"),
        h("span", { style: { color: "red" } }, "人事"),
        createTextVNode("角色授权记录"),
      ]);
    },
  })
    .then(() => {
      // on confirm
    })
    .catch(() => {
      // on cancel
    });
};

onMounted(() => {});
</script>
<style lang="scss" scoped>

.checkbox-box {
  padding: 0 20px;
  width: 100%;
  li {
    display: flex;
    align-items: center;
    padding: 20px 0;
    justify-content: space-between;
    position: relative;
  }
}
.identity-btn {
  width: 100px;
  height: 40px;
  background-color: #185bea;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;
  border-bottom-right-radius: 60px;
}
</style>
