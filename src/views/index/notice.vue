<template>
    <div>
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
                        <div><p>{{ card.content }}</p></div>
                    </el-card>
                </div>
            </div>
        </div>

        <el-drawer custom-class="drawer" title="发布公告" :visible.sync="editBox" size="50%">
            <div style="padding: 20px;">
                <el-input type="textarea" :autosize="{ minRows: 20, maxRows: 100}" maxlength="400" placeholder="在此编辑公告" v-model="noticeText"></el-input>
            </div>
        </el-drawer>

    </div>
</template>

<script>
export default({
    data(){
        return{
            editBox:false,
            noticeText:'',
            cards:[
                {name:'title',author:'author-name',date:'2024/01/01',content:'除了新的输入框类型，HTML5标准中还给现有的表单控件做了一些小改进，其中一个改进就是允许给输入框设置占位文本。占位文本会在输入框为空或者失去焦点的时候显示出来，一旦用户点击输入框（或者利用Tab键使其获得焦点），占位文本就会消失。检测浏览器是否支持占位文本可以使用检测方法2.如果浏览器支持占位文本的话，创建的<imput>元素对应的DOM对象会有一个placeholder的属性（即使没有在<imput>元素上显示地设置placeholder属性）'},
            ]
        }
    },
    computed:{
      userName() {
        return this.$store.state.userName
      },
      isAdmin() {
        return this.$store.state.isAdmin
      }
    },
})
</script>

<style>
.drawer{
    min-width: 340px;
}
</style>