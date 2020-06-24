<template>
    <v-card style="margin-top:100px" id="imgCard" outlined >
        <img :src="path" contain max-height="700" id='nameCard'>
        <div class="tag" id="affiliationTag">
            열린문교회
        </div>
        <div class="tag" id="nameTag">
            나상문
        </div> 
    </v-card> 
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name:'ImgCard',
    data() {
        return {
            path:''
        }
    },
    computed: mapGetters(['getImgId']),
    
    created(){
        console.log("getImg", this.getImgId)
        this.path = require(`@/img/${this.getImgId}.jpg`)
        console.log("path:", this.path)

    }
}
</script>

<style>

</style>