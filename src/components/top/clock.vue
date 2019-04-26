<template>
    <div class="date-info">
        <div class="date-info__left">{{time}}</div>
        <div class="date-info__right">
            <div>{{date}}</div>
            <!--<div>{{day}}</div>!-->
        </div>
    </div>
</template>
<script>
import moment from 'moment';
export default{
    name: 'clock',
    data(){
        return{
            time:'',
            date:'',
            day:'',
            timeUsed:'',
            timeInterval:null
        }
    },
    created(){
        const momentNow=moment();
        this.date=momentNow.format('YYYY-MM-DD');
        const dayNameMapping=[
            '星期日','星期一','星期二','星期三','星期四','星期五','星期六'
        ];
        this.day=dayNameMapping[momentNow.format('e')];
        this.updateTime();
    },
    methods:{
        updateTime(){
            const _this=this;
            this.timeInterval=setInterval(function(){
                _this.time=moment().format('HH:mm');
            },1000);
        }
    }
}
</script>
<style>
.date-info {
    margin: 1vw 0 0 0.2vw;
    padding-right: 0.3vw;
    display: flex;
    vertical-align: middle;
    flex-direction: row;
}

.date-info__left {
    font-size: 1vw;
    margin-right: 0.2vw;
    color: white;
}
    
.date-info__right {
    margin: 0.1vw 0 0 0;
    font-size: 0.5vw;
    line-height: 1.5em;
    color: white;
}

</style>