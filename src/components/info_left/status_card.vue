<template>
    <div class = 'status_card'>

        <div style = 'display:flex; flex-direction: column; width: 40%'>
            <i :class = 'getClass()'></i>
            <div class="card_name">{{card_name}}</div>
        </div>
        <div class="count"
        :style = styleObj>{{count}}
        </div>
    </div>
</template>

<script>
export default {
    name: 'status-card',
    props:['icon_class', 'card_name', 'count', 'styleObj'],
    methods: {
        getClass: function(){
            return this.icon_class;
        }
    }
}
</script>

<style>
.status_card{
    margin: 1vw 0 0 0.5vw;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 1vw;
}

.status_card i{
    margin: 0 0 0 40%;
}

.card_name{
    margin: 0 0 0 0;
    text-align: center;
    font-size: 0.5vw;
}

.count{
    margin: .5% 0 0 0;
    color: white;
    border-radius: 2vw;
    width: 1vw;
    height: 1vw;
    text-align:center;
    font-size: 0.5vw;
    line-height: 1vw;
}

</style>