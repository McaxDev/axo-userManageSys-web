<template>
  <div id="app">
    <div class="d-flex justify-content-between p-2 align-items-center" style="height: 56px;border-bottom: 1px solid #e6e6e6;">

      <div>
        <img style="height: 30px;" src="./assets/img/axlogo.png">
      </div>

      <div>
        <div v-if="!isLoggedIn">
          <el-button type="text" @click="logres=true">点击注册/登录</el-button>
          <el-dialog
            :title="islog===true? '登录':'注册'"
            :visible.sync="logres"
            custom-class="rounded-3 modal-width"
            >

            <div>
              <el-form :model="valueform" :rules="valueformRules" ref="valueform" label-width="100px" label-position="left" >

                <div v-if="islog">
                  <el-form-item label="用户名" prop="name">
                  <el-input v-model="valueform.name"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="pas">
                    <el-input type="password" v-model="valueform.pas"></el-input>
                  </el-form-item>
                </div>

                <div v-else>
                  <el-form-item label="用户名" prop="name">
                  <el-input v-model="valueform.name"></el-input>
                  </el-form-item>
                  <el-form-item label="游戏内名称" prop="id">
                    <el-input v-model="valueform.id"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="pas">
                    <el-input type="password" v-model="valueform.pas"></el-input>
                  </el-form-item>
                </div>
                <el-button type="text" @click="islog=!islog">{{islog===true? '还没账号？点我注册':'前往登录'}}</el-button>
              </el-form>
            </div>

            <span slot="footer" class="text-end">
              <el-button class="rounded-3" @click="logres = false">取 消</el-button>
              <el-button class="rounded-3" type="primary" @click="logres = false">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        

      </div>

    </div>
    <div class="view">
      <div style="border-right: 1px solid #e6e6e6;">
        <el-menu default-active="/" class="el-menu text-start" :collapse="isCollapse" :router="true" style="height: calc(100vh - 56px);border: none;">
          
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <span slot="title">主页</span>
            </template>
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/notice">公告板</el-menu-item>
            <el-menu-item index="/msgboard">留言板</el-menu-item>
            <el-menu-item index="/chat">聊天互动</el-menu-item>
            <el-menu-item index="/transnav">中转导航</el-menu-item>
            <el-menu-item index="/seedmap">种子地图</el-menu-item>
            <el-menu-item index="/gamemap">游戏地图</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span slot="title">我的信息</span>
            </template>
            <el-menu-item index="/userData">账号信息</el-menu-item>
            <el-menu-item index="/gameData">游戏数据</el-menu-item>
          </el-submenu>

          <el-submenu index="3" v-if="!isAdmin">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span slot="title">工作台</span>
            </template>
            <el-menu-item index="/userManage">账号管理</el-menu-item>
            <el-menu-item index="/xxx">XXX</el-menu-item>
          </el-submenu>

        </el-menu>

      </div>
      <router-view class="m-3"/>
    </div>
    
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: false,
        logres:false,
        valueform:{},
        islog:true,
        valueformRules:{
          name:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          id:[
            { required: true, message: '请输入游戏内名称', trigger: 'blur' },
          ],
          pas:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    mounted(){
      this.screenChange()
      window.addEventListener('resize', this.screenChange)
    },
    methods: {
      screenChange(){
        if(window.innerWidth<=560){
          this.isCollapse=true
        }else{
          this.isCollapse=false
        }
      }
    },
    computed:{
      isLoggedIn() {
        return this.$store.state.isLoggedIn;
      },
      isAdmin() {
        return this.$store.state.isAdmin;
      }
    }
  }
</script>

<style lang="scss">
.view{
  display: flex;
  flex-direction: row;
}

.el-menu:not(.el-menu--collapse) {
  width: 200px;
}

.modal-width{
  min-width: 300px;
}
</style>
