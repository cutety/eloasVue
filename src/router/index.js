import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "../views/Index";
import FlowTrend from "../views/flowAnalysis/FlowTrend";
import About from "../views/About";
import Welcome from "../views/Welcome";
import FlowTrendByDay from "../views/flowAnalysis/FlowTrendByDay";
import NewUserTrend from "../views/visitorAnalysis/NewUserTrend";
import UserActivation from "../views/visitorAnalysis/UserActivation";
import UserUsagePeriod from "../views/visitorAnalysis/UserUsagePeriod";
import UserRetention from "../views/visitorAnalysis/UserRetention";
import UserBehavior from "../views/actionAnalysis/UserBehavior";
import BehaviorConversion from "../views/actionAnalysis/BehaviorConversion";
import CommodityIndex from "../views/salesAnalysis/CommodityIndex";
import CommodityCategoryIndex from "../views/salesAnalysis/CommodityCategoryIndex";
import VCharts from 'v-charts'
import UserValue from "../views/visitorAnalysis/UserValue";

Vue.use(VCharts)
Vue.use(VueRouter)

const routes = [
    {
        path: "/Welcome",
        name: "首页",
        component: Welcome,
        meta: {
            title: 'eloas电商日志离线分析系统'
        },
        show: false,
    },
    {
        path: "/",
        name: "流量分析",
        component: Index,
        meta: {
            title: '流量分析'
        },
        icon: "el-icon-data-analysis",
        show: true,
        redirect: "/Welcome",
        children: [
            {
                path: "/flowTrend",
                name: "昨日统计",
                component: FlowTrend,
                meta: {
                    title: '昨日统计'
                },

            },
            {
                path: "/flowTrendByDay",
                name: "历史趋势",
                component: FlowTrendByDay,
                meta: {
                    title: '历史趋势'
                },
            }
        ]
    },

    {
        path: "/visitor",
        name: "访客分析",
        component: Index,
        icon: "el-icon-user-solid",
        show: true,
        redirect: "/newUserTrend",
        children: [
            {
                path: "/newUserTrend",
                name: "新老用户",
                component: NewUserTrend,
                meta: {
                    title: '新老用户'
                },

            },
            {
                path: "/userActivation",
                name: "用户活跃度",
                component: UserActivation,
                meta: {
                    title: '用户活跃度'
                },
            },
            {
                path: "/userRetention",
                name: "用户留存",
                component: UserRetention,
                meta: {
                    title: '用户留存'
                },
            },
            {
                path: "/userUsagePeriod",
                name: "用户使用时段",
                component: UserUsagePeriod,
                meta: {
                    title: '用户使用时段'
                },
            },
            {
                path: "/userValue",
                name: "用户价值",
                component: UserValue,
                meta: {
                    title: '用户价值'
                },
            }

        ]
    },
    {
        path: "/action",
        name: "行为分析",
        component: Index,
        icon: "el-icon-s-platform",
        show: true,
        redirect: "/userBehavior",
        children: [
            {
                path: "/userBehavior",
                name: "行为统计",
                component: UserBehavior,
                meta: {
                    title: '行为统计'
                },

            },
            {
                path: "/behaviorConversion",
                name: "行为转化率",
                component: BehaviorConversion,
                meta: {
                    title: '行为转化率'
                },
            }
        ]
    },
    {
        path: "/sales",
        name: "销售分析",
        component: Index,
        icon: "el-icon-s-finance",
        show: true,
        redirect: "/commodityIndex",
        children: [
            {
                path: "/commodityIndex",
                name: "商品指标",
                component: CommodityIndex,
                meta: {
                    title: '商品指标'
                },

            },
            {
                path: "/commodityCategoryIndex",
                name: "商品类别指标",
                component: CommodityCategoryIndex,
                meta: {
                    title: '商品类别指标'
                },
            }
        ]
    },
    {
        path: "/about",
        name: "关于我们",
        component: About,
        icon: "el-icon-info",
        show: true,
        redirect: "/about",
        children: [
            {
                path: "/about",
                name: "关于我们",
                component: About,
                meta: {
                    title: '关于我们'
                },
            },
            {
                path: "/Welcome",
                name: "欢迎",
                component: Welcome,
                meta: {
                    title: 'eloas电商日志离线分析系统'
                },
            }
        ]
    },



]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
const defaultTitle = 'eloas'
router.beforeEach((to, from, next) => {
    document.title = to.meta.title ? to.meta.title : defaultTitle
    next()
})