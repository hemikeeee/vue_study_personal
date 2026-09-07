<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />

    <van-search v-model="search" show-action placeholder="请输入搜索关键词" clearable>
      <template #action>
        <div @click="goSearch(search)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history">
      <div class="title">
        <span>最近搜索</span>
        <van-icon name="delete-o" size="16" @click="clearSearch"/>
      </div>
      <div class="list">
        <div class="list-item" v-for="item in history" :key="item" @click="goSearch(item)" >
          {{ item }}
        </div>
        <!-- <div class="list-item" @click="$router.push('/searchlist')">电视</div>
        <div class="list-item" @click="$router.push('/searchlist')">冰箱</div>
        <div class="list-item" @click="$router.push('/searchlist')">手机</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { getSearch, removeSearch, setSearch } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  data () {
    return {
      search: '',
      history: getSearch()
    }
  },
  methods: {
    goSearch (key) {
      if (key !== '') {
        console.log('进行了搜索', key)
        const index = this.history.indexOf(key)
        if (index !== -1) {
          this.history.splice(index, 1)
        }
        this.history.unshift(key)
        setSearch(this.history)
      }
      this.$router.push({
        path: '/searchlist',
        query: {
          search: key
        }
      })
    },
    clearSearch () {
      this.history = []
      removeSearch()
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }

  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }

  ::v-deep .van-icon-arrow-left {
    color: #333;
  }

  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }

  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }

  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
