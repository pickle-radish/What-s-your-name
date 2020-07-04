<template>
    <v-card  height="100%" class="text-center" id="toolBox">
        <v-row style="boder: 1px solid;">
            <v-col cols="1"></v-col>
            <v-col cols="10">
                <v-row no-gutters >
                    <v-col cols="12">
                        <div style="margin:20px 0; display:flex; justify-content: space-around">
                            <v-btn :color="btnColor" small rounded @click="alignCenter">가운데정렬</v-btn>
                            <v-btn :color="btnColor" small rounded @click="$store.commit('addTag')">태그 추가</v-btn>
                        </div>
                        <div>
                            <v-select :items="fontList" label="글꼴 선택" item-value='id' item-text="name" :value="selectFont" @input="setFont"></v-select>
                        </div>
                        <div id="tagBox">
                            <div class="inputTags" v-for="(tag, idx) in tags" :key="tag.id" >
                                <v-row dense no-gutters>
                                        <!-- <v-col cols="3">
                                            <v-text-field class="pa-0" hide-details dense  style="padding:0px" label="tag" v-model="tag.name" autocomplete="off"></v-text-field>
                                        </v-col>
                                        <v-col cols="6"> 
                                            <v-text-field class="pa-0" hide-details dense  style="padding:0px" label="value" v-model="tag.value" autocomplete="off"></v-text-field>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-text-field class="pa-0" hide-details dense  style="padding:0px" label="font" type="number" v-model="tag.fontSize" autocomplete="off"></v-text-field>
                                        </v-col> -->
                                        <v-col cols="9">
                                            <div style="display:flex; justify-content: space-around">
                                                <v-text-field
                                                    class="pa-0 "
                                                    hide-details
                                                    dense
                                                    style="padding:0px"
                                                    label="tag"
                                                    v-model="tag.name"
                                                    autocomplete="off"
                                                >
                                                </v-text-field>
                                                <v-text-field
                                                    class="pa-0 "
                                                    hide-details
                                                    dense
                                                    style="padding:0px"
                                                    label="크기"
                                                    type="number"
                                                    v-model="tag.fontSize"
                                                    autocomplete="off"
                                                >
                                                </v-text-field>
                                                <v-select 
                                                    hide_details
                                                    dense 
                                                    :items="weightList"
                                                    label="굵기"
                                                    v-model="selectWeight[idx]"
                                                    @input="setFontWeight(idx)"
                                                >
                                                </v-select>
                                            </div>
                                            <v-text-field class="pa-0" hide-details dense  style="padding:0px" label="value" v-model="tag.value" autocomplete="off"></v-text-field>
                                               
                                        </v-col>
                                        <v-col style="display:flex; align-items: center; justify-content: flex-end;">
                                            <v-btn class="mx-2" fab dark x-small outlined color="error" @click="removeTag(idx)">
                                                <v-icon >mdi-minus</v-icon>
                                            </v-btn>
                                        </v-col>
                                </v-row>
                            </div>
                        </div>
                        
                    </v-col>
                    <v-col cols="12" style="display:flex; justify-content: space-around ">
                        <v-text-field label="가로길이" dense style="padding:3px" v-model="saveWidth" @keypress.enter="changeSize({saveWidth, saveHeight})" autocomplete="off"></v-text-field>
                        <v-text-field label="세로길이" dense style="padding:3px" v-model="saveHeight" @keypress.enter="changeSize({saveWidth, saveHeight})" autocomplete="off"></v-text-field>
                        <v-btn :color="btnColor" rounded small @click="changeSize({saveWidth, saveHeight})" style="margin-top:5px">변경</v-btn>
                    </v-col>

                    <v-col>
                        <v-file-input label="File input" accept=".xlsx" @change="readFile"></v-file-input>
                        
                        <!-- <v-btn color="#9ACD32" rounded large width="95%" @click="savePdf" style="margin-top:10px">이름표 저장</v-btn> -->
                        
                        <v-btn :color="btnColor" rounded width="200" @click="saveCustom" class="saveBtn" id="saveCutom">이름표 양식 저장</v-btn>
                        <v-btn color="#4169E1" rounded width="200" @click="saveTestFile" class="saveBtn">
                            <div class="pdfSave">Test저장</div>
                        </v-btn>
                        <v-btn color="#FF7F50" rounded width="200" @click="savePdf" class="saveBtn">
                            <div class="pdfSave">PDF저장</div>
                        </v-btn>
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

            btnColor: '#F3F1F6',

            fontList:[
                {id: 'Nanum Gothic', name: "나눔고딕"},
                {id: 'Gothic A1', name: "고딕AI"},
                {id: 'Black Han Sans', name: "검은고딕"},
                {id: 'Nanum Gothic Coding', name: "나눔고딕코딩"},
                {id: 'Nanum Myeongjo', name: "나눔명조"},
                {id: 'Song Myung', name: "송명"},
                {id: 'Gamja Flower', name: "감자꽃마을"},
                {id: 'Gaegu', name: "개구쟁이"},
                {id: 'Gugi', name: "구기"},
                {id: 'Cute Font', name: "귀여운 폰트"},
            ],
            weightList: [100, 200, 300, 400, 500, 600, 700, 800, 900],
            selectWeight:[300,300,300,300,300]
        }
    },
    computed:{
        ...mapGetters(['tags', 'fileName', 'selectFont', 'token', 'imgPath', '']),
    },
    methods:{
        ...mapActions(['readFile', 'savePdf', 'saveTestFile', 'changeSize', 'alignCenter', ]),
        addTag(){
            this.tags.push({name: `태그${this.tags.length+1}`, value:''})
        },
        removeTag(idx){
            this.selectWeight.splice(idx, 1)
            this.selectWeight.push(300)
            this.$store.commit('removeTag', idx)
        },
        setFont(val){
            this.$store.commit('setFont', val)
        },
        setFontWeight(idx){
            this.$store.commit('setFontWeight', {weight: this.selectWeight[idx], idx})
        },
        saveCustom(){
            if(this.token == 'logout'){
                alert('로그인 후 저장 가능합니다!')
            }else{
                console.log()
            }
        },
    },
}
</script>

<style>
    #toolBox{
        background-color: rgba(0,0,0,0);
    }
    #tagBox{
        height:400px;
        overflow-y: scroll;
    }
    .inputTags{
        padding-top:10px;
        margin-bottom: 20px;
    }
    .saveBtn{
        margin-top:10px;
    }
    .pdfSave{
        color: white;
    }
</style>