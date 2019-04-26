<template>
    <div class="broken_bill">
        <div class="b_top">
            <p>故障工单</p>
            <div class="broken_count"
            @click = 'showAllType'>
                {{this.count.all}}
            </div>
        </div>
        <div class="b_mid">
            <Bbill-message v-for = '(item, i) in lowPow'
            v-if = 'showAll||showSelectedBill(item.bill_status)'
            :key = "`${i}-${item.code}`"
            :code = item.code
            :date = item.date
            :bill_status = item.bill_status
            :bill_num = item.bill_num
            :warning_reason = item.warning_reason>
            </Bbill-message>
            <Bbill-message v-for = '(item,i) in list'
            :key = "`${i}-${item.code}`"
            v-if = 'showAll||showSelectedBill(item.bill_status)'
            :bill_num = item.bill_num
            :code = item.code
            :date = item.date
            :address = item.address
            :bill_status = item.bill_status
            :warning_reason = item.warning_reason>
            </Bbill-message>
        </div>
        <div class="b_bot">
            <div class = 'bot_sum'>
                <p>待处理: </p>
                <div class="waiting"
                @click = 'selectBillType("待处理")'>
                    {{this.count.waiting}}
                </div>
            </div>
            <div class = 'bot_sum'>
                <p>已接单: </p>
                <div class="accepted"
                @click = 'selectBillType("已接单")'>
                    {{this.count.accepted}}
                </div>
            </div>
            <div class = 'bot_sum'>
                <p>已完成: </p>
                <div class="done"
                @click = 'selectBillType("已完成")'>
                    {{this.count.done}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BbillMessage from './Bbill_message'
export default {
    name: 'broken-bill',
    components: {BbillMessage},
    data: function(){
        return{
            list: [],
            lowPow:[],
            statusMapping:{
                '0' : '待处理',
                '1' : '已接单',
                '2' : '已完成',
                null : '待处理'
            },
            showAll: true,
            selectedBillType: ""
        }
    },
    computed:{
        count(){
            var waiting = 0, accepted = 0, done = 0;
            this.list.forEach(element =>{
                if(element.bill_status === '已接单'){
                    accepted++;
                }
                else if(element.bill_status === '已完成'){
                    done++;
                }
                else{
                    waiting++;
                }
            })
            let result = {
                all: 0,
                waiting: 0,
                accepted: 0,
                done: 0
            }
            result.all = this.list.length + this.lowPow.length,
            result.waiting = waiting + this.lowPow.length;
            result.accepted = accepted;
            result.done = done;
            return result;
        }
    },
    mounted(){
        var _this = this;
        _this.refresh();
        setInterval(_this.refresh, 5000);
    },
    methods: {
        refresh(){
            var _this = this;
            _this.$ajax({
                method: 'get',
                url: 'http://localhost:55354/api/brokenBill/all'
            }).then(function(res){
                _this.list = new Array();
                res.data.forEach(element => {
                    _this.list.push({
                        bill_num: element.bill_num,
                        code: element.code,
                        date: element.warning_date.split('T')[0],
                        address: element.name,
                        warning_reason: element.warning_reason,
                        bill_status: _this.statusMapping[element.status]
                    });
                });
            });

            this.$ajax({
                method: 'get',
                url: 'http://localhost:55354/api/CoverInfo/lowPower_list'
            })
            .then(function(res){
                _this.lowPow = new Array();    
                res.data.forEach(element => {
                    if(_this.showLowPow(element)){
                        _this.lowPow.push({
                        code: element.code,
                        address: element.name,
                        bill_num: element.bill_num,
                        bill_status: element.bill_status,
                        date: element.warning_date === null? "" : element.warning_date.split('T')[0],
                        warning_reason : element.warning_reason
                        });
                    }
                });
            });
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
        },
        showLowPow(item){
            let index = this.list.findIndex(function(bill){
                return bill.code === item.code;
            });

            if(index == -1 || this.list[index].bill_status === '已完成'){
                return true;
            }
            return false;
        }
    }
}
</script>

<style scoped>
.broken_bill{
    margin: 0 0 0 0;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 33.3%;
}

.b_top{
    margin: 0 0 0 0;
    display: flex;
    flex-direction: row;
    max-height: 10%;
    background-color:whitesmoke;
    border: 1px solid black;
    height: 5%;
}

.b_top p{
    margin-left: 2.5vw;
    font-size: 0.8vw;
}

.broken_count{
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

.b_mid{
    margin: 0 0 0 0;
    width: 100%;
    flex-direction: column;
    overflow-y: auto;
    height: 85%;
}

.b_bot{
    margin: 0 0 0 0;
    display: flex;
    flex-direction: column;
    height: 10%;
    border: 1px solid black;
    background-color: whitesmoke;
}

.b_bot p{
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
