<template>
    <v-card outlined height="100%">
       <!--  <div class="my-2" >
            <v-text-field label="가로길이" :full-width="true"></v-text-field>
            <v-btn small color="primary" >변경</v-btn>
        </div>
        <div class="my-2">
            <input type="file" @change="readFile">
        </div>
        <div class="my-2">
            <v-btn large color="primary" width="200" @click="saveTestFile">Test 파일 저장하기</v-btn>
        </div>

        <div class="my-2">
            <v-btn large color="primary" width="200" @click="savePdf">PDF로 저장하기</v-btn>
        </div> -->
        <v-row :dense="true" >
            <v-col cols="12" sm="1"></v-col>
            <v-col cols="12" sm="10" style="display:flex;">
                <v-text-field label="이름" dense style="padding:0px" v-model="saveWidth"></v-text-field>
                <!-- <v-btn small color="primary" @click="$store.commit('setSaveWidth', saveWidth)">변경</v-btn> -->
            </v-col>
            <v-col cols="12" sm="1"></v-col>
            <v-col cols="12" sm="1"></v-col>
            <v-col cols="12" sm="10">
                <v-text-field label="소속" dense style="padding:0px" v-model="saveHeigh"></v-text-field>
            </v-col>
            <v-col cols="12" sm="1"></v-col>
            
            <v-col cols="12" sm="12">
                <div style="height:500px;"></div>
            </v-col>

            
            <v-col cols="12" sm="1"></v-col>
            <v-col cols="12" sm="4" style="display:flex;">
                <v-text-field label="가로길이" dense style="padding:0px" v-model="saveWidth"></v-text-field>
                <!-- <v-btn small color="primary" @click="$store.commit('setSaveWidth', saveWidth)">변경</v-btn> -->
            </v-col>
            <v-col cols="12" sm="4">
                <v-text-field label="세로길이" dense style="padding:0px" v-model="saveHeigh"></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
                <v-btn small color="primary" @click="$store.commit('setSaveHeight', saveHeigh)" style="margin-top:5px">변경</v-btn>
            </v-col>
            <v-col>
                <div style="border: 1px ridge;">
                    <input type="file" @change="readFile">
                </div>
                <v-btn large color="primary" width="200" @click="saveTestFile" style="margin-top:10px">Test 파일 저장하기</v-btn>
                <v-btn large color="primary" width="200" @click="savePdf" style="margin-top:10px">PDF로 저장하기</v-btn>
            </v-col>
        </v-row>

    </v-card>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: 'customMenu',
    data() {
        return {
            saveWidth:'',
            saveHeigh:'',
        }
    },
    methods:{
        ...mapActions(['readFile', 'savePdf', 'saveTestFile']),
    }
}
</script>

<style>
    .my-2{
        width:90%;
        margin:auto;
    }
</style>