<template>
    <div class="warning_message">
        <p>序列号: {{this.code}}</p>
        <p>最后上报日期: {{this.date}}</p>
        <p>地址: {{this.address}}</p>
    </div>
</template>

<script>
export default {
    name: 'warning-message',
    props: ['code', 'date', 'address']
}
</script>

<style>
.warning_message{
    margin: 0 0 0 0;
    display: flex;
    flex-direction: column;
    border: 1px dotted black;
    flex: 4;
    background-color: white;
}

.warning_message p{
    margin: 0 0 0 0;
}
</style>