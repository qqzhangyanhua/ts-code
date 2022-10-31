<script setup lang="ts">
import { ref, onMounted } from "vue";

defineProps<{ msg: string }>();
onMounted(() => {
  console.log("onMounted");
});

const count = ref(0);
const handelClick = ()=>{
  debugger
  count.value++
}
</script>

<template>
<div>
    <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="handelClick">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
</div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
