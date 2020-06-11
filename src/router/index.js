import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "../views/Index";
import FlowTrend from "../views/flowAnalysis/FlowTrend";
import About from   "../views/About"
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
        path:"/",
        name:"流量分析",
        component:Index,
        icon:"el-icon-data-analysis",
        show: true,
        redirect:"/FlowTrend",
        children:[
            {
                path:"/flowTrend",
                name:"昨日统计",
                component:FlowTrend,

            },
            {
                path:"/flowTrendByDay",
                name:"历史趋势",
                component:FlowTrendByDay
            }
        ]
    },
    {
        path:"/visitor",
        name:"访客分析",
        component:Index,
        icon:"el-icon-user-solid",
        show:true,
        redirect:"/newUserTrend",
        children:[
            {
                path:"/newUserTrend",
                name:"新老用户",
                component:NewUserTrend,

            },
            {
                path:"/userActivation",
                name:"用户活跃度",
                component:UserActivation
            },
            {
                path:"/userRetention",
                name:"用户留存与跳失",
                component:UserRetention
            },
            {
                path:"/userUsagePeriod",
                name:"用户使用时段",
                component:UserUsagePeriod
            },
            {
                path: "/userValue",
                name:"用户价值",
                component: UserValue
            }

        ]
    },
    {
        path:"/action",
        name:"行为分析",
        component:Index,
        icon:"el-icon-s-platform",
        show:true,
        redirect:"/userBehavior",
        children:[
            {
                path:"/userBehavior",
                name:"行为统计",
                component:UserBehavior,

            },
            {
                path:"/behaviorConversion",
                name:"行为转化率",
                component:BehaviorConversion
            }
        ]
    },
    {
        path:"/sales",
        name:"销售分析",
        component:Index,
        icon:"el-icon-s-finance",
        show:true,
        redirect:"/commodityIndex",
        children:[
            {
                path:"/commodityIndex",
                name:"商品指标",
                component:CommodityIndex,

            },
            {
                path:"/commodityCategoryIndex",
                name:"商品类别指标",
                component:CommodityCategoryIndex
            }
        ]
    },
    {
        path:"/about",
        name:"关于我们",
        component:About,
        icon:"el-icon-info",
        show:true,
        redirect:"/about",
        children:[
            {
                path:"/about",
                name:"关于我们",
                component:About,
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
