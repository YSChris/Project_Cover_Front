<template>
    <div class="monitor_message">
        <p>序列号: {{this.code}}</p>
        <p>地址: {{this.address}}</p>
    </div>
</template>

<script>
export default {
    name:'monitor-message',
    props:['code', 'address']
}
</script>

<style>
.monitor_message{
    margin: 0 0 0 0;
    display: flex;
    flex-direction: column;
    border: 1px dotted black;
    min-height: 70px;
}

.monitor_message p{
    margin: 5px 0 0 0;
}
</style>


