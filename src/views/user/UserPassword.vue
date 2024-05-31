<script setup>
import { ref } from 'vue'
import { userUpdatePwdService } from '@/api/user'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const pwdForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})

const rules = {
  old_pwd: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度在 6 到 15 位', trigger: 'blur' }
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度在 6 到 15 位', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value === pwdForm.value.old_pwd) {
          callback(new Error('新密码和原密码不能一样'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  re_pwd: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== pwdForm.value.new_pwd) {
          callback(new Error('两次输入的新密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

const pwdFormRef = ref(null)
const userStore = useUserStore()
const router = useRouter()
const submitForm = async () => {
  // 处理提交逻辑
  await pwdFormRef.value.validate()
  await userUpdatePwdService(pwdForm.value)
  // 退出登录 重置本地
  userStore.removeToken()
  userStore.setUserInfo({})
  // 跳转到登录页
  router.push('/login')
  // 提示用户
  ElMessage.success('密码修改成功，请重新登录')
}

const resetForm = () => {
  pwdFormRef.value.resetFields()
}
</script>

<template>
  <el-form :model="pwdForm" :rules="rules" ref="pwdFormRef" label-width="120px">
    <el-form-item label="原密码" prop="old_pwd">
      <el-input type="password" v-model="pwdForm.old_pwd"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="new_pwd">
      <el-input type="password" v-model="pwdForm.new_pwd"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="re_pwd">
      <el-input type="password" v-model="pwdForm.re_pwd"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">修改密码</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
</template>
