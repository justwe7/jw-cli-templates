<template>
  <view class="content">
    <img mode="widthFix" src="/static/logo.jpg" >
    <div class="f-fz-36 f-blod f-text-center" @click="$toast(title)">{{ title }}</div>
    <u-button type="primary"
      class="f-mt-40"
      @click="foo"
      text="确定"></u-button>
  </view>
</template>

<script>
export default {
  data () {
    return {
      title: 'Hello'
    }
  },
  onLoad () {},
  methods: {
    foo () {
      console.log(uni.$globalState.token)
      // console.log(uni.$globalState.loginInfo)
      uni.$globalState.loginInfo = Object.assign(uni.$globalState.loginInfo, { name: 'Messi' })
      uni.$globalState.token = +new Date()
      console.log(uni.$globalState.token)
      uni.$get('/xxx', { a: 2 })
      uni.$post('/yyy', { a: 2 })
      // this.$toast('消息')
      // uni.$toast('消息')
      uni.$loading.show('等待...')
      setTimeout(() => {
        this.$loading.hide()
      }, 2000)
      // this.$location.to('/pages/index/index', { a: 1 })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.content {
  @extend %clearfix;
}
</style>
