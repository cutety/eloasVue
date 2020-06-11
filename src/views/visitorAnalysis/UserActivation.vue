<template>
    <div>
        <el-container>
            <el-header>昨日关键指标 <span class="dateValue">2017-12-03</span></el-header>
        </el-container>
        <el-row :gutter="12">
            <el-col :span="6">
                <el-card shadow="hover" :body-style="{display:'flex',padding:0}">
                    <el-tag>日活跃用户数（DAU）<br><span class="tagValue"> {{dau}}</span></el-tag>

                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover" :body-style="{display:'flex',padding:0}">
                    <el-tag type="success">周活跃用户数 （WAU）<br><span class="tagValue">{{wau}}</span></el-tag>

                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover" :body-style="{display:'flex',padding:0}">
                    <el-tag type="danger">月活跃用户数 （MAU）<br><span class="tagValue">{{mau}}</span></el-tag>

                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover" :body-style="{display:'flex',padding:0}">
                    <el-tag type="warning">用户粘性(DAU/MAU)<br><span class="tagValue">{{(dm).toFixed(2)}}</span></el-tag>

                </el-card>
            </el-col>
        </el-row>
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
        <ve-line :data="chartData" :settings="chartSettings"></ve-line>
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
                    prop="dau"
                    label="DAU （日活跃用户数）"
            >
            </el-table-column>
            <el-table-column
                    prop="wau"
                    label="WAU （周活跃用户数）"
            >
            </el-table-column>
            <el-table-column
                    prop="mau"
                    label="MAU （月活跃用户数）"
            >
            </el-table-column>
            <el-table-column
                    prop="dm"
                    label="DAU/MAU （用户粘性）"
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
    export default {
        name: "UserActivation",
        data() {
            this.chartSettings = {
                yAxisName:['数值','用户粘性'],
                axisSite: {right: ['dauDivMau'], left: ['dau', 'wau', 'mau']},
                legendName: {
                    'dauDivMau': '用户粘性'
                }
            }
            return {
                chartData: {
                    columns: ['dateMonth', 'dau', 'wau', 'mau', 'dauDivMau'],
                    rows: []
                },
                timeDefaultShow: '',
                value1:['2017-11-25','2017-12-02'],
                value2: '',
                tableData: [],
             /*   pageSize:1,
                total:3,*/
                dau: 1,
                dm: 2,
                dw: 1,
                mau: 1,
                wau: 1
            }
        },
        mounted() {
            this.timeDefaultShow = new Date("2017-11");
        },

        created() {
            const _this = this
            axios.get('http://localhost:8181/userAct/findYesterday').then(function (resp) {
                console.log(resp.data)
                const yesterdayData = resp.data
                _this.dau = yesterdayData.dau
                _this.dm = yesterdayData.dm
                _this.dw = yesterdayData.dw
                _this.mau = yesterdayData.mau
                _this.wau = yesterdayData.wau
            })
/*            //初始化表
            console.log("init")
            axios.get('http://localhost:8181/userAct/findByPage/0/7').then(function (resp) {
                const dauDivMauArr=[]
                console.log(resp.data.content)
                _this.tableData=resp.data.content
                _this.pageSize = resp.data.size
                _this.total = resp.data.totalElements
                _this.tableData.forEach(item=>{
                    item['dauDivMau']=item.dau/item.mau
                })
            })*/
            axios.get('http://localhost:8181/userAct/findByDate/2017-11-25/2017-12-02').then(function (resp) {
                console.log(resp.data)
                _this.chartData.rows = resp.data
                _this.tableData=resp.data
                console.log(_this.tableData[0].dm)
            })
        },
        methods: {
     /*       page(currentPage){
                const _this = this
                axios.get('http://localhost:8181/userAct/findByPage/'+(currentPage-1)+'/7').then(function(resp){
                    _this.tableData = resp.data.content
                    _this.pageSize = resp.data.size
                    _this.total = resp.data.totalElements
                    _this.tableData.forEach(item=>{
                        item['dauDivMau']=(item.dau/item.mau)
                        console.log(item['dauDivMau'])
                    })
                })
            },*/
            search(theDate)
            {
                console.log(theDate)
                const _this = this
                axios.get('http://localhost:8181/userAct/findByDate/' + theDate[0] + '/' + theDate[1]).then(function (resp) {
                    console.log(resp.data)
                    _this.chartData.rows = resp.data
                    _this.tableData=resp.data
                })

            }
        }
    }
</script>

<style scoped lang="less">
    .el-tag {
        height: 75px;
        width: 100%;
        font-size:16px;
        text-align: center;
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