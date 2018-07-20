import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'

Vue.use(Router)

export default new Router({
  //路由默认的激活样式为'router-link-active'，可以修改
  linkActiveClass: 'router-link-active',
  routes: [
    {
      path: '/',
      redirect: '/recommend',   //重定向
    },
    {
      path: '/recommend',
      component: Recommend,
    },
    {
      path: '/singer',
      component: Singer,
    },
    {
      path: '/rank',
      component: Rank,
    },
    {
      path: '/search',
      component: Search,
    },
  ]
})

