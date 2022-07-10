<template>
  <h2>父组件</h2>
  <h3>msg: {{msg}}</h3>
  <hr />
  <Child :msg="childMsg" msg2="msg2" @xxx="xxx" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import Child from './components/Child.vue'

export default defineComponent({
  name: 'App',
  components: {
    Child
  },
  setup() {
    const msg = ref("hello")
    const childMsg = ref("This is a child message")

    function xxx(text: string) {
      msg.value += text
    }
    return {
      msg,
      childMsg,
      xxx
    }
  }
});
</script>

<style>
</style>
