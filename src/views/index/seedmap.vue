<template>
    <div class="seedmap">
        <div class="row g-3">
            <div class="col-12 col-md-6" v-for="seedmap in seedmaps" :key="seedmap.id">
                <el-card class="rounded-3 card-box" shadow="hover">
                    <!-- <el-image class="rounded-3 w-100" :src="seedmap.src" style="height: 400px;" fit="cover" lazy></el-image> -->
                    <div class="text-truncate rounded-3" style="height: 400px;position: relative;" @mouseover="navHover(seedmap)" @mouseout="navHoverNone(seedmap)">
                        <div class="w-100 h-100" :style="backgroundStyle(seedmap)"></div>
                        <a class="text-decoration-none" target="_blank" :href="`https://www.chunkbase.com/apps/seed-map#${seedmap.seed}`">
                            <transition name="fade">
                                <div class="card-content h-100 w-100" v-show="seedmap.hover">
                                    {{ seedmap.content }}
                                </div>
                            </transition>
                        </a>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
export default({
    data(){
        return{
            seedmaps:[
                {src:require('../../assets/img/axo-java.jpg'),content:'生电服务器',hover:false,seed:'-1956375804629366220'},
                {src:require('../../assets/img/axo-gey.jpg'),content:'互通服务器',hover:false,seed:''}
            ]
        }
    },
    methods:{
        navHover(seedmap){
            seedmap.hover=true
        },
        navHoverNone(seedmap){
            seedmap.hover=false
        },
        backgroundStyle(seedmap) {
            return {
                backgroundImage: `url('${seedmap.src}')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                filter: seedmap.hover ? 'blur(2px)' : 'none', // 调整模糊强度
                position: 'absolute', // 使背景层位于内容层下方
                transition: '0.3s ease',
                top: 0,
                left: 0,
            }
        }
    },
    computed:{
        
    }
})
</script>

<style>
.seedmap{
    .card-box{
        .card-content{
            transition: 0.3s ease;
            position: relative; /* 确保内容层在背景层上方 */
            z-index: 1; /* 提高层级 */
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            font-size: 22px;
            text-shadow: -1px -1px 0 #28abce, 1px -1px 0 #28abce, -1px  1px 0 #28abce, 1px  1px 0 #28abce;
            &:hover{
                cursor: pointer;
            }
        }
    }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>