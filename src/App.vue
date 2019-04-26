<template>
	<div id="app">
		<transition name="fade">
      		<loading v-if="isLoading"></loading>
    	</transition>
		<top></top>
    	<div class="main">
			<info-left></info-left>
			<bMap></bMap>
			<message-container></message-container>
    	</div>
	</div>
</template>

<script>
import top from './components/top/top'
import infoLeft from './components/info_left/info_left'
import bMap from './components/bMap/bMap'
import messageContainer from './components/message_container/message_container'
import loading from './components/loading/loading'
export default {
	name: 'App',
	components: {infoLeft, top, bMap, messageContainer, loading},
	data: function(){
		return {
			isLoading: true
		}
	},
	mounted(){
		setTimeout(() => {
			this.isLoading = false;
		}, 3000);
	}
}
</script>

<style>
#app {
	margin: 0 0 0 0;
	display: flex;
	flex-direction: column;
	height: 2160px;
}

.top{
	margin: 0 0 0 0;
	height: 10%;
}

.main{
	margin: 0 0 0 0;
	height: 95%;
	display: flex;
	flex-direction: row;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
</style>
