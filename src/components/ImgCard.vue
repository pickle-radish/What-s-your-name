<template>
    <div id="imgCard">
        <div :id="`card${tagData.id}`" class="printDiv" v-if="tagData.id != undefined">
            <img :src="imgPath[$route.params.idx]" alt="customImg" class="imageCard" :id="`imgCard${tagData.id}`" v-if="!$route.params.custom">
            <img :src="userImg" alt="customImg" class="imageCard" :id="`imgCard${tagData.id}`" v-else>
            <drag-it-dude
                v-for="tag in tags" 
                :key="tag.id" 
                :id="`tag${tag.id}`" 
                class="tags" 
                :style="`top:${tag.top}; left: 50%; transform:translate(-50%); font-size:${tag.fontSize}px; font-family: ${selectFont}; font-weight: ${tag.fontWeight}`"
                >
                <div>
                    {{tagData[tag.name]}}
                </div>                                     
            </drag-it-dude>
        </div>

        <div :id="`tempDiv`" class="printDiv" v-else>
            <img :src="imgPath[$route.params.idx]" alt="customImg" width="500" class="imageCard" :id="`tempImgCard`" v-if="!$route.params.custom">
            <img :src="userImg" alt="customImg" width="500" class="imageCard" :id="`tempImgCard`" v-else>
            <drag-it-dude
                v-for="tag in tags" 
                :key="tag.id" 
                :id="`tag${tag.id}`" 
                class="tags"
                :style="`top:${tag.top}; font-size:${tag.fontSize}px; font-family: ${selectFont}; font-weight: ${tag.fontWeight}`"
                >
                <div :id='tagData.id' >
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
    props:{
        tagData: Object,
    },
    computed: mapGetters(['imgPath', 'saveWidth', 'saveHeight', 'tags', 'selectFont', 'userImg']),
    methods:{
        ...mapActions(['alignCenter', 'freePosition', 'moveTag', 'changeSize']),
    },
    mounted(){
        if(this.saveWidth != 0 && this.saveHeight != 0){
            this.changeSize({saveWidth:this.saveWidth, saveHeight:this.saveHeight})
        }
    }
    
}
</script>

<style type="text/css"> 

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

    #imgCard{
        position: absolute;
    }

    .printDiv{
        border: 1px solid;
    }

    #tagTest{
        top:200px;
    } 

    .tags{
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