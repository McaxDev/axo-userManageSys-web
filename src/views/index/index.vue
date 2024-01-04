<template>
  <div class="index">
    <div>
      <div class="row g-2">
        <div class="col-12 col-lg-6 col-xl-4" v-for="card in cards" :key="card.id">
          <el-card class="rounded-3" shadow="hover" style="height: 400px;">
            <div slot="header" class="m-0 p-0">{{ card.name }}</div>
            <div :ref="card.block">{{ card.content }}</div>
          </el-card>
        </div>
        
      </div>
      
    </div>
    
  </div>
</template>

<script>
  import http from '../../js/http'
  // import pasenc from '../../js/pasenc'
  // import cookie from 'js-cookie'

  export default({
    data(){
      return{
        cards:[
          {name:'在线信息',block:'',content:'各服务器24小时在线信息'},
          {name:'在线时长榜',block:'',content:'玩家在线时间长度'},
          {name:'挖掘榜',block:'',content:'玩家挖掘数量'},
          {name:'击杀榜',block:'',content:'玩家击杀生物数量'},
          {name:'死亡榜',block:'',content:'玩家死亡数量'},
          {name:'探险榜',block:'',content:'玩家行进距离'},
        ]
      }
    },
    methods:{
      
    }
  })
</script>

<style>

</style>