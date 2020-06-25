<template>
    <v-app>
        <h1>image custom</h1>
        <v-row style="height:300" class="text-center">
            <v-col :cols="9">
                <v-row>
                    <v-col :cols="3"></v-col>
                    <v-col :cols="6">
                        
                            <ImgCard />
                            <!-- <div v-for="row in excelData" :key="row.id" class="saveCard">div</div> -->
                            
                    </v-col>         
                    <v-col>
                    </v-col>
                </v-row>
            </v-col>   
            <v-col :cols="3">
                <v-card outlined height="100%">
                    <div class="my-2">
                        <input type="file" @change="readFile">
                    </div>
                    <div class="my-2">
                        <v-btn large color="primary" >만들기</v-btn>
                    </div>
                    
                </v-card>
            </v-col>
        </v-row>
    </v-app>
</template>

<script>
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'

import ImgCard from '@/components/ImgCard.vue'

export default {
    name:"Custom",
    components: {
        ImgCard
    },
    computed: mapGetters(['excelData']),
    methods:{
        ...mapActions(['readFile'])
    },
    created(){
        // this.path = require(`@/img/${this.$route.query.name}.jpg`)
        this.$store.commit('setImgId', this.$route.query.name)
    },
}
</script>

<style>
    #nameTag{
        font-size:50px;
        top:50%
        /* text-align:center; */
    }

    #affiliationTag{
        font-size:25px;
        top:40%
    }

    #imagCard{
        position:relative;
    }
    .tag{
        position:absolute;
        
        left:50%;
        transform:translate(-50%);
    }
    .saveCard{
        position:absolute;
    }
</style>

