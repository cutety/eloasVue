<template>
    <div>
        <el-container>
            <el-header>行为转化率</el-header>
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
        <ve-funnel :data="chartData" :settings="chartSettings"></ve-funnel>
        <el-table
                :data="tableData"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="event"
                    label="事件"
            >
            </el-table-column>
            <el-table-column
                    prop="behavior"
                    label="行为统计"
            >
            </el-table-column>
            <el-table-column
                    prop="lastConversion"
                    label="上一步转化率"
            >
            </el-table-column>
            <el-table-column
                    prop="totalConversion"
                    label="总体转化率"
            >
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            this.chartSettings = {
                sequence: ['pvSum', 'cartFavSum', 'buySum']
            }
            return {
                chartData: {
                    columns: ['name', 'value'],
                    rows: [{'name': 'pvSum', 'value': 1},
                        {'name': 'cartFavSum', 'value': 1},
                        {'name': 'buySum', 'value': 1}]
                },
                timeDefaultShow: '',
                value1:['2017-11-25','2017-12-02'],
                value2: '',
                tableData: [{'event': '','behavior': '','lastConversion': '','totalConversion': ''},
                    {'event': '','behavior': '','lastConversion': '','totalConversion': ''},
                    {'event': '','behavior': '','lastConversion': '','totalConversion': ''}],
            }
        }
        ,
        mounted() {
            this.timeDefaultShow = new Date("2017-11");
        }
        ,
        created() {
            const _this = this
            //初始化表
            axios.get('/behaviorConversion/findByDate/2017-11-25/2017-11-27').then(function (resp) {
                _this.chartData.rows[0].value = resp.data[0].pvSum
                _this.chartData.rows[1].value = resp.data[0].cartFavSum
                _this.chartData.rows[2].value = resp.data[0].buySum
                const temp = resp.data
                const eventArr = ['浏览', '收藏/购物车', '购买']
                const behaviorArr = []
                const lastConversionArr = []
                const totalConversionArr = []
                for (let i = 0; i <3; i++) {
                    _this.tableData[i].event = eventArr[i]
                }
                temp.forEach(item => {
                    behaviorArr.push(item.pvSum)
                    behaviorArr.push(item.buySum)
                    behaviorArr.push(item.cartFavSum)
                    lastConversionArr.push(item.pvLastConversionRate)
                    lastConversionArr.push(item.cartFavLastConversionRate)
                    lastConversionArr.push(item.buyLastConversionRate)
                    totalConversionArr.push(item.pvTotalConversionRate)
                    totalConversionArr.push(item.cartFavTotalConversionRate)
                    totalConversionArr.push(item.buyTotalConversionRate)
                })
                for (let i = 0; i < 3; i++) {
                    _this.tableData[i].behavior = behaviorArr[i]
                    _this.tableData[i].lastConversion = lastConversionArr[i]
                    _this.tableData[i].totalConversion = totalConversionArr[i]
                }
                console.log("table data")
                console.log(_this.tableData)
            })

        }
        ,
        methods: {
            search(theDate) {
                console.log(theDate)
                const _this = this
                axios.get('/behaviorConversion/findByDate/' + theDate[0] + '/' + theDate[1]).then(function (resp) {
                    _this.chartData.rows[0].value = resp.data[0].pvSum
                    _this.chartData.rows[1].value = resp.data[0].cartFavSum
                    _this.chartData.rows[2].value = resp.data[0].buySum
                    const temp = resp.data
                    const eventArr = ['浏览', '收藏加购物车', '购买']
                    const behaviorArr = []
                    const lastConversionArr = []
                    const totalConversionArr = []
                    for (let i = 0; i <3; i++) {
                        _this.tableData[i].event = eventArr[i]
                    }
                    temp.forEach(item => {
                        behaviorArr.push(item.pvSum)
                        behaviorArr.push(item.buySum)
                        behaviorArr.push(item.cartFavSum)
                        lastConversionArr.push(item.pvLastConversionRate)
                        lastConversionArr.push(item.cartFavLastConversionRate)
                        lastConversionArr.push(item.buyLastConversionRate)
                        totalConversionArr.push(item.pvTotalConversionRate)
                        totalConversionArr.push(item.cartFavTotalConversionRate)
                        totalConversionArr.push(item.buyTotalConversionRate)
                    })
                    for (let i = 0; i < 3; i++) {
                        _this.tableData[i].behavior = behaviorArr[i]
                        _this.tableData[i].lastConversion = lastConversionArr[i]
                        _this.tableData[i].totalConversion = totalConversionArr[i]
                    }
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