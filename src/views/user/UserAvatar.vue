<script setup>
import { ref } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { userUpdateAvatarService } from '@/api/user'
import { ElMessage } from 'element-plus'
const userStore = useUserStore()
const uploadRef = ref()
const imageUrl = ref(userStore.user.user_pic)
const onSelectFile = (uploadFile) => {
  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw)
  // imageUrl.value = URL.createObjectURL(uploadFile.raw)
  reader.onload = async () => {
    imageUrl.value = reader.result
    // await userUpdateAvatarService(imageUrl.value)
    // console.log(imageUrl.value)
  }
}
const onUploadAvatar = async () => {
  await userUpdateAvatarService(imageUrl.value)
  await userStore.getUserInfo()
  ElMessage.success('修改头像成功')
}
</script>
<template>
  <el-upload
    :auto-upload="false"
    class="avatar-uploader"
    :show-file-list="false"
    :on-change="onSelectFile"
    ref="uploadRef"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
  <br />
  <el-button
    type="primary"
    @click="uploadRef.$el.querySelector('input').click()"
    :icon="Plus"
    size="large"
    >修改头像</el-button
  >
  <el-button @click="onUploadAvatar" type="success" :icon="Upload" size="large"
    >上传头像</el-button
  >
</template>
<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
    }

    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>
