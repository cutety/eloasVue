<template>
    <div>
        <el-container>
            <el-header>行为统计</el-header>
        </el-container>
        <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                :default-value="timeDefaultShow"
                end-placeholder="结束日期"
                @change="search"
        >
        </el-date-picker>
        <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
        <el-table
                :data="tableData"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="dateMonth"
                    label="日期"
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
     <!--   <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="pageSize"
                @current-change="page">
        </el-pagination>-->
    </div>

</template>

<script>
    export default {
        data() {
            this.chartSettings = {
                showLine: ['pv'],
                axisSite: {right: ['pv'], left: ['cart', 'fav', 'buy']},
            }
            return {
                chartData: {
                    columns: ['dateMonth', 'cart', 'fav', 'buy', 'pv'],
                    rows: []
                },
                timeDefaultShow: '',
                value1:['2017-11-25','2017-12-02'],
                value2: '',
                tableData: [],
             /*   pageSize:1,
                total:3*/
            }
        },
        mounted() {
            this.timeDefaultShow = new Date("2017-11");
        },
        created() {
       /*     //初始化表
            console.log("init")
            axios.get('http://localhost:8181/userBehavior/findByPage/0/7').then(function (resp) {
                _this.tableData=resp.data.content
                _this.pageSize = resp.data.size
                _this.total = resp.data.totalElements
                console.log(resp.data)
            })*/
            console.log("initializing")
            const _this = this
            axios.get('http://localhost:8181/userBehavior/findByDate/2017-11-25/2017-12-02').then(function (resp) {
                console.log(resp.data)
                _this.chartData.rows = resp.data
                _this.tableData=resp.data
                console.log(_this.chartData.rows[0])
            })
        },
        methods: {
         /*   page(currentPage){
                const _this = this
                axios.get('http://localhost:8181/userBehavior/findByPage/'+(currentPage-1)+'/7').then(function(resp){
                    console.log(resp)
                    _this.tableData = resp.data.content
                    _this.pageSize = resp.data.size
                    _this.total = resp.data.totalElements
                })
            },*/
            search(theDate)
            {
                console.log(theDate)
                const _this = this
                axios.get('http://localhost:8181/userBehavior/findByDate/' + theDate[0] + '/' + theDate[1]).then(function (resp) {
                    console.log(resp.data)
                    _this.tableData=resp.data
                    _this.chartData.rows = resp.data
                })

            }
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