<template>
  <div>Vue3 学习</div>
  <h1>{{name}}</h1>

  <h2>setup和ref的基本使用</h2>
  <div>{{count}}</div>
  <button @click="updateCount">更新数据</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    let name = 10
    let count = ref(0)
    function updateCount() {
      count.value++
      console.log(count.value, "=======")
    }
    return {
      name,
      count,
      updateCount
    }
  },
  methods: {

  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
