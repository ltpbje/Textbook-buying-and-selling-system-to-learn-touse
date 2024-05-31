<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// import { useRouter, useRoute } from 'vue-router'
// import { useRouter } from 'vue-router'
// import { useUserStore } from '@/stores/modules/user'
// import { useUserStore, useCounterStore } from '@/stores/index'
// const Router = useRouter()
// const Route = useRoute()
// const toList = () => {
//   Router.push('/list')
// }
// const userStore = useUserStore()
// const counterStore = useCounterStore()
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
  <!-- <div>我是APP</div>
  <button @click="$router.push('/home')">首页</button>
  <button @click="toList()">列表</button>
  <el-button type="primary">Primary</el-button>
  <el-button type="success">Success</el-button> -->
  <!-- 彩蛋：默认 components 下的文件也会被自动注册~ -->
  <!-- <test-demo></test-demo> -->
  <!-- <br />
  {{ userStore.token }}
  <br />
  <el-button @click="userStore.setToken('Bearer sidfhheiwhuvyweqrjh')">
    修改token</el-button
  >
  <el-button @click="userStore.removeToken"> 清空token</el-button>
  <hr />
  {{ counterStore.count }}
  <el-button @click="counterStore.addCount(2)">加数--2</el-button> -->
</template>

<style scoped></style>
