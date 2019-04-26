<template>
    <div class="warning_bill">
        <div class="w_top">
            <p>告警工单</p>
            <div class="warning_count"
            @click = 'showAllType'>
                {{this.count}}
            </div>
        </div>
        <div class="w_mid">
            <Wbill-message v-for = '(item,i) in list'
            v-if = 'showAll||showSelectedBill(item.bill_status)'
            :key = "`${i}-${item.code}`"
            :bill_num = item.bill_num
            :code = item.code
            :date = item.date
            :address = item.address
            :bill_status = item.bill_status
            :warning_type = item.warning_type>
            </Wbill-message>
        </div>
        <div class="w_bot">
            <div class = 'bot_sum'>
                <p>待处理: </p>
                <div class="waiting"
                @click = 'selectBillType("待处理")'>
                    {{this.waiting}}
                </div>
            </div>
            <div class = 'bot_sum'
            @click = 'selectBillType("已接单")'>
                <p>已接单: </p>
                <div class="accepted">{{this.accepted}}</div>
            </div>
            <div class = 'bot_sum'>
                <p>已完成: </p>
                <div class="done"
                @click = 'selectBillType("已完成")'>
                    {{this.done}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import WbillMessage from './Wbill_message'
export default {
    name: 'warning-bill',
    components: {WbillMessage},
    data: function(){
        return{
            list: [],
            statusMapping:{
                '0' : '待处理',
                '1' : '已接单',
                '2' : '已完成'
            },
            selectedBillType: "",
            showAll: true
        }
    },
    mounted(){
        var _this = this;
        _this.refresh();
        setInterval(_this.refresh, 5000);
    },
    computed: {
        count(){
            return this.list.length;
        },
        waiting(){
            let waiting = 0;
            this.list.forEach(element =>{
                if(element.bill_status === '待处理'){
                    waiting++;
                }
            });
            return waiting;
        },
        accepted(){
            let accepted = 0;
            this.list.forEach(element =>{
                if(element.bill_status === '已接单'){
                    accepted++;
                }
            });
            return accepted;
        },
        done(){
            let done = 0;
            this.list.forEach(element =>{
                if(element.bill_status === '已完成'){
                    done++;
                }
            });
            return done;
        }
    },
    methods: {
        refresh(){
            var _this = this;
            _this.$ajax({
                method: 'get',
                url: 'http://localhost:55354/api/WarningBill/all'
            }).then(function(res){
                //console.log(res.data);
                _this.list = new Array();
                res.data.forEach(element => {
                    _this.list.push({
                        bill_num: element.bill_num,
                        code: element.code,
                        date: element.warning_date.split('T')[0],
                        address: element.name,
                        warning_type: element.warning_type,
                        bill_status: _this.statusMapping[element.status]
                    });
                });
            })
        },
        selectBillType(status){
            this.showAll = false;
            this.selectedBillType = status;
        },
        showSelectedBill(status){
            if(status === this.selectedBillType){
                return true;
            }
            return false;
        },
        showAllType(){
            this.showAll = true;
        }
    }
}
</script>

<style scoped>
.warning_bill{
    margin: 0 0 0 0;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 33.3%;
}

.w_top{
    margin: 0 0 0 0;
    display: flex;
    flex-direction: row;
    max-height: 10%;
    background-color:whitesmoke;
    border: 1px solid black;
    height: 5%;
}

.w_top p{
    margin-left: 2.5vw;
    font-size: 0.8vw;
}

.warning_count{
    margin: 0.9vw 0 0 0.1vw;
    font-size: 0.5vw;
    color: white;
    background-color: cadetblue;
    border-radius: 100%;
    text-align: center;
    width: 1vw;
    height: 1vw;
    line-height: 1vw;
    cursor: pointer;
}

.w_mid{
    margin: 0 0 0 0;
    width: 100%;
    flex-direction: column;
    overflow-y: auto;
    height: 85%;
}

.w_bot{
    margin: 0 0 0 0;
    display: flex;
    flex-direction: column;
    height: 10%;
    border: 1px solid black;
    background-color: whitesmoke;
}

.w_bot p{
    margin: 0 0 0 0;
   font-size: 0.6vw;
}

.bot_sum{
    margin: 0.5vw 0 0 3vw;
    display: flex;
    flex-direction: row;
    font-size: 0.1vw;
}

.bot_sum div{
    margin: 0 0 0 0.1vw;
    border-radius: 10px;
    line-height: 1vw;
    color: white;
    width: 1.2vw;
    height: 1vw;
    text-align: center;
    font-size: 0.5vw;
}

.bot_sum .waiting{
    background-color: red;
    cursor: pointer;
}

.bot_sum .accepted{
    background-color: lightskyblue;
    cursor: pointer;
}

.bot_sum .done{
    background-color: lightgreen;
    cursor: pointer;
}
</style>

