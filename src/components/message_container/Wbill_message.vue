<template>
    <div class="Wbill_message">
        <div class="info">
            <p>工单号: {{bill_num}}</p>
            <p>序列号: {{code}}</p>
            <p>告警日期: {{date}}</p>
            <!--<p>地址: {{address}}</p>
            <p>告警类型: {{warning_type}}</p>!-->
        </div>
        <div class="bill_status"
        :class = 'color'>
            {{bill_status}}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Wbill-message',
    props: ['bill_num', 'code', 'date', 'address', 'bill_status', 'warning_type'],
    data: function(){
        return {
            classes: {
                '待处理': 'red',
                '已接单': 'lightskyblue',
                '已完成': 'lightgreen'
            }
        }
    },
    computed: {
        color(){
            return this.classes[this.bill_status];
        }
    }
}
</script>

<style scoped>
.Wbill_message{
    margin: 0 0 0 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    border: 1px dotted black;
    height: 5vw;
    font-size: 0.5vw;
    float: left;
}

.Wbill_message p{
    margin: 0 0 0 0;
}

.Wbill_message .info{
    height: 3vw;
    width: 5vw;
}

.Wbill_message .bill_status{
    margin: 1vw 0 0 1vw;
    height: .7vw;
    width: 1.5vw;
    border-radius: 5px;
    color: white;
}

.red{
    background-color: red;
}

.lightskyblue{
    background-color: lightskyblue;
}

.lightgreen{
    background-color: lightgreen;
}
</style>


