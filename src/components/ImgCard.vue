<template>
    <div id="tempCard">
        <div :id="`card${tagData.id}`" class="printDiv" v-if="tagData.id != undefined">
            <img :src="path" alt="customImg" width="500" class="imageCard" :id="`imgCard${tagData.id}`">
            <drag-it-dude
                v-for="tag in tags" 
                :key="tag.id" 
                :id="`tag${tag.id}`" 
                class="tags" 
                :style="`top:${tag.top}; left: 50%; transform:translate(-50%)`"
                >
                <div>
                    {{tagData[tag.name]}}
                </div>                                     
            </drag-it-dude>
        </div>

        <div :id="`tempDiv`" class="printDiv" v-else>
            <img :src="path" alt="customImg" width="500" class="imageCard" :id="`tempImgCard`">
            <drag-it-dude
                v-for="tag in tags" 
                :key="tag.id" 
                :id="`tempTag`" 
                class="tags" 
                >
                <div :id='tagData.id'>
                    {{tag.value}}
                </div>
            </drag-it-dude>
        </div>
    </div>
</template>

<script>
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
        ...mapActions(['alignCenter', 'freePosition'])
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
        /* position: relative; */
        display: block;
        pointer-events: none;
        
        -khtml-user-select: none;
        -o-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        
    }

    #tempCard{
        position: relative;
    }

    .printDiv{
        border: 1px solid;
    }

    #tagTest{
        top:200px;
    } 

    .tags{
        font-size: 40px;
        overflow: visible;
        white-space: nowrap;
    }
    
    .tags:hover{
        cursor: grab;
    }
    .tags:active{
        cursor: grabbing;
    }
</style>