<template>
    <v-card outlined>
        <!-- <div :id="`card${tagData.id}`" style="border: 0.7px ridge;">
            <img :src="path" :id="`imgCard${tagData.id}`" width="500" class="imageCard">
            <div class="tag" id="affiliationTag">
                {{tagData.소속}}
            </div>
            <div class="tag" id="nameTag">
                {{tagData.이름}}
            </div> 
        </div> -->
        <div :id="`card${tagData.id}`" >
            <img :src="path" alt="customImg" width="500" class="imageCard" :id="`imgCard${tagData.id}`">
            <!-- <div class="tag" id="affiliationTag">
                {{tagData.소속}}
            </div> -->
            <drag-it-dude id="tagTest">
                <div id="nameTag">
                    {{tagData.이름}}
                </div>
            </drag-it-dude>
        </div>
    </v-card>
</template>

<script>1
import {mapGetters} from 'vuex'
import DragItDude from 'vue-drag-it-dude';

export default {
    name:'ImgCard',
    components:{
        DragItDude
    },
    data() {
        return {
            path:'',

        }
    },
    props:{
        tagData: Object,
    },
    computed: mapGetters(['imgId', 'saveWidth', 'saveHeight']),

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
        display: block;
    }

    /* .tag{
        position: absolute;

        left:50%;
        transform:translate(-50%);
    } */

</style>