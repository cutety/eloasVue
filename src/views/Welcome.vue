<template>
    <div>
        <div class="detail-list">
        <ul>
            <li>
                <img src="https://i.loli.net/2020/06/18/ZQcEsRnvag1zNu8.png" />
                <h3>项目介绍</h3>
                <p>该项目的目的是通过对电商平台的生产日志进行定时的离线分析并将分析结果进行可视化展示，为后期平台内部决策提供数据支持</p>
            </li>

            <li>
                <img src="https://i.loli.net/2020/06/18/4EkhV6P8qpm2dvg.png" />
                <h3>Flume</h3>
                <p>使用Flume进行日志的传输</p>
            </li>
            <li>
                <img src="https://i.loli.net/2020/06/18/hIymDnkQgN9LfMB.png" />
                <h3>Hadoop</h3>
                <p>HDFS作为分布式文件存储系统用于存储大量生产日志,使用分布式计算框架MapReduce进行数据清洗以及分析</p>
            </li>

            <li>
                <img src="https://i.loli.net/2020/06/18/GN2CUYnHuOaAZt3.png" />
                <h3>Hive</h3>
                <p>Hive提供类SQL语句的编程接口来代替编写MR程序</p>
            </li>
            <li>
                <img src="https://i.loli.net/2020/06/18/nS7Fe6AxtlwXLvh.png" />
                <h3>漏斗模型</h3>
                <p>项目采用AARRR漏斗模型对日志进行模块化分析</p>
            </li>
            <li>
                <img src="https://i.loli.net/2020/06/18/8IFOadpP5j3WrHx.jpg" />
                <h3>算法</h3>
                <p>采用KMeans聚类算法+RFM模型对用户价值进行分析.</p>
            </li>

        </ul>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Welcome"
    }
</script>

<style scoped lang="less">
    .intro{
        text-align: center;
        font-size: 200%;
    }



    * {margin: 0; padding: 0;}

    div {
        margin: 20px;
    }

    ul {
        list-style-type: none;
        width: 100%;
    }

    h3 {
        font: bold 20px/1.5 Helvetica, Verdana, sans-serif;
    }

    li img {
        float: left;
        margin: 0 15px 0 0;
    }

    li p {
        font: 200 12px/1.5;
    }

    li {
        padding: 10px;
        overflow: auto;
    }

    li:hover {

        cursor: pointer;
        font-size: 27px;
        background: #f6f6f6;
    }
    .detail-list{
        margin-left: 30%;
    }
    li  {
        text-decoration: none;
        color: #000;
        display: block;
        width: 100%;
        -webkit-transition: font-size 0.3s ease, background-color 0.3s ease;
        -moz-transition: font-size 0.3s ease, background-color 0.3s ease;
        -o-transition: font-size 0.3s ease, background-color 0.3s ease;
        -ms-transition: font-size 0.3s ease, background-color 0.3s ease;
        transition: font-size 0.3s ease, background-color 0.3s ease;
    }


</style>