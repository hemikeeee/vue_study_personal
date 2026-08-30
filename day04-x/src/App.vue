<template>
  <!-- 主体区域 -->
  <section id="app">
    <TodoHeader @addList="add"></TodoHeader>
    <TodoMain :listData="list" @delList="del"></TodoMain>
    <TodoFooter :listData="list" @delList="delAll"></TodoFooter>
  </section>
</template>

<script>
import TodoFooter from './components/TodoFooter.vue'
import TodoHeader from './components/TodoHeader.vue'
import TodoMain from './components/TodoMain.vue'
export default {
  data() {
    return {
      list: [
        { id: 1, name: '打篮球' },
        { id: 2, name: '看电影' },
        { id: 3, name: '逛商场' },
      ]
    }
  },
  methods: {
    add(todoName) {
      this.list.unshift({id:+new Date(),name: todoName})
    },
    del(id) {
      this.list = this.list.filter(item => item.id != id)
    },
    delAll() {
      this.list=[]
    },
  },
  components: {
    TodoHeader,
    TodoMain,
    TodoFooter
  },
}
</script>

<style></style>
