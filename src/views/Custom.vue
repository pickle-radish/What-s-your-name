<template>
    <v-app>
        <h1>Image Custom</h1>
        <v-row style="height:300" class="text-center">
            <v-col :cols="9" id='imgBoard'>
                <v-row style="height:100%" :align="`center`">
                    <v-col>
                        <div id="imgDiv">
                            <ImgCard :tagData="testData" />
                            <ImgCard class="saveCard" v-for="data in excelData" :key="data.id" :tagData="data"/>
                        </div>
                    </v-col>
                </v-row>
            </v-col>   
            <v-col :cols="3">
                <customMenu />
            </v-col>
        </v-row>
    </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

import ImgCard from '@/components/ImgCard.vue'
import customMenu from '@/components/customMenu.vue'

export default {
    name:"Custom",
    data() {
        return {
            testData:{
                이름:"나상문",
                소속:"열린문교회"
            }
        }
    },
    components: {
        ImgCard,
        customMenu
    },
    computed: mapGetters(['excelData']),
    methods:{
        
    },
    created(){
        // this.path = require(`@/img/${this.$route.query.name}.jpg`)
        this.$store.commit('setImgId', this.$route.query.name)
        
    },
}
</script>

<style>
    #imgDiv{
        display: flex; 
        justify-content : center;
        position:relative;
    }
    .saveCard{

        position:absolute;
        z-index:-1; 


    }
</style>

