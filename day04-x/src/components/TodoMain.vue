<template>
   <!-- 列表区域 -->
    <section class="main">
      <ul class="todo-list">
        <li class="todo" v-for="(item,index) in listData" :key="item.id">
          <div class="view">
            <span class="index">{{index+1 }}.</span> <label>{{ item.name }}</label>
            <button class="destroy" @click="del(item.id)"></button>
          </div>
        </li>
      </ul>
    </section>
</template>

<script>
export default {
  props: {
    listData: Array
  },
  methods: {
    del(id) {
      this.$emit('delList', id)
    }
  }
}
</script>

<style>

</style>

