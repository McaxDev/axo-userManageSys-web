<template>
    <div class="handleLogs">
        <div>操作日志</div>
    </div>
</template>

<script>
import http from '../../js/http'
import pasenc from '../../js/pasenc'
export default({
    data(){
        return{
            
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