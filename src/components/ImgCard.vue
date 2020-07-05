<template>
    <div id="imgCard">
        <div :id="`card${tagData.id}`" class="printDiv" v-if="tagData.id != undefined">
            <img src="@/img/b.jpg" alt="customImg" class="imageCard" :id="`imgCard${tagData.id}`">
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
            <img :src="imgPath[$route.params.idx]" alt="customImg" width="500" class="imageCard" :id="`tempImgCard`">
            <drag-it-dude
                v-for="tag in tags" 
                :key="tag.id" 
                :id="`tag${tag.id}`" 
                class="tags"
                :style="`font-size:${tag.fontSize}px; font-family: ${selectFont}; font-weight: ${tag.fontWeight} `"
                >
                <div :id='tagData.id' >
                    {{tag.value}}
                </div>
            </drag-it-dude>
        </div>
    </div >
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
    computed: mapGetters(['imgPath', 'saveWidth', 'saveHeight', 'tags', 'selectFont']),
    methods:{
        ...mapActions(['alignCenter', 'freePosition', 'moveTag']),
        printImgPath(){
            console.log(this.imgPath[0])
            console.log(this.imgPath[1])
        }
    },
    created(){
        this.printImgPath()
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