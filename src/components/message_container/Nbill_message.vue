<template>
    <div class="Nbill_message">
        <div class="info">
            <p>工单号: {{bill_num}}</p>
            <p>序列号: {{code}}</p>
            <p>申请日期: {{date}}</p>
        <!--<p>地址: {{address}}</p>!-->
            <p>申请原因: {{apply_reason}}</p>
        </div>
        <div class = 'bill_status'
        :class = 'mapColor'>
            {{getStatus()}}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Nbill-message',
    props: ['bill_num', 'code', 'date', 'address', 'audited', 'close', 'apply_reason'],
    computed: {
        mapColor(){
            if(this.close){
                return 'lightgreen';
            }
            else if(this.audited){
                return 'lightskyblue';
            }
            else{
                return 'red';
            }
        }
    },
    methods:{
        getStatus(){
            if(this.close){
                return '已关闭';
            }
            else if(this.audited){
                return '已审核';
            }
            else{
                return '未审核';
            }
            
        }
    }
}
</script>

<style scoped>
.Nbill_message{
    margin: 0 0 0 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    border: 1px dotted black;
    height: 4vw;
    font-size: 0.5vw;
    float: left;
}

.Nbill_message p{
    margin: 0 0 0 0;
}

.Nbill_message .bill_status{
    margin: 1vw 0 0 1vw;
    height: 0.7vw;
    width: 1.5vw;
    border-radius: 5px;
    color: white;
}

.Nbill_message .info{
    height: 5vw;
    width: 5vw;
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