// app.js
import Vue from 'vue'
import App from './App.vue'
// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例

import { createRouter } from './router'
export function createApp () {
  // 创建 router 实例
  const router = createRouter()
  const app = new Vue({
    router,
    // 根实例简单的渲染应用程序组件。
    render: h => h(App)
  })
  return { router, app }
}
