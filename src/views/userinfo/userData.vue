<template>
    <div class="userData">
        <div class="d-flex justify-content-between align-items-cener">
            <div class="d-flex align-items-center">
                <div>{{ !isLoggedIn? '您还未登录':`欢迎！${userName}` }}</div>
            </div>
        </div>
        <el-divider content-position="left">账号信息</el-divider>
        <div>
            <el-upload accept="image/*" class="avatar-uploader" action="#" :http-request="upLoadUserData" :file-list="imgList" :show-file-list="false" :on-change="changeIMG" :auto-upload="false" list-type="picture">
                <el-tooltip class="item" effect="dark" content="点击上传，请上传1:1或横向图片，自动居中截取" placement="right">
                    <el-avatar v-if="imgUrl" :size="100" :src="imgUrl" fit="cover" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)"></el-avatar>
                    <el-avatar :size="100" v-else><i class="el-icon-plus avatar-uploader-icon" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)"></i></el-avatar>
                </el-tooltip>
                
            </el-upload>

            <div class="mt-2">
                <el-form :model="valueform" :rules="valueformRules" ref="valueform" label-width="110px" label-position="left" >
                    <el-form-item label="用户名" prop="name">
                        <el-input class="rounded-3" v-model="valueform.name"></el-input>
                    </el-form-item>
                    <el-form-item label="游戏内名称" prop="gameName">
                        <el-input class="rounded-3" v-model="valueform.gameName"></el-input>
                    </el-form-item>
                </el-form>
                <el-button class="rounded-3" type="primary" @click="submit('valueform')">确 定</el-button>

                <el-dialog title="输入密码验证" :visible.sync="editBox" custom-class="rounded-3 modal-width">

                    <div>
                        <el-form :model="checkform" :rules="checkformRules" ref="checkform" label-width="80px" label-position="left" >
                            <el-form-item label="账号密码" prop="pas">
                                <el-input class="rounded-3" v-model="checkform.pas" show-password></el-input>
                            </el-form-item>
                        </el-form>
                        <el-button class="rounded-3 w-100" type="primary" @click="submitChange('checkform')">确 认 修 改</el-button>
                    </div>
                    
                </el-dialog>

            </div>
        </div>
    </div>
</template>

<script>
    import http from '../../js/http'
    import pasenc from '../../js/pasenc'
    export default({
        data(){
            return{
                editBox:false,
                imgList:[],
                imgUrl:'',
                valueform:{
                    name:'',
                    gameName:''
                },
                checkform:{},
                valueformRules:{
                    name:[
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    gameName:[
                        { required: true, message: '请输入游戏内名称', trigger: 'blur' },
                    ],
                },
                checkformRules:{
                    pas:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                }
            }
        },
        mounted(){
            if(this.$store.state.isLoggedIn){//获取用户信息
                const query={
                    id:this.$store.state.userId
                }
                http.post('/getUserInfo',query)
                .then(res=>{
                    // console.log(res.data.data)
                    this.valueform.name=res.data.data.userName
                    this.valueform.gameName=res.data.data.userName
                    this.imgUrl=JSON.parse(res.data.data.head)===null||JSON.parse(res.data.data.head)[0]===undefined?'':`${http.defaults.baseURL}/imgs/${JSON.parse(res.data.data.head)[0]}`
                    // this.$message({
                    //     message: res.data.msg,
                    //     type: 'success'
                    // })
                    // this.editBox=false
                    // this.noticeText=this.noticeTitle=''
                    // this.$refs.noticeImgUpload.clearFiles()
                    // this.getNotice()
                })
                .catch(err=>{
                    this.$message.error(err)
                })
            }else{
                this.$message({
                    message: '您还登录',
                    type: 'warning'
                })
            }
        },
        methods:{
            changeIMG(file,fileList){
                this.imgList=fileList=[file]
                this.imgUrl=file.url
                console.log(file,fileList)

                // this.imgList = [file]
                // this.imgUrl = URL.createObjectURL(file)
            },
            upLoadUserData(){

            },
            submit(valueform){
                this.$refs[valueform].validate((valid) => {
                    if (valid) {
                        this.editBox=true
                    } else {
                        this.$message.error('请填写用户信息')
                        return false
                    }
                })
            },
            submitChange(checkform){
                this.$refs[checkform].validate((valid) => {
                    if (valid) {
                        // this.editBox=false
                        let formData = new FormData()//图片文件数组
                        
                         
                        if (this.imgList.length > 0 && this.imgList[0].raw) {
                            formData.append('file', this.imgList[0].raw);
                        }
                        // console.log(this.imglist.raw)
                        
                        
                        formData.append('id', this.$store.state.userId)
                        formData.append('pas', pasenc(this.checkform.pas))

                        formData.append('userName', this.valueform.name)
                        formData.append('gameName', this.valueform.gameName)
                        console.log(formData)
                        http.post('/editUserInfo',formData,{
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(res=>{
                            // console.log(res)
                            if(res.data.msg!=='密码错误'){
                                this.$message({
                                    message: res.data.msg,
                                    type: 'success'
                                })
                                this.editBox=false
                            }else{
                                this.$message({
                                    message: res.data.msg,
                                    type: 'error'
                                })
                            }
                            
                            // this.checkform.pas=''
                        })
                        .catch(err=>{
                            this.$message.error(err)
                        })
                    } else {
                        this.$message.error('请输入密码')
                        return false
                    }
                })
            }
        },
        computed:{
            isLoggedIn() {
                return this.$store.state.isLoggedIn
            },
            userName() {
                return this.$store.state.userName
            }
        }
    })
</script>

<style>
.userData{
    .el-avatar--circle{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
}
</style>