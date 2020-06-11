<template>
    <div id="app">
        <el-container>
            <el-header>商品指标</el-header>
        </el-container>
        <span class="demonstration"></span>
        <el-date-picker
                v-model="value1"
                @change="search"
                type="date"
                value-format="yyyy-MM-dd"
                :default-value="timeDefaultShow"
                placeholder="选择日期">
        </el-date-picker>
        <template>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="购买Top10" name="buy" lazy><ve-histogram :data="buy" v-if="'buy' === activeName" :settings="chartSettings"></ve-histogram></el-tab-pane>
                <el-tab-pane label="购物车Top10" name="cart" lazy><ve-histogram :data="cart" v-if="'cart' === activeName" :settings="chartSettings"></ve-histogram></el-tab-pane>
                <el-tab-pane label="收藏Top10" name="fav" lazy><ve-histogram :data="fav" v-if="'fav' === activeName" :settings="chartSettings"></ve-histogram></el-tab-pane>
                <el-tab-pane label="浏览Top10" name="pv" lazy><ve-histogram :data="pv" v-if="'pv' === activeName" :settings="chartSettings"></ve-histogram></el-tab-pane>
            </el-tabs>
        </template>
        <el-table
                :data="tableData"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="itemId"
                    label="商品编号"
            >
            </el-table-column>
            <el-table-column
                    prop="pv"
                    label="浏览"
            >
            </el-table-column>
            <el-table-column
                    prop="cart"
                    label="加购物车"
            >
            </el-table-column>
            <el-table-column
                    prop="fav"
                    label="收藏"
            >
            </el-table-column>
            <el-table-column
                    prop="buy"
                    label="购买"
            >
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        data() {
            this.chartSettings = {
                showLine: ['pv'],
                axisSite: {right: ['pv'], left: ['fav', 'buy', 'cart']},
            }
            return {
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }},
                buy: {
                    columns: ['itemId', 'fav', 'buy', 'cart', 'pv'],
                    rows: []
                },
                cart: {
                    columns: ['itemId', 'fav', 'buy', 'cart', 'pv'],
                    rows: []
                },
                fav: {
                    columns: ['itemId', 'fav', 'buy', 'cart', 'pv'],
                    rows: []
                },
                pv: {
                    columns: ['itemId', 'fav', 'buy', 'cart', 'pv'],
                    rows: []
                },
                timeDefaultShow: '',
                activeName: 'buy',
                value1:'2017-12-03',
                tableData: [],

            }
        },
        mounted() {
            this.timeDefaultShow = new Date("2017-11");
        },
        created() {
            console.log("initializing")
            const _this = this
            axios.get('http://localhost:8181/commodity/buy/2017-12-03').then(function (resp) {
                console.log(resp.data)
                _this.buy.rows = resp.data
                _this.tableData=resp.data
            })

        },
        methods:{
            handleClick(tab, event) {
                this.activeName=tab.name
                const _this = this
                axios.get('http://localhost:8181/commodity/'+tab.name+'/'+this.value1).then(function (resp) {
                    console.log(resp.data)
                    _this.tableData=resp.data
                    if(tab.name==='cart'){
                        _this.cart.rows = resp.data
                        console.log(_this.cart.rows[0])
                    }else if(tab.name==='fav'){
                        _this.fav.rows = resp.data
                        console.log(_this.fav.rows[0])
                    }else if(tab.name==='pv'){
                        _this.pv.rows = resp.data
                        console.log(_this.pv.rows[0])
                    }
                })
            },
            search(theDate) {
                console.log(theDate)
                const _this = this
                axios.get('http://localhost:8181/commodity/'+this.activeName+'/'+theDate).then(function (resp) {
                    _this.buy.rows = resp.data
                    _this.tableData=resp.data
                })
            },
        }
    }
</script>

<style scoped lang="less">
    .el-header{
        background-color: #fafafa;
        color: #010101;
        line-height: 60px;
        font-size: 24px;
    }
</style>