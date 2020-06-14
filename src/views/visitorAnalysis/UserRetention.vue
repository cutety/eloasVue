<template>
   <div id="UserRetention">
       <el-container>
           <el-header>用户留存</el-header>
       </el-container>
       <el-table
               empty-text="---"
               :data="tableData"
               stripe
               style="width: 100%">
           <el-table-column
                   prop="firstday"
                   label="首次访问时间"
           >
           </el-table-column>
           <el-table-column
                   prop="newUser"
                   label="新增用户"
           >
           </el-table-column>
           <el-table-column
                   prop="byDay1"
                   label="次日"
           >
           </el-table-column>
           <el-table-column
                   prop="byDay2"
                   label="2日后"
           >
           </el-table-column>
           <el-table-column
                   prop="byDay3"
                   label="3日后"
           >
           </el-table-column>
           <el-table-column
                   prop="byDay4"
                   label="4日后"
           >
           </el-table-column>
           <el-table-column
                   prop="byDay5"
                   label="5日后"
           >
           </el-table-column>
           <el-table-column
                   prop="byDay6"
                   label="6日后"
           >
           </el-table-column>
           <el-table-column
                   prop="byDay7"
                   label="7日后"
           >
           </el-table-column>
           <el-table-column
                   prop="byDay14"
                   label="14日后"
           >
           </el-table-column>
           <el-table-column
                   prop="byDay30"
                   label="30日后"
           >
           </el-table-column>
       </el-table>
   </div>

</template>

<script>
    export default {
        name: 'userRetention',

        data() {
            return {
                tableData: [],
            }
        },
        created() {
            const _this = this

            //初始化表
            console.log("init")
            axios.get('/userRetained/findAll').then(function (resp) {

                _this.tableData=resp.data
                _this.tableData.forEach((item) => {
                    if(item.byDay1==="0.0%"){
                        item.byDay1="—"
                    }
                    if(item.byDay2==="0.0%"){
                        item.byDay2="—"
                    }
                    if(item.byDay3==="0.0%"){
                        item.byDay3="—"
                    }
                    if(item.byDay4==="0.0%"){
                        item.byDay4="—"
                    }if(item.byDay5==="0.0%"){
                        item.byDay5="—"
                    }if(item.byDay6==="0.0%"){
                        item.byDay6="—"
                    }if(item.byDay7==="0.0%"){
                        item.byDay7="—"
                    }if(item.byDay14==="0.0%"){
                        item.byDay14="—"
                    }if(item.byDay30==="0.0%"){
                        item.byDay30="—"
                    }



                })
            })
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
