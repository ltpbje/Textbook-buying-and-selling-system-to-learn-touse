import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('big-counter', () => {
  const count = ref(100)
  const addCount = (n) => {
    count.value = count.value + n
  }
  return { count, addCount }
})
