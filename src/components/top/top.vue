<template>
    <div class="top">
        <clock></clock>
        <div class="title">{{title}}</div>
        <div class="company_name">{{company_name}}</div>
    </div>
</template>

<script>
import clock from './clock'
export default {
    name: 'top',
    components: {clock},
    data:function(){
        return{
            company_name: 'xx公司',
            title: '城市管井资源监控平台'
        }
    }
}
</script>

<style>
.top{
    margin: 0 0 0 0;
    display: flex;
    flex-direction: row;
    background: url('../../assets/bg.jpeg');
    height: 5%;
}

.title{
    margin: 0.5vw 0 0 35vw;
    color: whitesmoke;
    font-size: 1.5vw;
}

.company_name{
    margin: 1vw 0 0 40vw;
    color: whitesmoke;
    font-size: 1vw;
}

.clock{
    margin: 1vw 0 0 0;
    flex: 1;
}
</style>


