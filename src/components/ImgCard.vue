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
        <div :id="`card${tagData.id}`"  v-if="tagData.id != `undefined`">
            <img :src="path" alt="customImg" width="500" class="imageCard" :id="`imgCard${tagData.id}`">
            <!-- <div class="tag" id="affiliationTag">
                {{tagData.소속}}
            </div> -->
            <drag-it-dude
                v-for="tag in tags" 
                :key="tag.name" 
                :id="`tag${tag.id}`" 
                class="tags" 
                :style="`top:${tag.top}; left: 50%; transform:translate(-50%)`"
                >
                <div @mouseup="alignCenter">
                    {{tagData.태그1}}
                </div>                                     
            </drag-it-dude>
        </div>
        <div :id="`card${tagData.id}`" v-else>
            <img :src="path" alt="customImg" width="500" class="imageCard" :id="`imgCard${tagData.id}`">
            <!-- <div class="tag" id="affiliationTag">
                {{tagData.소속}}
            </div> -->
            <drag-it-dude
                v-for="tag in tags" 
                :key="tag.name" 
                :id="`tag${tag.id}`" 
                class="tags" 
                :style="`top:${tag.top}; left: 50%; transform:translate(-50%)`"
                >
                <div @mouseup="alignCenter">
                    {{tag.value}}
                </div>
            </drag-it-dude>
        </div>
    </v-card>
</template>

<script>1
import {mapActions, mapGetters} from 'vuex'
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
    computed: mapGetters(['imgId', 'saveWidth', 'saveHeight', 'tags']),
    methods:{
        ...mapActions(['alignCenter'])
    },
    created(){
        this.path = require(`@/img/${this.imgId}.jpg`)
    }
}
</script>

<style> 
    #affiliationTag{
        font-size: 25px;
    }

    .imageCard{
        position: relative;
        display: block;
        pointer-events: none;
    }

    #tagTest{
        top:200px;
    }  
    .tags{
        font-size: 40px;
    }
    
    .tags:hover{
        cursor: grab;
    }
    .tags:active{
        cursor: grabbing;
    }
</style>