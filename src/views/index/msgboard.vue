<template>
    <div>
        <div class="d-flex justify-content-between align-items-cener">
            <div class="d-flex align-items-center">
                <div>{{ !userName? '您还未登录':`欢迎！${userName}` }}</div>
            </div>
            <div v-if="userName">
                <el-button type="text" @click="editBox=true">说点什么</el-button>
            </div>
        </div>
        <el-divider content-position="left">留言板</el-divider>
        <div class="mt-3 row g-2">
            <div class="col-12 col-xl-6" shadow="hover" v-for="msg,index in msgs" :key="msg.uuid">
                <el-card class="rounded-3" shadow="hover">
                    <div slot="header">
                        <div class="d-flex flex-row justify-content-between align-items-center">
                            <div class="d-flex flex-row align-items-center">
                                <el-avatar :size="45" :src="msg.head"></el-avatar>
                                <div class="d-flex flex-column ms-1">
                                    <div>{{ msg.userName }}<span style="color:#28abce;">【{{ msg.gameName }}】</span></div>
                                    <small>
                                        <div>{{ msg.date }}</div>
                                    </small>
                                </div>
                                
                            </div>
                            <div v-if="userName">
                                <el-button type="text" icon="el-icon-close" @click="delMsg(index,msg.uuid)"></el-button>
                            </div>
                        </div>
                    </div>
                    <div>{{ msg.content }}</div>
                </el-card>
            </div>
        </div>

        <el-drawer custom-class="drawer" title="发布留言" :visible.sync="editBox" size="50%">
            <div style="padding: 20px;">
                <el-input type="textarea" :autosize="{ minRows: 20, maxRows: 100}" maxlength="400" placeholder="在此编辑内容" v-model="msgText"></el-input>
                <el-button type="primary" plain class="rounded-3 mt-2 w-100" @click="upLoadMsg">发布</el-button>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import http from '../../js/http'
import { v4 as uuidv4 } from 'uuid'
export default({
    data(){
        return{
            msgs:[],
            editBox:false,
            msgText:'',
        }
    },
    mounted(){
        if(this.$store.state.userName){
            this.getMsg()
        }else{
            this.$message({
                message: '请登录后查看留言',
                type: 'warning'
            })
        }
    },
    methods:{
        upLoadMsg(){
            const query={
                userName:this.$store.state.userName,
                gameName:this.$store.state.gameName,
                uuid:uuidv4(),
                content:this.msgText
            }
            http.post('/upLoadMsg',query)
            .then(res=>{
                this.$message({
                    message: res.data.msg,
                    type: 'success'
                })
                this.msgText=''
                this.editBox=false
            })
            this.getMsg()
        },
        delMsg(index,uuid){
            // console.log(index,uuid)
            this.msgs.splice(index,1)
            const query={
                uuid
            }
            http.post('/delMsg',query)
            .then(res=>{
                this.$message({
                    message: res.data.msg,
                    type: 'success'
                })
            })
        },
        getMsg(){
            this.msgs=[]
            http.post('/getMsg')
            .then(res=>{
                res.data.data.forEach((item)=>{
                    var head
                    const data={
                        userName:item.user_name
                    }
                    http.post('/getUserHead',data)
                    .then(res=>{
                        head=JSON.parse(res.data.data.head)==null?'':`${http.defaults.baseURL}/imgs/${JSON.parse(res.data.data.head)[0]}`
                        this.msgs.push({uuid:item.uuid,gameName:item.game_name,userName:item.user_name,date:item.date,content:item.content,head,list:item.list})
                        this.msgs.sort((a, b) => b.list - a.list)
                        console.log(this.msgs)
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                })
            })
        }
    },
    computed:{
      userName() {
        return this.$store.state.userName
      },
      gameName() {
        return this.$store.state.gameName
      },
      isAdmin() {
        return this.$store.state.isAdmin
      },
      baseURL(){
        return http.defaults.baseURL
      }
    },
})
</script>

<style>

</style>