<template>
  <h2>reactive的使用</h2>
  <h3>name: {{user.name}}</h3>
  <h3>name: {{user.age}}</h3>
  <h3>name: {{user.wife}}</h3>
  <Button @click="update">更新数据</Button>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    let user = reactive({
      name: 'bowerchen',
      age: 18,
      wife: {
        name: 'marry',
        age: 22
      }
    })
    console.log(user.name,user.wife.name)
    const update=() => {
      user.name += '--'
      user.age += 5
      user.wife.name += '++'
      user.wife.age +=5
    }

    return {
      user,
      update
    }
  }
});
</script>

<style>
</style>
