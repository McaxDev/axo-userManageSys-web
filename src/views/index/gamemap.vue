<template>
    <div>
        <div class="w-100 h-100" style="position: relative;">
            <iframe class="w-100 h-100" :src="mapSrc" ref="mapIframe"></iframe>
            <div class="ms-2 mb-2 pe-md-0 pb-1 pb-md-0" style="position: absolute;bottom: 0px;left: 0px;">
                <el-radio-group v-model="mapValue" size="small" @input="changeMap">
                    <el-radio-button border label="互通"></el-radio-button>
                    <el-radio-button border label="生电"></el-radio-button>
                </el-radio-group>
            </div>
        </div>
    </div>
</template>

<script>
export default({
    data(){
        return{
            mapValue:'互通',
            mapSrc:this.$store.state.webLinks.map.be
        }
    },
    methods:{
        changeMap(){
            console.log(this.$store.state.webLinks.map)
            switch(this.mapValue){
                case('互通'):
                    this.$refs.mapIframe.src=this.$store.state.webLinks.map.be
                break
                case('生电'):
                    this.$refs.mapIframe.src=this.$store.state.webLinks.map.sc
                break
            }
        }
    }
})
</script>

<style>

</style>