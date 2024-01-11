<template>
    <div class="handleLogs">
      <el-table :data="tableData" border v-loading="loading" style="width: 100%">
        <el-table-column prop="userName" label="用户名"></el-table-column>
        <el-table-column prop="gameName" label="游戏名"></el-table-column>
        <el-table-column prop="handle" label="操作"></el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
        <el-table-column prop="date" label="时间"></el-table-column>
      </el-table>
    </div>
</template>

<script>
import http from '../../js/http'
import pasenc from '../../js/pasenc'
export default({
    data(){
        return{
          loading:false,
          tableData:[]
        }
    },
    mounted(){
        
    },
    methods:{
        
    },
    computed:{
      isLoggedIn() {
        return this.$store.state.isLoggedIn
      },
      isAdmin() {
        return this.$store.state.isAdmin
      },
      userName() {
        return this.$store.state.userName
      }
    },
})
</script>

<style>
.handleLogs{
    
}
</style>