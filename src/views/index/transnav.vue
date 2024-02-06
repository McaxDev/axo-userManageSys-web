<template>
    <div class="transnav">
        <div class="row g-3">
            <div class="col-12 col-md-6 col-xl-4" v-for="link in links" :key="link.id" @click="linkTo(link.url)">
                <el-tooltip class="item" effect="dark" :content="link.tip" placement="bottom">
                    <el-card class="rounded-3" shadow="hover">
                        <el-image class="rounded-3 w-100" :src="link.src" style="height: 200px;" fit="cover" lazy></el-image>
                        <div class="text-truncate">
                            {{ link.content }}
                        </div>
                    </el-card>        
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script>
export default({
    data(){
        return{
            links:[
                {src:require('../../assets/img/links/wwwmcax.png'),content:'Axolotland官网',tip:'Axolotland官方网站',url:this.$store.state.webLinks.www},
                {src:require('../../assets/img/links/axowiki.png'),content:'Axo-wiki百科',tip:'Axolotland维基百科',url:this.$store.state.webLinks.wiki},
                {src:require('../../assets/img/links/axobbs.png'),content:'Axo-bbs论坛',tip:'Axolotland官方论坛',url:this.$store.state.webLinks.bbs},
                {src:require('../../assets/img/links/bilibili.png'),content:'bilibili',tip:'哔哩哔哩',url:'https://www.bilibili.com/'},
                {src:require('../../assets/img/links/minecraft.png'),content:'MINECRAFT',tip:'我的世界官网',url:'https://www.minecraft.net/zh-hans'},
                {src:require('../../assets/img/links/klpbbs.png'),content:'苦力怕论坛',tip:'苦力怕论坛',url:'https://klpbbs.com/'},
                {src:require('../../assets/img/links/mcbbs.png'),content:'MCBBS',tip:'我的世界论坛',url:'https://www.mcbbs.net/'},
                {src:require('../../assets/img/links/minebbs.png'),content:'MINEBBS',tip:'MINEBBS论坛',url:'https://www.minebbs.com/'},
                {src:require('../../assets/img/links/bilibiliwiki.png'),content:'bilibili-wiki',tip:'哔哩哔哩维基百科',url:'https://wiki.biligame.com/wiki/%E9%A6%96%E9%A1%B5'},
                {src:require('../../assets/img/links/minecraftwiki.png'),content:'minecraft-wiki',tip:'我的世界百科',url:'https://minecraft.fandom.com/zh/wiki/Minecraft_Wiki'},
                {src:require('../../assets/img/links/mcmod.png'),content:'MCMOD',tip:'MC百科',url:'https://www.mcmod.cn/'},
                {src:require('../../assets/img/links/mcpedl.png'),content:'MCPEDL',tip:'MCPEDL',url:'https://mcpedl.com/'},
                {src:require('../../assets/img/links/modrinth.png'),content:'Modrinth',tip:'Modrinth,The place for Minecraft things',url:'https://modrinth.com/'},
                {src:require('../../assets/img/links/curseforge.png'),content:'Curseforge',tip:'Minecraft Mods on CurseForge - The Home for the Best Minecraft Mods',url:'https://www.curseforge.com/minecraft'},
            ]
        }
    },
    mounted(){

    },
    methods:{
        linkTo(url){
            window.open(url)
        }
    }
})
</script>

<style>
.transnav{
    .el-card__body{
        padding: 10px;
        &:hover{
            cursor: pointer;
            transition: 0.3s ease;
            color: #28abce;
        }
    }
}
</style>