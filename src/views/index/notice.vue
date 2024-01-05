<template>
    <div class="notice">
        <div class="d-flex justify-content-between align-items-cener">
            <div class="d-flex align-items-center">
                <div>{{ !userName? '您还未登录':`欢迎！${userName}` }}</div>
            </div>
            <div v-if="userName&&isAdmin">
                <el-button type="text" @click="editBox=true">发布点什么</el-button>
            </div>
        </div>
        <el-divider content-position="left">公告板</el-divider>

        <div class="mt-3">
            <div class="row g-2">
                <div class="col-12 col-lg-6 col-xl-4" v-for="card in cards" :key="card.id">
                    <el-card class="rounded-3" shadow="hover" :body-style="{ height: '100%' }" style="height: 400px;">
                        <div slot="header" class="m-0 p-0 d-flex justify-content-between align-items-center">
                            <div class="d-inline-block text-truncate">{{ card.name }}</div>
                            <small class="ms-auto d-flex align-items-center" style="font-size: 70%;">
                                <el-avatar class="me-1" size="small"></el-avatar>
                                <span class="d-inline-block text-truncate me-1" style="max-width: 100px;">{{ card.author }}</span>
                                {{ card.date }}
                            </small>
                        </div>
                        <div>
                            <p>{{ card.content }}</p>
                            <div>
                                <div class="row g-3">
                                    <div class="col-md-6 col-4 text-center" v-for="img in card.imgs" :key="img.id" style="width: 25vw;height: 25vw;max-width: 160px;max-height: 160px;min-width: 100px;min-height: 100px;">
                                        <div class="w-100 h-100 text-center overflow-hidden rounded-3" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
                                            <el-image class="w-100 h-100" :fit="`cover`" :src="`${baseURL}/imgs/${img}`" :preview-src-list="card.imgs.map(imgItem => `${baseURL}/imgs/${imgItem}`)"></el-image>
                                            <!-- <img class="img-fluid" :src="`${baseURL}/imgs/${img}`"> -->
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </el-card>
                </div>
            </div>
        </div>

        <el-drawer custom-class="drawer" title="发布公告" :visible.sync="editBox" size="50%">
            <div style="padding: 20px;">
                <el-input type="text" placeholder="在此编辑标题" v-model="noticeTitle" maxlength="15" show-word-limit />
                <el-input class="mt-2" type="textarea" :autosize="{ minRows: 20, maxRows: 100}" maxlength="400" placeholder="在此编辑公告" v-model="noticeText"></el-input>
                <el-upload class="mt-2" action="" :http-request="upLoadNotice" :file-list="IMGlist" :on-change="changeIMG" :on-remove="removeIMG" list-type="picture-card" :auto-upload="false" multiple ref="noticeImgUpload">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                        <img class="el-upload-list__item-thumbnail" :src="file.url" :alt="file.name">
                        <span class="el-upload-list__item-actions">
                            <span class="el-upload-list__item-delete" @click="removeIMG(file)">
                                <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </div>
                </el-upload>
                <el-button type="primary" plain class="rounded-3 mt-2 w-100" @click="upLoadNotice">发布</el-button>
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
            editBox:false,
            noticeText:'',
            noticeTitle:'',
            IMGlist:[],
            cards:[]
        }
    },
    mounted(){
        this.getNotice()
    },
    methods:{
        removeIMG(fileToRemove){
            this.IMGlist = this.IMGlist.filter(file => file.uid !== fileToRemove.uid)
        },
        getNotice(){
            this.cards=[]
            http.post('/getNotice')
            .then(res=>{
                res.data.data.forEach((item)=>{
                    this.cards.push({id:item.id,name:item.title,author:item.author,date:item.date,content:item.content,imgs:JSON.parse(item.imgs)})
                })
                // console.log(this.cards)
                
            })
            .catch(err=>{
                this.$message.error(err)
            })
        },
        upLoadNotice(){
            let formData = new FormData()//图片文件数组
            this.IMGlist.forEach((fileItem) => {
                // console.log(fileItem)
                if (fileItem.raw) {
                    formData.append('file', fileItem.raw, fileItem.uid + fileItem.name)
                }
            })
            formData.append('noticeId', uuidv4())
            formData.append('msg', this.noticeText)
            formData.append('title', this.noticeTitle)
            formData.append('author', this.$store.state.userName)
            http.post('/upLoadNotice',formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res=>{
                console.log(res)
                this.$message({
                    message: res.data.msg,
                    type: 'success'
                })
                this.editBox=false
                this.noticeText=this.noticeTitle=''
                this.$refs.noticeImgUpload.clearFiles()
                this.getNotice()
            })
            .catch(err=>{
                this.$message.error(err)
            })
        },
        changeIMG(file,fileList){
            this.IMGlist=fileList
            console.log(file,fileList)
        }
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
      }
    },
})
</script>

<style>

.notice{
    .drawer{
        min-width: 360px;
    }
    .el-card__body{
        overflow: auto;
        padding-bottom: 80px;
    }
}
</style>