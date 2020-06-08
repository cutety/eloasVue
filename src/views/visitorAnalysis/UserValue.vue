<template>
    <div>
        <ve-bar :data="chartData" :settings="chartSettings"></ve-bar>
        <ve-pie :data="pieData"></ve-pie>
    </div>
</template>

<script>
    export default {

        data() {

            this.chartSettings = {
                labelMap: {
                    'value': '用户数'
                }
            }
            return {
                chartData: {
                    columns: ['name', 'value'],
                    rows: [{'name': '价值用户', 'value': 1},
                        {'name': '发展用户', 'value': 1},
                        {'name': '保持用户', 'value': 1},
                        {'name': '挽留用户', 'value': 1}]
                },
                pieData: {
                    columns: ['name', 'value'],
                    rows: [{'name': '价值用户', 'value': 1},
                        {'name': '发展用户', 'value': 1},
                        {'name': '保持用户', 'value': 1},
                        {'name': '挽留用户', 'value': 1}]
                }
            }
        },
        created() {
            const _this = this
            axios.get('http://localhost:8181/userValue/get').then(function (resp) {
                console.log(resp.data)
                _this.chartData.rows[0].value = resp.data.valueUsers
                _this.chartData.rows[1].value = resp.data.developUsers
                _this.chartData.rows[2].value = resp.data.keepUsers
                _this.chartData.rows[3].value = resp.data.retainUsers
                _this.pieData.rows[0].value = resp.data.valueUsers
                _this.pieData.rows[1].value = resp.data.developUsers
                _this.pieData.rows[2].value = resp.data.keepUsers
                _this.pieData.rows[3].value = resp.data.retainUsers
            })
            console.log(_this.chartData.rows)
        }
    }
</script>

<style scoped>

</style>