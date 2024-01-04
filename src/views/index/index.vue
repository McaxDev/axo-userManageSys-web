<template>
  <div class="about">
    <h1>This is an Index page</h1>
    <p>stories will begin here</p>
    <el-button @click="test">11</el-button>
  </div>
</template>

<script>
  import http from '../../js/http'
  // import pasenc from '../../js/pasenc'
  // import cookie from 'js-cookie'

  export default({
    data(){
      return{
        
      }
    },
    methods:{
      test(){
        http.get('/test')
          .then(res=>{
            console.log(res)
          })
      }
    }
  })
</script>

<style>

</style>