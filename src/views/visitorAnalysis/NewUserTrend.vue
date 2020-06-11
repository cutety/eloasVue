<template>
    <div class="line-echarts">
        <el-container>
            <el-header>新老用户 </el-header>
        </el-container>
        <div class="block">
            <span class="demonstration"></span>
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
        </div>
        <div class="line-echarts-ii" id="lineChart"></div>
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
                    prop="newUser"
                    label="新用户数"
            >
            </el-table-column>
            <el-table-column
                    prop="newUserRate"
                    label="新用户占比"
                   >
            </el-table-column>
            <el-table-column
                    prop="oldUser"
                    label="老用户数"
                    >
            </el-table-column>
            <el-table-column
                    prop="oldUserRate"
                    label="老用户占比"
                  >
            </el-table-column>
        </el-table>
    <!--    <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="pageSize"
                @current-change="page">
        </el-pagination>-->
    </div>

</template>

<script>
    // 按需加载echarts 参考：https://github.com/apache/incubator-echarts/blob/master/index.js
    // 使用require方式命名更方便一些
    // 引入基本模板
    let echarts = require('echarts/lib/echarts');
    // 引入柱状图组件
    // require('echarts/lib/chart/bar');
    // 引入折线图组件
    require('echarts/lib/chart/line');

    // 引入提示框
    require('echarts/lib/component/tooltip');
    // 引入title组件
    // require('echarts/lib/component/title');
    // 引入图标
    require("echarts/lib/component/legend");
    export default {
        name: 'LineEcharts',
        configData: [],
        props: {
            echartData: { // 折线名
                type: Array,
                default: () => [
                    {
                        text: '新用户',
                        color: '#45a8f4', // 折线图颜色
                        dataLsit: [], // 折线图数值
                        getXAxis: []// 目前只支持一条横坐标
                    },
                    {
                        text: '老用户',
                        color: '#27d42d', // 折线图颜色
                        dataLsit: [],// 折线图数值
                        getXAxis: []
                    }
                ]
            }
        },

        data() {
            return {
                pickerBeginDateBefore: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                timeDefaultShow: '',
                value1:['2017-11-25','2017-12-02'],
                value2: '',
                lineChart: {},
                tableData: [],
                pageSize:1,
                total:3

            }
        },
        mounted() {
            this.drawLine();
            this.timeDefaultShow = new Date("2017-11");
        },
        methods: {
         /*   page(currentPage){
                const _this = this
                axios.get('http://localhost:8181/newUser/findByPage/'+(currentPage-1)+'/7').then(function(resp){
                    console.log(resp)
                    _this.tableData = resp.data.content
                    _this.pageSize = resp.data.size
                    _this.total = resp.data.totalElements
                })
            },*/
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                this.lineChart = echarts.init(document.getElementById('lineChart'));
                // 初始化数据 && 设置窗口自适应大小
                this.lineChart.setOption(this.echartOption, window.onresize = this.lineChart.resize);
            },
            search(theDate) {
                console.log(theDate)
                const _this = this
                axios.get('http://localhost:8181/newUser/findByDate/' + theDate[0] + '/' + theDate[1]).then(function (resp) {
                    console.log(resp)
                    _this.configData = resp.data
                    _this.tableData=resp.data
                    let monthArr = []
                    let newUserArr = []
                    let oldUserArr = []
                    _this.configData.forEach((item) => {
                        monthArr.push(item.dateMonth)
                        newUserArr.push(item.newUser)
                        oldUserArr.push(item.oldUser)
                    })
                    _this.echartData[0].getXAxis = monthArr
                    _this.echartData[0].dataLsit = newUserArr
                    _this.echartData[1].dataLsit = oldUserArr

                })
            },

        },


        watch: {
            echartOption(newVal, oldVal) {
                let newOption = JSON.stringify(newVal);
                let oldOption = JSON.stringify(oldVal);
                // newVal ，oldVal无function类型，故转化为string来深层对比
                if (newOption !== oldOption) {
                    // 数据更改时更新echart
                    console.log('updateEchart');
                    this.lineChart.setOption(this.echartOption);
                }
            }
        },
        computed: {
            echartOption() {
                let seriesArr = []
                this.echartData.forEach((item) => {
                    seriesArr.push({
                        name: item.text,
                        type: 'line',
                        smooth: false, // 平滑
                        itemStyle: {
                            normal: {
                                color: item.color, // 设置折线折点颜色
                                lineStyle: {
                                    color: item.color  // 设置折线线条颜色
                                }
                            }
                        },
                        data: item.dataLsit
                    });
                });

                return {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        // x: '0px',图标位置
                        y: '400px',
                        data: this.echartData.map(item => item.text) // 图标名字
                    },
                    grid: {  // echart四边距离
                        top: '20px',
                        left: '1%',
                        right: '2%',
                        bottom: '30px',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.echartData[0].getXAxis // 横坐标都一样。故取默认第一个
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: seriesArr
                }
            }
        },
        created() {
            const _this = this
            axios.get('http://localhost:8181/newUser/findByDate/' + '2017-11-25' + '/' + '2017-12-02').then(function (resp) {
                console.log(resp)
                _this.configData = resp.data
                _this.tableData=resp.data
                let monthArr = []
                let newUserArr = []
                let oldUserArr = []
                _this.configData.forEach((item) => {
                    monthArr.push(item.dateMonth)
                    newUserArr.push(item.newUser)
                    oldUserArr.push(item.oldUser)
                })
                _this.echartData[0].getXAxis = monthArr
                _this.echartData[0].dataLsit = newUserArr
                _this.echartData[1].dataLsit = oldUserArr
            })
           /* //初始化表
            console.log("init")
            axios.get('http://localhost:8181/newUser/findByPage/0/7').then(function (resp) {
                _this.tableData=resp.data.content
                _this.pageSize = resp.data.size
                _this.total = resp.data.totalElements
                console.log(resp.data)
            })*/
        }
    }

</script>

<style scoped lang="less">
    .line-echarts {
        .line-echarts-ii {
            width: 100%;
            height: 420px;
        }
    }
    .el-tag {
        height: 75px;
        width: 100%;
        font-size:16px;
        text-align: center;
    }
    .tagValue{
        font-size: 30px;
    }
    .el-header{
        background-color: #fafafa;
        color: #010101;
        line-height: 60px;
        font-size: 24px;
    }
    .dateValue{
        font-size: 12px;

    }
</style>
