<template>
  <div class="recommend" >
    <scorll class="recommend-content" :data="discList" ref="scroll">
      <div>
        <div v-if="recommends.length" class="slider-wrapper" >
          <silder>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <!-- 设置class类名为needsClick，fastClick不会阻止点击事件 -->
                <img :src="item.picUrl" alt="" @load="loadImage" class="needsClick">
              </a>
            </div>
          </silder>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item,index) in discList" class="item">
              <div class="icon">
                <img v-lazy="item.imgurl" alt="" width="60" height="60">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading class="loading"></loading>
      </div>
    </scorll>
  </div>
</template>

<script>
  import Loading from 'base/loading/loading'
  import Silder from 'base/slider/slider'
  import Scorll from 'base/scroll/scroll'
  import {getRecommend,getDiscList} from 'api/recommend'
  import {ERR_OK} from 'api/config'

  export default {
    name: "recommend",
    components: {
      Silder,
      Scorll,
      Loading
    },
    data() {
      return {
        recommends: [],
        discList: [],
      }
    },
    created() {
      this._getRecommend();
      this._getDiscList();
    },

    methods: {
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider;
          }
        })
      },
      _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list;
          }
        })
      },
      loadImage() {
        if(!this.checkLoaded) {
          this.$refs.scroll.refresh()
          this.checkLoaded = true;
        }
      }
    }


  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
