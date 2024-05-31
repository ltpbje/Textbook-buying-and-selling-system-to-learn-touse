<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { userUpdateInfoService } from '@/api/user'
// 是在使用仓库中数据的初始值（无需响应式）解构无问题
const {
  user: { username, nickname, email, id },
  getUserInfo
} = useUserStore()
const formModel = ref({
  username,
  id,
  nickname,
  email
})

const rules = {
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 10, message: '昵称长度必须在2-10位之间', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ]
}
const formRef = ref(null)
const submitForm = async () => {
  // 验证表单
  await formRef.value.validate()
  // 更新 后台的 个人资料 数据
  await userUpdateInfoService(formModel.value)
  // 通知 user 模块进行数据更新
  await getUserInfo()
  ElMessage.success('修改成功')
}
</script>

<template>
  <page-container title="基本资料">
    <el-form :model="formModel" :rules="rules" ref="formRef">
      <el-form-item label="登录名称" prop="username">
        <el-input v-model="formModel.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="formModel.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="formModel.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交修改</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>

<style scoped></style>
