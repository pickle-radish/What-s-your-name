<template>
    <v-card  outlined >
        <v-img :src="path" contain :ref="`card${tagData.id}`">
            <div class="tag" id="affiliationTag">
                {{tagData.소속}}
            </div>
            <div class="tag" id="nameTag">
                {{tagData.이름}}
            </div> 
        </v-img>
            
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
    props:{
        tagData: Object,
    },
    computed: mapGetters(['imgId']),

    created(){
        this.path = require(`@/img/${this.imgId}.jpg`)
    }
}
</script>

<style> 
    .printDiv{
        width:500px;
        margin:auto;
    }
    #nameTag{
        font-size:50px;
        top:50%
        /* text-align:center; */
    }

    #affiliationTag{
        font-size:25px;
        top:40%
    }
    
    .tag{
        position:absolute;
        
        left:50%;
        transform:translate(-50%);
    }

</style>