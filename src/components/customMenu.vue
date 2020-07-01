<template>
    <v-card  height="100%" class="text-center" id="toolBox">
        <v-row style="boder: 1px solid;">
            <v-col cols="1"></v-col>
            <v-col cols="10">
                <v-row >
                    <v-col cols="12">
                    <div id="tagBox">
                        <div class="inputTags" v-for="(tag, idx) in tags" :key="tag.id" >
                            <v-row dense no-gutters>
                                    <v-col cols="3">
                                        <v-text-field class="pa-0" hide-details dense  style="padding:0px" label="tag" v-model="tag.name" ></v-text-field>
                                    </v-col>
                                    <v-col cols="6"> 
                                        <v-text-field class="pa-0" hide-details dense  style="padding:0px" label="value" v-model="tag.value"></v-text-field>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-text-field class="pa-0" hide-details dense  style="padding:0px" label="font" type="number" v-model="tag.fontSize"></v-text-field>
                                    </v-col>
                                    <v-col cols="1">
                                        <v-btn class="mx-2" fab dark x-small outlined color="error" @click="$store.commit('removeTag', idx)">
                                            <v-icon >mdi-minus</v-icon>
                                        </v-btn>
                                        
                                    </v-col>
                            </v-row>
                        </div>
                    </div>
                    <v-btn @click="alignCenter">가운데정렬</v-btn>
                    <v-btn @click="$store.commit('addTag')">태그 추가</v-btn>
                
                    </v-col>

                    <v-col cols="12" style="display:flex; ">
                        <v-text-field label="가로길이" dense style="padding:0px" v-model="saveWidth" @keypress.enter="changeSize({saveWidth, saveHeight})"></v-text-field>
                        <v-text-field label="세로길이" dense style="padding:0px" v-model="saveHeight" @keypress.enter="changeSize({saveWidth, saveHeight})"></v-text-field>
                        <v-btn small @click="changeSize({saveWidth, saveHeight})" style="margin-top:5px">변경</v-btn>
                    </v-col>
                    <v-col>
                        <div style="border: 1px ridge;">
                            <input type="file" @change="readFile">
                        </div>
                        <v-btn large width="200" @click="saveTestFile" style="margin-top:10px">Test 파일 저장하기</v-btn>
                        <v-btn large width="200" @click="savePdf" style="margin-top:10px">PDF로 저장하기</v-btn>
                    </v-col>
                    
                </v-row>
                
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'customMenu',
    data() {
        return {
            saveWidth:'',
            saveHeight:'',

        }
    },
    computed:{
        ...mapGetters(['tags'])
    },
    methods:{
        ...mapActions(['readFile', 'savePdf', 'saveTestFile', 'changeSize', 'alignCenter']),
        addTag(){
            this.tags.push({name: `태그${this.tags.length+1}`, value:''})
        },
    }
}
</script>

<style>
    .my-2{
        width:90%;
        margin:auto;
    }
    #toolBox{
        background-color: rgba(0,0,0,0);
    }
    #tagBox{
        height:250px;
        /* overflow-x: visible;    
        overflow-y: scroll; */

    }
    .inputTags{
        padding-top:10px;
    }
</style>