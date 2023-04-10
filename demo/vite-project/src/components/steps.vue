<template>
  <div class="step-container">
    <template v-for="(item, index) in stepList" :key="index">
      <div :class="['step',item.active?'active':'']">{{ item.id }}</div>
      <div :class="['connector',item.active?'active':'']" v-if="index!==stepList.length-1"></div>
    </template>
  </div>
  <div class="step-names">
    <template v-for="(item) in stepList" :key="item.id">
      <div :class="['step-name',item.active?'active':'']">{{ item.name }}</div>
    </template>
  </div>
</template>
<script lang="ts" setup>
interface StepItem {
  name: string;
  id: number;
  active: boolean;
}
defineProps<{
  stepList: StepItem[];
}>();
</script>
<style lang="scss" scoped>
.step-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 0 auto;
}

.step {
  position: relative;
  width: 30px;
  height: 30px;
  margin: 0 2px;
  border-radius: 50%;
  background-color: #BCBEC0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.step.active {
  background-color: #CBB486;
}

.connector {
  position: relative;
  width: calc(180px + 4px);
  height: 2px;
  background-color: #BCBEC0;
}
.connector.active {
  background-color: #CBB486;
}
.step-names {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 10px auto 0;
}

.step-name {
  text-align: center;
  color: #000;
  font-weight: 500;
  font-size: 14px;
}

.step-name.active {
  color: #CBB486;
}
</style>
