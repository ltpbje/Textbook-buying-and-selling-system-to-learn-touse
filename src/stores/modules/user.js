import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfoService } from '@/api/user'
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('') //定义token
    const setToken = (t) => {
      token.value = t
    } // 设置 token
    const removeToken = () => {
      token.value = ''
    } //清空token
    const user = ref({}) //定义用户信息
    const getUserInfo = async () => {
      const res = await getUserInfoService()
      user.value = res.data.data
    }
    const setUserInfo = (obj) => {
      user.value = obj
    }
    return { token, setToken, removeToken, getUserInfo, setUserInfo, user }
  },
  {
    persist: true
  }
)
