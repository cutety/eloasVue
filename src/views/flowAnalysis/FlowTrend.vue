<template>
    <div id="flowTrend">


        <el-container>
            <el-header>昨日统计 <span class="dateValue">2017-12-03</span></el-header>
        </el-container>


            <el-row :gutter="12">
                <el-col :span="6">
                    <el-card shadow="hover" :body-style="{display:'flex',padding:0}">
                        <el-tag>点击量（PV）<br><span class="tagValue">{{pv}}</span></el-tag>

                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover" :body-style="{display:'flex',padding:0}">
                        <el-tag type="success">独立用户（UV）<br><span class="tagValue">{{uv}}</span></el-tag>

                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover" :body-style="{display:'flex',padding:0}">
                        <el-tag type="danger">人均点击量<br><span class="tagValue">{{avgPv.toFixed(2)}}</span></el-tag>

                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover" :body-style="{display:'flex',padding:0}">
                        <el-tag type="warning">跳出率<br><span class="tagValue">{{bounceRate}}</span></el-tag>

                    </el-card>
                </el-col>
            </el-row>

        <div class="line-echarts">
            <div class="line-echarts-ii" id="lineChart"></div>
        </div>
        <el-table
                :data="tableData"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="dateTime"
                    label="时段"
            >
            </el-table-column>
            <el-table-column
                    prop="pv"
                    label="页面访问量"
            >
            </el-table-column>
            <el-table-column
                    prop="uv"
                    label="访问量"
            >
            </el-table-column>
            <el-table-column
                    prop="avgPv"
                    label="人均点击量"
            >
            </el-table-column>
            <el-table-column
                    prop="newUser"
                    label="新增用户数"
            >
            </el-table-column>
            <el-table-column
                    prop="newUserRate"
                    label="新用户所占比例"
            >
            </el-table-column>
            <el-table-column
                    prop="bounceRate"
                    label="跳失率"
            >
            </el-table-column>
        </el-table>
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

        name: 'flwoTrend',
        configData: [],
        props: {
            echartData: { // 折线名
                type: Array,
                default: () => [
                    {
                        text: 'PV',
                        color: '#a245f4', // 折线图颜色
                        dataLsit: [], // 折线图数值
                        getXAxis: []// 目前只支持一条横坐标
                    },
                    {
                        text: 'UV',
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
                value1: '',
                value2: '',
                lineChart: {},
                tableData: [],
                pv: 1,
                uv: 2,
                avgPv: 1,
                bounceRate: 1

            }
        },
        mounted() {
            this.drawLine();
            this.timeDefaultShow = new Date("2017-11");
        },
        methods: {

            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                this.lineChart = echarts.init(document.getElementById('lineChart'));
                // 初始化数据 && 设置窗口自适应大小
                this.lineChart.setOption(this.echartOption, window.onresize = this.lineChart.resize);
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
            axios.get('/flowTrendByDay/history').then(function (resp) {
                const historyData = resp.data
                _this.pv += historyData.pv
                _this.uv += historyData.uv
                _this.bounceRate = historyData.bounceRate
                _this.avgPv = historyData.avgPv
            })
            axios.get('/flowTrend/findYesterday').then(function (resp) {
                console.log(resp.data)
                _this.configData = resp.data
                _this.tableData = resp.data
                let monthArr = []
                let newUserArr = []
                let oldUserArr = []
                _this.configData.forEach((item) => {
                    monthArr.push(item.dateTime)
                    newUserArr.push(item.pv)
                    oldUserArr.push(item.uv)
                })

                console.log(_this.pv)
                _this.echartData[0].getXAxis = monthArr
                _this.echartData[0].dataLsit = newUserArr
                _this.echartData[1].dataLsit = oldUserArr
            })
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
