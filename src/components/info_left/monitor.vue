<template>
    <div class="monitor">
        <div class="monitor_h">
            <div class="button"
            @click = 'select("IO")'
            :class = '{selected: selected === "IO"}'>
                <i class="fa fa-warning fa-2x"></i>
            </div>
            <div class="button"
            @click = 'select("LP")'
            :class = '{selected: selected === "LP"}'>
                <i class="fa fa-battery fa-2x"></i>
            </div>
        </div>
        <div class="lowPowList" 
        v-if = 'this.selected === "LP"'>
            <monitor-message v-for = '(item, i) in lowPowList'
            :key = "`${i}-${item.code}`"
            :code = item.code
            :address = item.address>
            </monitor-message>
        </div>
        <div class="illegalOpenList" 
        v-if = 'this.selected === "IO"'>
            <monitor-message v-for = '(item, i) in illegalOpenList'
            :key = "`${i}-${item.code}`"
            :code = item.code
            :address = item.address>
            </monitor-message>
        </div>
    </div>
</template>

<script>
import monitorMessage from './monitor_message'
import { clearInterval } from 'timers';
export default {
    name: 'monitor',
    data: function(){
        return{
            interval: {},
            lowPowList: [],
            illegalOpenList: [],
            selected: 'IO'
        }
    },
    mounted(){
        this.refresh;
        this.interval = setInterval(this.refresh, 3000);
    },
    components:{monitorMessage},
    computed: {
        title(){
            if(this.selected === 'LP'){
                return '低电量（实时)';
            }
            else{
                return '非法开启（实时）';
            }
        }
    },
    destroyed(){
        clearInterval(this.interval);
    },
    methods: {
        select(option){
            this.selected = option;
        },
        refresh: function(){
            var _this = this;
            this.$ajax({
                method: 'get',
                url: 'http://localhost:55354/api/CoverInfo/lowPower_list'
            })
            .then(function(res){
                _this.lowPowList = new Array();
                res.data.forEach(element => {
                    _this.lowPowList.push({
                        code: element.code,
                        address: element.name
                    })
                });
            });
            this.$ajax({
                method: 'get',
                url: 'http://localhost:55354/api/CoverInfo/illegalOpen_list'
            })
            .then(function(res){
                _this.illegalOpenList = new Array();
                res.data.forEach(element => {
                    _this.illegalOpenList.push({
                        code: element.code,
                        address: element.name
                    })
                });
            });
        }
    }
}
</script>

<style>
.monitor{
    margin: 10px 0 0 0;
    display: flex;
    flex-direction: column;
    height: 400px;
    overflow: auto;
    border-top: 1px solid black;
}

.monitor_h{
    margin: 0 0 0 0;
    display: flex;
    flex-direction: row;
}

.button{
    width: 50%;
    height: 40px;
    cursor: pointer;
}

.button i{
    margin: 10px 0 0 20px;
}

.lowPowList{
    height: 325px;
    overflow: auto;
}

.illegalOpenList{
    height: 325px;
    overflow: auto;
}

.selected{
    background-color: lightgrey;
}
</style>
