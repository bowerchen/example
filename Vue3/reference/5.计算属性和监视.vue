<template>
  <h2>计算属性和监视</h2>
  <fieldset>
    <legend>姓名操作</legend>
    姓氏: <input type="text" placeholder="请输入姓氏" v-model="user.firstName" /><br />
    名字: <input type="text" placeholder="请输入名字" v-model="user.lastName" /><br />
  </fieldset>

  <fieldset>
    <legend>计算属性和监视的演示</legend>
    姓名: <input type="text" placeholder="显示名字" v-model="fullName1" /><br/>
    姓名: <input type="text" placeholder="显示名字" v-model="fullName2" /><br />
    姓名: <input type="text" placeholder="显示名字" v-model="fullName3" /><br/>
  </fieldset>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch, watchEffect } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    const user = reactive({
      firstName: 'bower',
      lastName: 'chen'
    })

    const fullName1 = computed(() => {
      return user.firstName + '_' + user.lastName;
    })

    const fullName2 = computed({
      get() {
        return user.firstName + '_' + user.lastName
      },
      set(val: string) {
        // console.log(val)
        let names = val.split("_")
        user.firstName = names[0]
        user.lastName = names[1]
      }
    })

    const fullName3 = ref('')
    watch(user, ({firstName, lastName}) => {
      fullName3.value = firstName + '_' + lastName
    }, {immediate: true, deep: true})

    // watchEffect(() => {
    //   fullName3.value = user.firstName + '_' + user.lastName
    // })

    // 监视fullName3的数据, 改变firstName和lastName
    watchEffect(() => {
      const names = fullName3.value.split('_')
      user.firstName = names[0]
      user.lastName = names[1]
    })
    
    watch([() => user.firstName, () => user.lastName, fullName3], () => {
      console.log('===')
    })

    return {
      user,
      fullName1,
      fullName2,
      fullName3
    }
  }
});
</script>

<style>
</style>
