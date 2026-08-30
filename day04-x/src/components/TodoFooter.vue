<template>
    <!-- 统计和清空 -->
    <footer class="footer">
      <!-- 统计 -->
      <span class="todo-count">合 计:<strong> {{ listData.length }}</strong></span>
      <!-- 清空 -->
      <button @click="handleDel" class="clear-completed">
        清空任务
      </button>
    </footer>
</template>

<script>
export default {
  props: {
    listData: Array
  },
  methods: {
    handleDel(){
      this.$emit('delList')
    
    }
  }
}
</script>

<style>

</style>

