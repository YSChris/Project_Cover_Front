<template>
    <div class="warning">
        <div class="illegal_open">
            <div class="hh">
                <p>非法开启</p>
                <div class="illegal_open_count">{{illegal_open_count}}</div>
            </div>
            <div class="illegal_open_list">
                <warning-message v-for = '(item,i) in illegalOpen'
                :key = "`${i}-${item.code}`"
                :code = item.code
                :date = item.upload_date
                :address = item.address>
                </warning-message>
            </div>
        </div>
        <div class="low_power">
            <div class="hh">
                <p>低电量</p>
                <div class="low_power_count">{{low_power_count}}</div>
            </div>
            <div class="low_power_list">
                <warning-message v-for = '(item,i) in lowPower'
                :key = "`${i}-${item.code}`"
                :code = item.code
                :date = item.upload_date
                :address = item.address>
                </warning-message>
            </div>
        </div>
    </div>
</template>

<script>
import warningMessage from './warning_message'
export default {
    name: 'warning',
    mounted(){

    },
    data: function(){
        return {
            illegalOpen: [],
            lowPower: []
        }
    },
    computed:{
        low_power_count(){
            return this.lowPower.length;
        },
        illegal_open_count(){
            return this.illegalOpen.length;
        }
    },
    components: {warningMessage},
    mounted(){
        this.refresh();
        setInterval(this.refresh, 5000);
    },
    methods: {
        refresh(){
            var _this = this;
            this.$ajax({
                method: 'get',
                url: 'http://localhost:55354/api/CoverInfo/illegalOpen_list'
            })
            .then(function(res){
                _this.illegalOpen = new Array();
                res.data.forEach(element => {
                    _this.illegalOpen.push({
                        code: element.code,
                        address: element.name,
                        upload_date: element.newest_uploadTime.split('T')[0]
                    })
                });
            });
            this.$ajax({
                method: 'get',
                url: 'http://localhost:55354/api/CoverInfo/lowPower_list'
            })
            .then(function(res){
                _this.lowPower = new Array();
                res.data.forEach(element => {
                    _this.lowPower.push({
                        code: element.code,
                        address: element.name,
                        upload_date: element.newest_uploadTime.split('T')[0]
                    })
                });
            });
        }
    }
}
</script>

<style>
.warning{
    margin: 0 0 0 0 ;
    display: flex;
    flex-direction: column;
    height: 680px;
    width: 33%;
}

.hh{
    margin: 0 0 0 0;
    display: flex;
    flex-direction: row;
    height: 20%;
    font-size: 20px;
    background-color:whitesmoke;
    border: 1px solid black;
}

.hh p{
    margin-left: 70px;
    height: 10%;
}

.illegal_open_count{
    margin: 20px 0 0 10px;
    font-size: 15px;
    color: white;
    background-color: cadetblue;
    border-radius: 100%;
    text-align: center;
    width: 30px;
    height: 30px;
    line-height: 30px;
}

.low_power_count{
    margin: 20px 0 0 10px;
    font-size: 15px;
    color: white;
    background-color: cadetblue;
    border-radius: 100%;
    text-align: center;
    width: 30px;
    height: 30px;
    line-height: 30px;
}

.illegal_open{
    margin: 0 0 0 0;
    display: flex;
    flex-direction: column;
    height: 50%;
}

.illegal_open_list{
    margin: 0 0 0 0;
    display: flex;
    flex-direction: column;
    height: 80%;
    overflow-y: auto;
}

.low_power{
    margin: 0 0 0 0;
    display: flex;
    flex-direction: column;
    height: 50%;
}

.low_power_list{
    margin: 0 0 0 0;
    display: flex;
    flex-direction: column;
    height: 80%;
    overflow-y: auto;
}

</style>


