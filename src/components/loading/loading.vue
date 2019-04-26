<template>
<div class="loading">
  <p>载入中...</p>
</div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style scoped>
.loading {
  position: fixed;
  left: 0;
  top: 0;
  background: url('../../assets/loading.gif') center center no-repeat #fff;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
}

.loading p{
  font-size: 20px;
  position: absolute;
  left: 48%;
  top: 40%;
}
</style>