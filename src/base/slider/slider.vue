<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :class="{active:currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {addClass} from "common/js/dom";

  export default {
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    props: {
      //是否循环轮播
      loop: {
        type: Boolean,
        dafault: true
      },
      //是否自动轮播
      autoPlay: {
        type: Boolean,
        default: true
      },
      //自动轮播间隔
      interval: {
        type: Number,
        default: 4000
      }
    },
    mounted() {
      //浏览器刷新，通常17ms一次，这里延时器设置为20ms,这算是一个小经验
      setTimeout(() => {
        this._setSliderWidth();
        this._initDots();
        this._initSlider();
        //如果autoPlay存在，则自动播放，调用_play方法
        if(this.autoPlay) {
          this._play()
        }
      }, 20);
      //监听页面大小变化，重新给slider赋值宽度，重新计算
      window.addEventListener('resize', () => {
        if(!this.slider) {
          return;
        }
        this._setSliderWidth(true);
        this.slider.refresh()
      })
    },
    methods: {
      //设置slider宽度
      _setSliderWidth (isResize) {
        this.children = this.$refs.sliderGroup.children;
        let width = 0;
        let sliderWidth = this.$refs.slider.clientWidth;
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i];
          addClass(child, 'slider-item');
          child.style.width = sliderWidth + 'px';
          width += sliderWidth;
        }
        //如果循环轮播，前后克隆两个图片，这是轮播导致的
        // if (this.loop && !isResize) {
        //   width += 2 * sliderWidth
        // }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      //初始化dots
      _initDots() {
        this.dots = new Array(this.children.length);
      },
      //初始化slider
      _initSlider () {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,  //是否开启动画，关闭可以提高效率
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400,
          //click事件可能会与fastClick插件冲突，如果有冲突，注释掉
          click: true,
        });

        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX;
          // if(this.loop) {
          //   pageIndex -= 1
          // }
          this.currentPageIndex = pageIndex;

          if(this.autoPlay) {
            clearTimeout(this.timer);
            this._play()
          }
        })
      },
      //自动播放
      _play() {
        // let pageIndex = this.currentPageIndex + 1;
        // if(this.loop) {
        //   pageIndex += 1;
        // }
        let pageIndex = pageIndex = this.currentPageIndex + 1;
        if(this.currentPageIndex === 4) {
          pageIndex = 0;
        }
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0 ,400)
        },this.interval)
      }
    },
    destroyed() {
      clearTimeout(this.timer);
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
