<template>
  <div class="index">
    <div>
      <div class="row g-2">
        <div class="col-12 col-lg-6 col-xl-4" v-for="card in cards" :key="card.id">
          <el-card class="rounded-3" shadow="hover" style="height: 400px;">
            <div slot="header" class="m-0 p-0">{{ card.name }}</div>
            <div :id="card.block" style="height: 100%;"></div>
            
          </el-card>
        </div>
        
      </div>
      
    </div>
    
  </div>
</template>

<script>
  import http from '../../js/http'
  import * as echarts from 'echarts'
  // import pasenc from '../../js/pasenc'
  // import cookie from 'js-cookie'

  export default({
    data(){
      return{
        cards:[
          {name:'在线信息',block:'onlineInfo',content:'各服务器24小时在线信息',loading:true},
          {name:'在线时长榜',block:'onlineTime',content:'玩家在线时间长度',loading:true},
          {name:'挖掘榜',block:'mineList',content:'玩家挖掘数量',loading:true},
          {name:'击杀榜',block:'killList',content:'玩家击杀生物数量',loading:true},
          {name:'死亡榜',block:'deathList',content:'玩家死亡数量',loading:true},
          {name:'探险榜',block:'adventureList',content:'玩家行进距离',loading:true},
        ],
        infoList:[],
        onlineInfoData:{
					be:{
						main:[]
					},
					java:{
						sc:[],
						mod:[],
						geyser:[]
					},
					tela:{
						main:[]
					}
				},
        echartsColor:{
          sc: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#ff8080' }, // 0% 处的颜色
            { offset: 1, color: '#ff808030' } // 100% 处的颜色
          ]),
          main: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#28abce' }, // 0% 处的颜色
            { offset: 1, color: '#28abce30' } // 100% 处的颜色
          ])
        }
      }
    },
    mounted(){
      this.getOnlineInfo()
      this.getOnlineTime().then(() => {
        // console.log(this.infoList)
        this.onlineTime()
        this.mineList()
        this.killList()
        this.deathList()
        this.adventureList()
      })

    },
    methods:{
      getOnlineInfo(){
        var onlineInfoChart = echarts.init(document.getElementById('onlineInfo'))
        http.get('/getonlineInfoSYS')
        .then(res=>{
          // console.log(res.data.results)
          var data
          res.data.results.forEach(item => {
            this.cards[0].loading=false
            // console.log(item)
            this.onlineInfoData.be.main.push( [item.time, parseInt(item['be-main'])] )

            this.onlineInfoData.java.sc.push( [item.time, parseInt(item['je-sc'])] )
            this.onlineInfoData.java.mod.push( [item.time, parseInt(item['je-mod'])] )
            this.onlineInfoData.java.geyser.push( [item.time, parseInt(item['je-geyser'])] )
            this.onlineInfoData.tela.main.push( [item.time, parseInt(item['tela-main'])] )

            // console.log(this.onlineInfoData)
            data=this.onlineInfoData
            // console.log(data)
          })
          var option = {
            grid:{
              left:20,
              right:10,
              top:80,
              buttom:20
            },
            dataZoom: [{
              type: 'inside',
              xAxisIndex: 0,
              filterMode: 'none'
            }],
            legend:{
              show:true,
              icon: "roundRect",
              itemWidth:20,
              itemHeight:12
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#6a7985',
                }
              }
            },
            xAxis: [
              {
                type: 'time',
                label:{
                  show:false
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                name:'在线',
                splitLine:{
                  show:true,
                  lineStyle:{
                    color:'#fff'
                  }
                }
              }
            ],
            series: [
              {
                name: 'be模组',
                type: 'line',
                areaStyle: {},
                emphasis: {
                  focus: 'series'
                },
                itemStyle:{
                  color:'#28abce'
                },
                areaStyle:{
                  color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{    // 右、下、左、上
                        offset: 0, color: '#28abce'   // 0% 处的颜色
                      }, {
                        offset: 1, color: '#28abce30'   // 100% 处的颜色
                      }
                    ]
                  )
                },
                data: data.be.main
              },
              {
                name: 'java生电',
                type: 'line',
                areaStyle: {},
                emphasis: {
                  focus: 'series'
                },
                itemStyle:{
                  color:'#ff8080'
                },
                areaStyle:{
                    color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{    // 右、下、左、上
                        offset: 0, color: '#ff8080'   // 0% 处的颜色
                      }, {
                        offset: 1, color: '#ff808030'   // 100% 处的颜色
                      }
                    ]
                  )
                },
                data: data.java.sc
              },
              {
                name: 'java模组',
                type: 'line',
                areaStyle: {},
                emphasis: {
                  focus: 'series'
                },
                itemStyle:{
                  color:'#ff9999'
                },
                areaStyle:{
                    color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{    // 右、下、左、上
                        offset: 0, color: '#ff9999'   // 0% 处的颜色
                      }, {
                        offset: 1, color: '#ff999930'   // 100% 处的颜色
                      }
                    ]
                  )
                },
                data: data.java.mod
              },
              {
                name: 'java互通/小游戏',
                type: 'line',
                areaStyle: {},
                emphasis: {
                  focus: 'series'
                },
                itemStyle:{
                  color:'#ffb3b3'
                },
                areaStyle:{
                    color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{    // 右、下、左、上
                        offset: 0, color: '#ffb3b3'   // 0% 处的颜色
                      }, {
                        offset: 1, color: '#ffb3b330'   // 100% 处的颜色
                      }
                    ]
                  )
                },
                data: data.java.geyser
              },
              {
                name: '泰拉瑞亚',
                type: 'line',
                areaStyle: {},
                emphasis: {
                  focus: 'series'
                },
                itemStyle:{
                  color:'#41a863'
                },
                areaStyle:{
                    color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{    // 右、下、左、上
                        offset: 0, color: '#41a863'   // 0% 处的颜色
                      }, {
                        offset: 1, color: '#41a86330'   // 100% 处的颜色
                      }
                    ]
                  )
                },
                data: data.tela.main
              }
            ]
          }
          onlineInfoChart.setOption(option,true)
        })
        window.addEventListener('resize', function () {
          // 调整图表尺寸
          onlineInfoChart.resize()
        })
      },
      getOnlineTime(){
        return new Promise((resolve, reject) => {
          http.get('getInfoList')
          .then(res=>{
            this.infoList=res.data.data
            // console.log(this.infoList)
            resolve()
          })
        })
        
      },
      onlineTime(){
        var onlineTimeChart = echarts.init(document.getElementById('onlineTime'))
        window.addEventListener('resize', function () {
          // 调整图表尺寸
          onlineTimeChart.resize()
        })
        let data = this.infoList.map(item => ({
          name: item.name,
          time: item.time/20/3600,
          stats: item.stats
        }))
        data.sort((a, b) => b.time - a.time)
        data=data.slice(0,10)
        // console.log(data)
        var option = {
          grid:{
            left:122,
            right:10,
            top:30,
            buttom:20
          },
          dataZoom: [{
            type: 'inside',
            xAxisIndex: 0,
            filterMode: 'none'
          }],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985',
              }
            }
          },
          xAxis: [
            {
              type: 'value',
              label:{
                show:false
              }
            }
          ],
          yAxis: [
            {
              name:'在线',
              splitLine:{
                show:true,
                lineStyle:{
                  color:'#fff'
                }
              },
              data:data.map((item)=>{return item.name}).reverse()
            }
          ],
          series: [{
              name: '时间（小时）',
              type: 'bar',
              barCategoryGap: '30%',
              data: data.map((item) => {
                return {
                  value: item.time,
                  itemStyle: {
                    color: item.stats === 'sc' ? this.echartsColor.sc : this.echartsColor.main
                  }
                };
              }).reverse(),
          }]
        }
        onlineTimeChart.setOption(option,true)
      },
      mineList(){
        var mineListChart = echarts.init(document.getElementById('mineList'))
        window.addEventListener('resize', function () {
          // 调整图表尺寸
          mineListChart.resize()
        })
        let data = this.infoList.map(item => ({
          name: item.name,
          mines: item.mines,
          stats: item.stats
        }))
        data.sort((a, b) => b.mines - a.mines)
        data=data.slice(0,10)
        // console.log(data)
        var option = {
          grid:{
            left:122,
            right:10,
            top:30,
            buttom:20
          },
          dataZoom: [{
            type: 'inside',
            xAxisIndex: 0,
            filterMode: 'none'
          }],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985',
              }
            }
          },
          xAxis: [
            {
              type: 'value',
              label:{
                show:false
              }
            }
          ],
          yAxis: [
            {
              name:'数量',
              splitLine:{
                show:true,
                lineStyle:{
                  color:'#fff'
                }
              },
              data:data.map((item)=>{return item.name}).reverse()
            }
          ],
          series: [{
            name: '挖掘数量',
            type: 'bar',
            barCategoryGap: '30%',
            data: data.map((item) => {
                return {
                  value: item.mines,
                  itemStyle: {
                    color: item.stats === 'sc' ? this.echartsColor.sc : this.echartsColor.main
                  }
                };
              }).reverse(),
          }]
        }
        mineListChart.setOption(option,true)
      },
      killList(){
        var killListChart = echarts.init(document.getElementById('killList'))
        window.addEventListener('resize', function () {
          // 调整图表尺寸
          killListChart.resize()
        })
        let data = this.infoList.map(item => ({
          name: item.name,
          kills: item.kills,
          stats: item.stats
        }))
        data.sort((a, b) => b.kills - a.kills)
        data=data.slice(0,10)
        // console.log(data)
        var option = {
          grid:{
            left:122,
            right:10,
            top:30,
            buttom:20
          },
          dataZoom: [{
            type: 'inside',
            xAxisIndex: 0,
            filterMode: 'none'
          }],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985',
              }
            }
          },
          xAxis: [
            {
              type: 'value',
              label:{
                show:false
              }
            }
          ],
          yAxis: [
            {
              name:'数量',
              splitLine:{
                show:true,
                lineStyle:{
                  color:'#fff'
                }
              },
              data:data.map((item)=>{return item.name}).reverse()
            }
          ],
          series: [{
            name: '击杀',
            type: 'bar',
            barCategoryGap: '30%',
            data: data.map((item) => {
                return {
                  value: item.kills,
                  itemStyle: {
                    color: item.stats === 'sc' ? this.echartsColor.sc : this.echartsColor.main
                  }
                };
              }).reverse(),
          }]
        }
        killListChart.setOption(option,true)
      },
      deathList(){
        var deathListChart = echarts.init(document.getElementById('deathList'))
        window.addEventListener('resize', function () {
          // 调整图表尺寸
          deathListChart.resize()
        })
        let data = this.infoList.map(item => ({
          name: item.name,
          death: item.death,
          stats: item.stats
        }))
        data.sort((a, b) => b.death - a.death)
        data=data.slice(0,10)
        // console.log(data)
        var option = {
          grid:{
            left:122,
            right:10,
            top:30,
            buttom:20
          },
          dataZoom: [{
            type: 'inside',
            xAxisIndex: 0,
            filterMode: 'none'
          }],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985',
              }
            }
          },
          xAxis: [
            {
              type: 'value',
              label:{
                show:false
              }
            }
          ],
          yAxis: [
            {
              name:'数量',
              splitLine:{
                show:true,
                lineStyle:{
                  color:'#fff'
                }
              },
              data:data.map((item)=>{return item.name}).reverse()
            }
          ],
          series: [{
            name: '死亡',
            type: 'bar',
            barCategoryGap: '30%',
            data: data.map((item) => {
                return {
                  value: item.death,
                  itemStyle: {
                    color: item.stats === 'sc' ? this.echartsColor.sc : this.echartsColor.main
                  }
                };
              }).reverse(),
          }]
        }
        deathListChart.setOption(option,true)
      },
      adventureList(){
        var adventureListChart = echarts.init(document.getElementById('adventureList'))
        window.addEventListener('resize', function () {
          // 调整图表尺寸
          adventureListChart.resize()
        })
        let data = this.infoList.map(item => ({
          name: item.name,
          lengths: (item.walks+item.flys+item.swims+item.dives+item.crats+item.boats+item.horses+item.aviates)/100000,
          stats: item.stats
        }))
        data.sort((a, b) => b.lengths - a.lengths)
        data=data.slice(0,10)
        // console.log(data)
        var option = {
          grid:{
            left:122,
            right:10,
            top:30,
            buttom:20
          },
          dataZoom: [{
            type: 'inside',
            xAxisIndex: 0,
            filterMode: 'none'
          }],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985',
              }
            }
          },
          xAxis: [
            {
              type: 'value',
              label:{
                show:false
              }
            }
          ],
          yAxis: [
            {
              name:'数量',
              splitLine:{
                show:true,
                lineStyle:{
                  color:'#fff'
                }
              },
              data:data.map((item)=>{return item.name}).reverse()
            }
          ],
          series: [{
            name: '冒险距离（千米）',
            type: 'bar',
            barCategoryGap: '30%',
            data: data.map((item) => {
                return {
                  value: item.lengths,
                  itemStyle: {
                    color: item.stats === 'sc' ? this.echartsColor.sc : this.echartsColor.main
                  }
                };
              }).reverse(),
          }]
        }
        adventureListChart.setOption(option,true)
      },
    }
  })
</script>

<style>
.index{
  .el-card__body{
    height: 100%;
  }
}
</style>