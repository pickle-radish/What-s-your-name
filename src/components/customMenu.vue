<template>
    <v-card outlined height="100%">

        <div class="my-2">
            <input type="file" @change="readFile">
        </div>
        <div class="my-2">
            <v-btn large color="primary" width="200" @click="saveTestFile">Test 파일 저장하기</v-btn>
        </div>
        <div class="my-2">
            <v-btn large color="primary" width="200" @click="savePdf">PDF로 저장하기</v-btn>
        </div>
        
    </v-card>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: 'customMenu',

    methods:{
        ...mapActions(['readFile', 'savePdf', 'saveTestFile']),
    }
}
</script>

<style>

</style>