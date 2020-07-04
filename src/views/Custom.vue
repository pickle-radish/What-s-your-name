<template>
    <!-- <div style="margin: 0 50px"> -->
    <v-container>

        <v-row style="height:100%;">
            <v-col cols="9">
                <v-row style="height:100%" align="center" >   
                    <v-col>
                        <div id="imgDiv">
                            <ImgCard :tagData="testData" />
                            <ImgCard class="saveCard" v-for="data in excelData" :key="data.id" :tagData="data"/>
                        </div>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="3">
                <customMenu />
            </v-col>
        </v-row>
    </v-container>
    <!-- </div> -->
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
                태그1:"나상문",
            }
        }
    },
    components: {
        ImgCard,
        customMenu
    },
    computed: mapGetters(['excelData',]),
    methods:{
        
    },
    created(){
        if(!this.$route.query.customImg){
            this.$store.commit('setImgPath', require(`@/img/${this.$route.query.name}.jpg`))
        }
    },
}
</script>

<style>
    #imgDiv{
        display: flex; 
        justify-content : center;
        align-items: center;
        position:relative;
        width: 100%;
    }
    .saveCard{
        z-index:-1; 
    }
</style>

