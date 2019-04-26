<template>
    <div class="Bbill_message">
        <div class="info">
            <p>工单号: {{bill_num}}</p>
            <p>序列号: {{code}}</p>
            <p>告警日期: {{date}}</p>
            <!--<p>地址: {{address}}</p>!-->
            <p>故障原因: {{warning_reason}}</p>
        </div>
        <div class="bill_status"
        :class = 'color'>
            {{bill_status}}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Bbill-message',
    props: ['bill_num', 'code', 'date', 'address', 'bill_status', 'warning_reason'],
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

<style scopeds>
.Bbill_message{
    margin: 0 0 0 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    border: 1px dotted black;
    height: 4vw;
    font-size: 0.5vw;
    float: left;
}

.Bbill_message p{
    margin: 0 0 0 0;
}

.Bbill_message .info{
    height: 3.5vw;
    width: 6vw;
}

.Bbill_message .bill_status{
    margin: 1vw 0 0 1vw;
    height: 0.7vw;
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