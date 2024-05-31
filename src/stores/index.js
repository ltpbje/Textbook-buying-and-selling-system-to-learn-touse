// pinia独立维护
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(persist)
export default pinia
// import { useCounterStore } from './stores/counter'
// export { useCounterStore }
// import { useUserStore } from './stores/user'
// export { useUserStore }
export * from './modules/counter'
export * from './modules/user'
