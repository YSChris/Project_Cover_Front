<template>
    <div class="message_container">
        <normal-bill></normal-bill>
        <warning-bill></warning-bill>
        <broken-bill></broken-bill>
    </div>
</template>

<script>
import normalBill from './normal_bill'
import warningBill from './WarningBill'
import brokenBill from './BrokenBill'
export default {
    name: 'message-container',
    data: function(){
        return{

        }
    },
    components: {warningBill, brokenBill, normalBill},
    methods:{

    }
}
</script>

<style>
.message_container  {
    margin: 0 0 0 0;
    display: flex;
    flex-direction: row;
    flex:3;
    height: 100%;
    border: 1px solid black;
}
</style>


