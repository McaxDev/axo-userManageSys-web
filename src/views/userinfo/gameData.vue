<template>
    <div class="gameData">
        <div class="d-flex justify-content-between align-items-cener">
            <div class="d-flex align-items-center">
                <div>{{ !userName? '您还未登录':`欢迎！${userName}` }}</div>
            </div>
            <div>
                <el-radio-group v-model="tabChose" size="mini">
                    <el-radio-button label="Java生存服"></el-radio-button>
                    <el-radio-button label="互通服" disabled></el-radio-button>
                </el-radio-group>
            </div>
        </div>
        <el-divider content-position="left">用户游玩数据统计</el-divider>
        <div>
            <el-descriptions class="margin-top" :column="screen<=700?1:2" border v-loading="loading">
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        玩家名称
                    </template>
                    {{ gameName }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-time"></i>
                        在线时长
                    </template>
                    {{ time }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-menu"></i>
                        挖掘数量
                    </template>
                    {{ mines }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-s-data"></i>
                        击杀次数
                    </template>
                    {{ kills }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-aim"></i>
                        造成伤害
                    </template>
                    {{ damage }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-refresh-right"></i>
                        死亡次数
                    </template>
                    {{ death }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-location-information"></i>
                        行走距离
                    </template>
                    {{ walks }}km
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-position"></i>
                        飞行距离
                    </template>
                    {{ flys }}km
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-s-promotion"></i>
                        烟花飞行距离
                    </template>
                    {{ aviates }}km
                </el-descriptions-item>
            </el-descriptions>
        </div>
    </div>
</template>

<script>
import http from '../../js/http'
export default({
    data(){
        return{
            screen:10000,
            loading:true,
            tabChose:'Java生存服',
            aviates: "00000",//烟花飞行距离-
            boats: "00000",//划船距离
            crats: "00000",//乘坐矿车距离
            damage: "00000",//造成伤害-
            death: "00000",//死亡次数-
            dives: "00000",//潜水距离
            flys: "00000",//飞行距离-
            horses: "00000",//骑马距离
            kills: "00000",//击杀次数-
            mines: "00000",//挖掘数量-
            swims: "00000",//游泳距离
            time: "00000",//在线时长-
            uuid: "00000",//uuid-
            walks: "00000",//行走距离-
        }
    },
    mounted(){
        window.addEventListener('resize', () => {
            this.screen = window.innerWidth
        })
        const query={
            id:this.$store.state.userId,
            server:this.tabChose==='Java生存服'?'sc':'main'
        }
        console.log(query)
        if(this.$store.state.userId){
            http.post('/getGameData',query)
            .then(res=>{
                console.log(res.data.data)
                if(res.data.data){
                    let hours = Math.floor(res.data.data.time / 20 / 3600 )
                    let minutes = Math.floor((res.data.data.time / 20 % 3600) / 60 )
                    console.log(hours,minutes)
                    this.aviates=res.data.data.aviates*1/100000
                    this.boats=res.data.data.boats*1/100000
                    this.crats=res.data.data.crats
                    this.damage=res.data.data.damage
                    this.death=res.data.data.death
                    this.dives=res.data.data.dives*1/100000
                    this.flys=res.data.data.flys*1/100000
                    this.horses=res.data.data.horses*1/100000
                    this.kills=res.data.data.kills
                    this.mines=res.data.data.mines
                    this.swims=res.data.data.swims*1/100000
                    this.time=`${hours}时${minutes}分`
                    this.uuid=res.data.data.uuid
                    this.walks=res.data.data.walks*1/100000
                    this.loading=false
                }
            })
        }else{
            this.$message({
                message: '请登录后查看您的游戏数据',
                type: 'warning'
            })
        }
        
    },
    methods:{

    },
    computed:{
      userName() {
        return this.$store.state.userName
      },
      isAdmin() {
        return this.$store.state.isAdmin
      },
      baseURL(){
        return http.defaults.baseURL
      },
      gameName() {
        return this.$store.state.gameName
      }
    },
})
</script>

<style>

</style>