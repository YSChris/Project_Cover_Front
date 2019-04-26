<template>
    <div class="normal_bill">
        <div class="n_top">
            <p>普通工单</p>
            <div class="normal_count"
            @click = 'showAllType'>
                {{this.count}}
            </div>
        </div>
        <div class="n_mid">
            <Nbill-message v-for = '(item,i) in list'
            :key = "`${i}-${item.F_Id}`"
            v-if = 'showAll||showSelectedBill(item.audited, item.close)'
            :bill_num = item.bill_num
            :code = item.code
            :date = item.date
            :address = item.address
            :audited = item.audited
            :close = item.close
            :apply_reason = item.apply_reason>
            </Nbill-message>
        </div>
        <div class="n_bot">
            <div class = 'bot_sum'>
                <p>未审核: </p>
                <div class="auditing"
                @click = 'selectBillType("未审核")'>
                    {{this.auditing}}
                </div>
            </div>
            <div class = 'bot_sum'>
                <p>已审核: </p>
                <div class="audited"
                @click = 'selectBillType("已审核")'>
                    {{this.audited}}
                </div>
            </div>
            <div class = 'bot_sum'>
                <p>已关闭: </p>
                <div class="close"
                @click = 'selectBillType("已关闭")'>
                    {{this.close}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NbillMessage from './Nbill_message'
export default {
    name: 'normal-bill',
    components: {NbillMessage},
    data: function(){
        return{
            list: [],
            showAll: true,
            selectedBillType: ""
        }
    },
    mounted(){
        this.refresh();
        setInterval(this.refresh, 5000);
    },
    computed: {
        count(){
            return this.list.length;
        },
        auditing(){
            let auditing = 0;
            this.list.forEach(element =>{
                if(!element.audited && !element.close){
                    auditing++;
                }
            });
            return auditing;
        },
        audited(){
            let audited = 0;
            this.list.forEach(element =>{
                if(element.audited && !element.close){
                    audited++;
                }
            });
            return audited;
        },
        close(){
            let close = 0;
            this.list.forEach(element =>{
                if(element.close){
                    close++;
                }
            });
            return close;
        }
    },
    methods: {
        refresh(){
            var _this = this;
            _this.$ajax({
                method: 'get',
                url: 'http://localhost:55354/api/NormalBill/all'
            }).then(function(res){
                //console.log(res.data);
                _this.list = new Array();
                res.data.forEach(element => {
                    _this.list.push({
                        F_Id: element.F_Id,
                        bill_num: element.bill_num,
                        code: element.code,
                        date: element.apply_date.split('T')[0],
                        address: element.name,
                        apply_reason: element.apply_reason,
                        audited: _this.mapStatus(element.auditing),
                        close: _this.mapStatus(element.close)
                    });
                });
            });
        },
        selectBillType(status){
            this.showAll = false;
            this.selectedBillType = status;
        },
        showSelectedBill(audited, close){
            if(this.selectedBillType === '未审核' && !audited && !close){
                return true;
            }
            else if(this.selectedBillType === '已审核' && audited && !close){
                return true;
            }
            else if(this.selectedBillType === '已关闭' && close){
                return true;
            }
            return false;
        },
        showAllType(){
            this.showAll = true;
        },
        mapStatus(status){
            if(status === 'Y'){
                return true;
            }
            else{
                return false;
            }
        }
    }
}
</script>

<style scoped>
.normal_bill{
    margin: 0 0 0 0;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 33.3%;
}

.n_top{
    margin: 0 0 0 0;
    display: flex;
    flex-direction: row;
    max-height: 10%;
    background-color:whitesmoke;
    border: 1px solid black;
    height: 5%;
}

.n_top p{
    margin-left: 2.5vw;
    font-size: 0.8vw;
}

.normal_count{
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

.n_mid{
    margin: 0 0 0 0;
    width: 100%;
    flex-direction: column;
    overflow-y: auto;
    height: 85%;
}

.n_bot{
    margin: 0 0 0 0;
    display: flex;
    flex-direction: column;
    height: 10%;
    border: 1px solid black;
    background-color: whitesmoke;
}

.n_bot p{
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

.bot_sum .auditing{
    background-color: red;
    cursor: pointer;
}

.bot_sum .audited{
    background-color: lightskyblue;
    cursor: pointer;
}

.bot_sum .close{
    background-color: lightgreen;
    cursor: pointer;
}
</style>