<template>
    <v-card rounded height="100%" class="text-center">
        <v-row style="boder: 1px solid;">
            <v-col cols="1"></v-col>
            <v-col cols="10">
                <v-row no-gutters >
                    <v-col cols="12">
                        <div style="margin:20px 0; display:flex; justify-content: space-around">
                            <v-btn :color="btnColor" small rounded outlined @click="alignCenter">가운데정렬</v-btn>
                            <v-btn :color="btnColor" small rounded outlined @click="$store.commit('addTag')">태그 추가</v-btn>
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
                    <v-col cols="12" style="margin-bottom: 10px;">
                        <v-btn class="mx-1" :color="btnColor" fab outlined small @click="setChangeSize('vh2')"><v-icon>mdi-border-inside</v-icon></v-btn>
                        <v-btn class="mx-1" :color="btnColor" fab outlined small @click="setChangeSize('h2')"><v-icon>mdi-border-horizontal</v-icon></v-btn>
                        <v-btn class="mx-1" :color="btnColor" fab outlined small @click="setChangeSize('v2')"><v-icon>mdi-border-vertical</v-icon></v-btn>
                    </v-col>
                    <v-col cols="12" style="display:flex; justify-content: space-around ">
                        <v-text-field label="가로길이" dense style="padding:3px" v-model="saveWidth" @keypress.enter="changeSize({saveWidth, saveHeight})" autocomplete="off"></v-text-field>
                        <v-text-field label="세로길이" dense style="padding:3px" v-model="saveHeight" @keypress.enter="changeSize({saveWidth, saveHeight})" autocomplete="off"></v-text-field>
                        <v-btn :color="btnColor" rounded outlined small @click="changeSize({saveWidth, saveHeight})" style="margin-top:5px">변경</v-btn>
                    </v-col>

                    <v-col>
                        <v-file-input label="File input" accept=".xlsx" @change="readFile"></v-file-input>
                        <v-btn v-if="paper" :color="btnColor" width="200" rounded outlined @click="changePaper" >출력용지 가로<b style="color: red">세로</b> 변경</v-btn>
                        <v-btn v-else :color="btnColor" width="200" rounded outlined @click="changePaper" >출력용지 <b style="color: red">가로</b>세로 변경</v-btn>
                        <!-- <v-btn color="#9ACD32" rounded large width="95%" @click="savePdf" style="margin-top:10px">이름표 저장</v-btn> -->
                        <v-dialog v-model="dialog" persistent max-width="400px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn 
                                    color="#3CB371" 
                                    rounded outlined width="200"
                                    class="saveBtn"
                                    id="saveCutom"
                                    v-bind="attrs"
                                    v-on="on"
                                    >
                                    <v-icon left>mdi-content-save</v-icon>Template
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">저장할 이름을 입력하세요</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col>
                                                <v-text-field class="pa-0" hide-details dense  style="padding:0px" label="제목" autocomplete="off" v-model="title"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                                    <v-btn color="blue darken-1" text @click="dialog = false, saveCustom({idx:$route.params.idx, title}), title=''">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <!--<v-btn color="#3CB371" rounded outlined width="200" @click="saveCustom($route.params.idx, title)" class="saveBtn" id="saveCutom">
                            <v-icon left>mdi-content-save</v-icon>Template
                        </v-btn>-->
                        <v-btn color="#4169E1" rounded outlined width="200" @click="saveTestFile" class="saveBtn">
                            <v-icon left>mdi-content-save</v-icon>Test
                        </v-btn>
                        <v-btn color="#FF7F50" rounded outlined width="200" @click="savePdf" class="saveBtn">
                            <v-icon left>mdi-content-save</v-icon>PDF
                            <!-- <v-text-field color="success" loading disabled style="position: absolute;" v-if="saving"></v-text-field>-->
                            <v-progress-linear :value="saving" rounded color="red lighten-2" style="position: absolute; top: 110%" v-if="saving != 0"></v-progress-linear>
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
            dialog: false,

            title: '',
            saveWidth:'',
            saveHeight:'',

            btnColor: '#708090',

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
                {id: 'Do Hyeon', name: '도현'}
            ],
            weightList: [100, 200, 300, 400, 500, 600, 700, 800, 900],
            selectWeight:[300,300,300,300,300]
        }
    },
    computed:{
        ...mapGetters(['tags', 'fileName', 'selectFont', 'token', 'imgPath', 'isLoggedIn', 'saving', 'paper']),
    },
    methods:{
        ...mapActions(['readFile', 'savePdf', 'saveTestFile', 'changeSize', 'alignCenter', 'saveCustom', 'changePaper']),
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
        setChangeSize(type) {
            console.log(this.paper);
            console.log(type);
            if(this.paper) {
                switch(type) {
                    case 'vh2':
                        this.saveWidth = 100;
                        this.saveHeight = 143;
                        break;
                    case 'v2':
                        this.saveWidth = 100;
                        this.saveHeight = 287;
                        break;
                    case 'h2':
                        this.saveWidth = 200;
                        this.saveHeight = 143;
                        break;
                }
            } else {
                switch(type) {
                    case 'vh2':
                        this.saveWidth = 143;
                        this.saveHeight = 100;
                        break;
                    case 'v2':
                        this.saveWidth = 143;
                        this.saveHeight = 200;
                        break;
                    case 'h2':
                        this.saveWidth = 287;
                        this.saveHeight = 100;
                        break;
                }

            }

            console.log(this.saveWidth);
            console.log(this.saveHeight);

            this.changeSize({saveWidth: this.saveWidth, saveHeight: this.saveHeight});
        },

    },
    watch:{
        // saveWidth:(val,old)=>{
        //     if(val > 250){
        //         alert("글씨 크기는 250까지 입력 가능합니다")
        //         this.saveWidth=old
        //     }
        // },
    }
}
</script>

<style>
    #toolBox{
        background-color: rgba(0,0,0,0);
    }
    #tagBox{
        height:350px;
        overflow-y: scroll;
    }
    .inputTags{
        padding-top:10px;
        margin-bottom: 20px;
    }
    .saveBtn{
        margin-top:10px;
        position:relative;
    }
    .pdfSave{
        color: white;
    }
</style>