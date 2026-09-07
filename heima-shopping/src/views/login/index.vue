<template>
    <div class="login">
        <!-- 头部 -->
        <van-nav-bar title="登录页面" left-text="返回" left-arrow @click-left="$router.back()" />

        <!-- 主体 -->
        <div class="container">
            <div class="title">
                <h3>手机号登录</h3>
                <p>未注册的手机号登录后将自动注册</p>
            </div>

            <div class="form">
                <div class="form-item">
                    <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
                </div>
                <div class="form-item">
                    <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
                    <img v-if="picUrl" :src="picUrl" @click="getPicCode" alt="">
                </div>
                <div class="form-item">
                    <input class="inp" v-model="msgCode" placeholder="请输入短信验证码" type="text">
                    <button @click="getCode" >
                        <!-- {{ second === totalSecond ? '获取验证码' : second + '秒后重新发送' }} -->
                        {{ second > 0 ? second + '秒后重新发送' : '获取验证码'  }}
                    </button>
                </div>
            </div>

            <div  @click="login" class="login-btn">登录</div>
        </div>
    </div>
</template>

<script>
import { codeLogin, getMessageCode, getPicCode } from '@/api/login'
// import { Toast } from 'vant'
export default {
  name: 'LoginIndex',
  data () {
    return {
      picCode: '', // 用户输入的图形验证码
      picKey: '', // 图形验证码图片的唯一标识
      picUrl: '',
      totalSecond: 5,
      second: 0,
      timer: null,
      mobile: '',
      msgCode: ''

    }
  },
  created () {
    this.getPicCode()
    console.log(this.$store.state.user.userInfo)
  },
  methods: {
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('手机号码格式有误')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('图像验证码格式有误')
        return false
      }
      return true
    },
    async getPicCode () {
      const res = await getPicCode()
      const { data: { base64, key } } = res
      this.picUrl = base64
      this.picKey = key
      console.log(res)
      //   Toast('sss')
    //   this.$toast('获取成功')
    },
    async getCode () {
      if (!this.validFn()) return
      const res = await getMessageCode(this.picCode, this.picKey, this.mobile)
      console.log(res)
      if (this.second > 0) return
      this.second = this.totalSecond
      if (!this.timer) {
        this.timer = setInterval(() => {
          this.second--
          console.log('倒计时')
          if (this.second < 1) {
            clearInterval(this.timer)
            this.timer = null
            this.second = 0
          }
        }, 1000)
      }
    },
    async login () {
      if (!this.validFn()) return
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('短信验证码不正确')
        return
      }
      const res = await codeLogin(this.mobile, this.msgCode)
      console.log(res)
      this.$store.commit('user/setUserInfo', res.data)
      // 从商品详情页跳转来的
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url)
      this.$toast('登录成功')
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }

}
</script>

<style lang="less" scoped>
.container {
    padding: 49px 29px;

    .title {
        margin-bottom: 20px;

        h3 {
            font-size: 26px;
            font-weight: normal;
        }

        p {
            line-height: 40px;
            font-size: 14px;
            color: #b8b8b8;
        }
    }

    .form-item {
        border-bottom: 1px solid #f3f1f2;
        padding: 8px;
        margin-bottom: 14px;
        display: flex;
        align-items: center;

        .inp {
            display: block;
            border: none;
            outline: none;
            height: 32px;
            font-size: 14px;
            flex: 1;
        }

        img {
            width: 94px;
            height: 31px;
        }

        button {
            height: 31px;
            border: none;
            font-size: 13px;
            color: #cea26a;
            background-color: transparent;
            padding-right: 9px;
        }
    }

    .login-btn {
        width: 100%;
        height: 42px;
        margin-top: 39px;
        background: linear-gradient(90deg, #ecb53c, #ff9211);
        color: #fff;
        border-radius: 39px;
        box-shadow: 0 10px 20px 0 rgba(0, 0, 0, .1);
        letter-spacing: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
