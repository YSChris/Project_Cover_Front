<template>
  <baidu-map class="bm-view" 
  ak="d9qlxXZ7PtYcsH09bqRTAbdSjrK9Iwhb" 
  @ready = 'handler'
  :center = 'center'
  :zoom = 'zoom'>
    <bm-marker
    v-for = '(info,i) in lableInfo'
    :key = "`${i}-${info.code}`"
    :icon = getIcon(info.status)
    :position = info.point
    @click="lableClicked(info.code)">
    </bm-marker>
    <bm-info-window :position= this.selectedLable.point 
    :show="this.show" 
    @close="infoWindowClose" 
    @open="infoWindowOpen">
      <p>序列号: {{this.selectedLable.code}}</p>
      <p>锁号: {{this.selectedLable.lock_num}}</p>
      <p>地址: {{this.selectedLable.name}}</p>
      <p>状态: {{this.selectedLable.status}}</p>
      <p>电量: {{this.selectedLable.vol_status}}</p>
      <p>IMSI码: {{this.selectedLable.IMSI}}</p>
      <p>板号: {{this.selectedLable.board}}</p>
      <p>设备类型: {{this.selectedLable.device_type}}</p>
    </bm-info-window>
    <div class="search">
      <input type="text" 
      placeholder="序列号"
      ref = 'input'>
      <div class="b" 
      @click = 'search'
      :class = '{c:this.searched}'>搜索
      </div>
    </div>
  </baidu-map>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import bmMarker from 'vue-baidu-map/components/overlays/Marker'
import bmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow'
import { request } from 'http';
export default {
  name:'bMap',
  data () {
    return {
      center: {lng: 0, lat: 0},
      zoom: 16,
      show: true,
      lableInfo: [],
      selectedLable: {},
      inputValue: "",
      searched: false,
      iconObjO: {url: require('../../assets/open.png'), size:{width: 50, height: 50}},
      iconObjC: {url: require('../../assets/close.png'), size:{width: 50, height: 50}}
    }
  },
  components: {
    BaiduMap,bmMarker,bmInfoWindow
  },
  mounted(){
    this.getLableInfo();
    setInterval(this.getLableInfo, 5000);
  },
  methods: {
    handler ({BMap, map}) {
      this.center.lng = 113.880;
      this.center.lat = 22.568;
    },
    getIcon(status){
      if(status.substring(2,4) === '开启'){
        return this.iconObjO;
      }
      return this.iconObjC;
    },
    search(){
      //console.log(this.$refs.input.value);
      this.searchClicked();
      this.lableClicked(this.$refs.input.value.trim());
    },
    searchClicked(){
      this.searched = true;
      setTimeout(() => {
        this.searched = false;
      }, 100);
    },
    lableClicked(code){
      if(this.selectedLable === null || this.selectedLable.code != code){
        let lableInfo = this.getSelectedLableInfo(code);
        if(lableInfo != null){
          this.selectedLable = new Object();
          this.selectedLable = lableInfo;
          this.show = true;
          this.center.lng = this.selectedLable.point.lng;
          this.center.lat = this.selectedLable.point.lat;
        }
      }
    },
    infoWindowOpen(){
      this.show = true;
    },
    infoWindowClose(){
      this.show = false;
    },
    getLableInfo(){
      var _this = this;
      this.$ajax({
        method: 'get',
        url: 'http://localhost:55354/api/CoverInfo/mapLable'
      })
      .then((res) => {
        _this.lableInfo = new Array();
        res.data.forEach(element => {
          _this.lableInfo.push({
            code: element.code,
            name: element.name,
            lock_num: element.lock_num,
            status: element.status,
            point: {
              lng: parseFloat(element.lng),
              lat: parseFloat(element.lat)
            },
            vol_status: element.vol_status,
            device_type: element.device_type,
            IMSI: element.imsi,
            board: element.board
          });
        });
      })
    },
    getSelectedLableInfo(code){
      var index = this.lableInfo.findIndex((value) => {
        return value.code == code;
      });
      if(index != -1){
        return this.lableInfo[index];
      }
      else{
        return null;
      }
    }
  }
}
</script>

<style>
.bm-view {
  flex: 6;
  height: 100%;
}

.bm-view input{
  width: 2vw;
  height: 1vw;
  font-size: 0.5vw;
}

.search{
  margin: 0 0 0 0;
  display: flex;
  flex-direction: row;
  opacity: 0.8;
  position: absolute;
  top: 10vw;
  left: 12vw;
  font-size: 0.5vw;
}

.search .b{
  margin: 0 0 0 0.1vw;
  width: 1.5vw;
  height: 1vw;
  background-color:darkcyan;
  border-radius: 0.5vw;
  text-align: center;
  line-height: 200%;
  color: whitesmoke;
  cursor: pointer;
}

.c{
  border: 1px solid black;
}
</style>