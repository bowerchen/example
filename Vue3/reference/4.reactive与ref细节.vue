<template>
  <h2>reactive 和 ref 细节</h2>
  <p>m1: {{m1}}</p>
  <p>m2: {{m2}}</p>
  <p>m3: {{m3}}</p>
  <hr>
  <button @click="update">更新</button>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {

    const m1 = ref("abc")
    const m2 = reactive({
      name: "bowerchen",
      wife: {
        name: "june"
      }
    })

    const m3 = ref({
      name: "bowerchen",
      wife: {
        name: "marry"
      }
    })

    console.log(m1.value)
    console.log(m2.wife)
    console.log(m3.value.wife)

    function update() {
      m1.value += '==='
      m2.wife.name += '==='
      m3.value.wife.name += '==='
    }

    return {
      m1,
      m2,
      m3,
      update
    }
  }
});
</script>

<style>
</style>
