<template>
    <v-card  outlined width="500">
        {{tagData.id}}
        <v-img :src="path" contain :id="`card${tagData.id}`" class="imageCard">
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
    #affiliationTag{
        font-size: 25px;
        top:40%

    }
    #nameTag{
        font-size: 40px;
        top:50%
    }

    .imageCard{
        position: relative;
    }

    .tag{
        position: absolute;

        left:50%;
        transform:translate(-50%);
    }

</style>