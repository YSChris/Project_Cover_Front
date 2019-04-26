<template>
    <div class="info_left">
        <status-card 
        :card_name = this.names.all
        :icon_class = this.icons.all
        :count = this.all
        :styleObj = this.styleObj.all>
        </status-card>
        <status-card 
        :card_name = this.names.nopen
        :icon_class = this.icons.nopen
        :count = this.nopen
        :styleObj = this.styleObj.nopen>
        </status-card>
        <status-card 
        :card_name = this.names.nclose
        :icon_class = this.icons.nclose
        :count = this.nclose
        :styleObj = this.styleObj.nclose>
        </status-card>
        <status-card
        :card_name = this.names.warning
        :icon_class = this.icons.warning
        :count = this.warning
        :styleObj= this.styleObj.warning>
        </status-card>
        <status-card 
        :card_name = this.names.low
        :icon_class = this.icons.low
        :count = this.low
        :styleObj = this.styleObj.low>
        </status-card>
        <!--<monitor>
        </monitor>!-->
    </div>
</template>

<script>
import statusCard from './status_card'
import monitor from './monitor'
export default {
    name: 'left-info-box',
    data: function(){
        return {
            all: 0,
            nopen: 0,
            nclose: 0,
            warning:0,
            low: 0,
            icons:{
                all: 'fa fa-circle-o fa-3x',
                nopen: 'fa fa-stop-circle fa-3x',
                nclose: 'fa fa-stop-circle-o fa-3x',
                warning: 'fa fa-warning fa-3x',
                low: 'fa fa-battery-1 fa-3x'
            },
            names: {
                all: '所有井盖',
                nopen: '正常开启',
                nclose: '正常关闭',
                warning: '非法开启',
                low: '低电量'
            },
            styleObj: {
                all: 'background-color:lightskyblue',
                nopen: 'background-color:lightgreen',
                nclose: 'background-color:lightgreen',
                warning: 'background-color:red;',
                low: 'background-color:red;'
            }
        }
    },
    mounted () {
        this.refresh();
        setInterval(this.refresh, 3000);
    },
    methods: {
        refresh: function(){
            var _this = this;
            this.$ajax({
                method: 'get',
                url: 'http://localhost:55354/api/CoverInfo/status'
            })
            .then(function(res){
                _this.all = res.data[0];
                _this.nopen = res.data[1];
                _this.nclose = res.data[2];
                _this.warning = res.data[3];
                _this.low = res.data[4];
            });
        }
    },
    components:{statusCard,monitor}
}
</script>

<style>
.info_left {
    margin: 0 0 0 0;
    display: flex;
    flex-direction: column;
    flex: 0.5;
    background-color: whitesmoke;
    height: 100%;
    border: 1px solid black;
}
</style>


