<template>
    <div>
        <el-form ref="form" :model="command" label-width="100px" label-position="left">
            <el-form-item label="服务器：">
                <el-select v-model="command.server" clearable placeholder="请选择服务器">
                    <el-option v-for="server in servers" :key="server.value" :label="server.label" :value="server.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="指令：">
                <el-select v-model="command.cmd" clearable placeholder="请选择指令">
                    <el-option v-for="cmd in cmds" :key="cmd.value" :label="cmd.label" :value="cmd.value">
                        <div v-if="['kick', 'give', 'kill', 'money'].includes(cmd.value)">
                            <span style="float: left">{{ cmd.label }}</span>
                            <span style="float: right"><i class="el-icon-lock"></i></span>
                        </div>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-collapse-transition>
                <div v-show="['kick', 'give', 'kill', 'money'].includes(command.cmd)">
                    <el-form-item label="验证密码：">
                        <el-input placeholder="请输入密码" v-model="command.pas" show-password></el-input>
                    </el-form-item>
                </div>
            </el-collapse-transition>
            
            <el-form-item label="指令：">
                <div style="display: flex;align-items: center;">
                    <el-input style="flex: 1;" placeholder="请输入指令" v-model="command.cmdText"></el-input>
                    <el-tooltip class="item" effect="dark" content="如需输入'/say awa'指令，则输入：awa，在上方选择say指令" placement="left">
                        <i class="el-icon-info ms-2" style="color: #a7a7a7;"></i>
                    </el-tooltip>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">执行指令</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import http from '../../js/http'
export default({
    data(){
        // help", "list", "tps", "mspt", "say", "me", "tell"kick", "give", "kill", "money
        return{
            command:{
                server:'',
                cmd:''
            },
            servers:[
                {label:'互通服',value:'main'},
                {label:'生存（生电）服',value:'sc'}
            ],
            cmds:[
                {label:'help',value:'help'},
                {label:'list',value:'list'},
                {label:'tps',value:'tps'},
                {label:'mspt',value:'mspt'},
                {label:'say',value:'say'},
                {label:'me',value:'me'},
                {label:'tell',value:'tell'},
                {label:'kick',value:'kick'},
                {label:'give',value:'give'},
                {label:'kill',value:'kill'},
                {label:'money',value:'money'},
            ]
        }
    },
    methods:{
        // https://api.mcax.cn/rcon?server=服务器名&pwd=Orientation&c=give&c=Nerakolo&c=diamond&c=1
        onSubmit(){
            // console.log(this.command)
            if(!this.command.server||!this.command.cmd||!this.command.cmdText){
                this.$message({
                    message: '输入完整指令',
                    type: 'warning'
                })
                return false
            }
            let cmd = this.command.cmdText
            cmd = cmd.replace(/\s/g, "&c=")
            let cmdTextGo
            if(['kick', 'give', 'kill', 'money'].includes(this.command.cmd)){
                cmdTextGo=`https://api.mcax.cn/rcon?srv=${this.command.server}&pwd=${this.command.pas}&cmd=${this.command.cmd} ${cmd}`
            }else{
                cmdTextGo=`https://api.mcax.cn/rcon?srv=${this.command.server}&cmd=${this.command.cmd} ${cmd}`
            }
            // console.log(cmdTextGo)
            http.get(cmdTextGo)
            .then(res=>{
                console.log(res.data)
                if(res.status==200){
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    })
                }
            }).catch(err=>{

            })
        }
    }
})
</script>

<style>

</style>