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
                :style="`top:${tag.top}; left: ${tag.left}; transform:translate(-50%); font-size:${tag.fontSize}px; font-family: ${selectFont}; font-weight: ${tag.fontWeight}; color: ${tag.fontColor}`"
                v-if="tag.transform"
                >
                <div>
                    {{tagData[tag.name]}}
                </div>                                     
            </drag-it-dude>
            <drag-it-dude
                v-for="tag in tags" 
                :key="tag.id" 
                :id="`tag${tag.id}`" 
                class="tags" 
                :style="`top:${tag.top}; left: ${tag.left}; font-size:${tag.fontSize}px; font-family: ${selectFont}; font-weight: ${tag.fontWeight}; color: ${tag.fontColor}`"
                v-else
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
                v-for="(tag, idx) in tags" 
                :key="tag.id" 
                :id="`tag${tag.id}`" 
                class="tags"
                :style="`top:${tag.top}; left: 0; font-size:${tag.fontSize}px; font-family: ${selectFont}; font-weight: ${tag.fontWeight}; color: ${tag.fontColor}`"
                >
                <div :id='tagData.id' @click="clickTag(idx)" @mouseup="setPosition(idx)">
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
        ...mapActions(['alignCenter', 'freePosition', 'moveTag', 'changeSize',]),
        clickTag(idx){
            const element = document.querySelector("#tag"+this.tags[idx].id)
            element.style.transform = "translate(0)"
        },
        setPosition(idx){
            const element = document.querySelector("#tag"+this.tags[idx].id)
            this.$store.commit('setTagPosition', {top:element.style.top, left:element.style.left, idx})
            this.$store.commit('setTransform', {value: false, idx})
        }
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