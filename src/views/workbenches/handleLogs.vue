<template>
    <div class="handleLogs">
      <el-table :data="tableData" v-loading="loading" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div style="padding: 10px;padding-left: 50px;">
              {{scope.row.info}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="player" label="玩家"></el-table-column>
        <el-table-column prop="date" label="时间"></el-table-column>
        <el-table-column 
          prop="type" 
          label="类型"
          :filters="[{text: '服务器', value: 'server'},{text: '网站', value: 'web'}]"
          :filter-method="filtType"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.type === 'web' ? 'primary' : 'success'" disable-transitions>{{scope.row.type=='web'?'网站':'服务器'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="ip" label="ip" v-if="isAdmin===1"></el-table-column>
        <el-table-column prop="behaviou" label="行为"></el-table-column>
      </el-table>

      <el-pagination background layout="prev, pager, next" :total="totalNum" :page-size="10" :current-page.sync="page" @current-change="changePage" style="margin-top: 10px;display: flex;justify-content: center;"></el-pagination>

    </div>
</template>

<script>
import http from '../../js/http'
import pasenc from '../../js/pasenc'
export default({
    data(){
        return{
          loading:false,
          tableData:[],
          page:1,
          totalNum:0,

        }
    },
    mounted(){
      if(this.$store.state.isLoggedIn){
        this.loading=true
        const data={
          page:this.page
        }
        http.post('/getLogs',data)
        .then(res=>{
          this.tableData=res.data.data.data
          this.totalNum=res.data.data.limit
          this.loading=false
        })
      }else{
        this.$message({
          message: `未登录`,
          type: 'warning'
        })
      }
    },
    methods:{
      changePage(){
        this.loading=true
        // console.log(`第${this.page}页`)
        const data={
          page:this.page
        }
        http.post('/getLogs',data)
        .then(res=>{
          this.tableData=res.data.data.data
          this.totalNum=res.data.data.limit
          this.loading=false
        })
      },
      filtType(value, row, column){
        return row.type === value
      }
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