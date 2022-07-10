<template>
  <h2>Child子组件</h2>
  <h3>msg: {{msg}}</h3>

  <button @click="update">更新</button>
</template>

<script lang="ts">
import { defineComponent ,ref } from 'Vue'
export default defineComponent({
  name: "Child",
  props: ["msg"],
  setup(props, {attrs, emit, slots}) {
    console.log(props.msg, attrs.msg2, slots, emit)

    const m = ref(3)
    const n = ref(2)

    function update() {
      emit('xxx', '++')
    }
    return {
      update,
    }
  }
})
</script>

<style>

</style>