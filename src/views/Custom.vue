<template>
    <v-app>
        <h1>image custom</h1>
        <v-row style="height:300" class="text-center">
            <v-col :cols="9">
                <v-row>
                    <v-col>
                        <div id="imgDiv">
                            <div class="saveCard" v-if="!excelData">
                                <ImgCard :tagData="testData"/>
                            </div>
                            <div v-for="row in excelData" :key="row.id" class="saveCard">
                                <ImgCard :tagData="row"/>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-col>   
            <v-col :cols="3">
                <v-card outlined height="100%">
                    <div class="my-2">
                        <input type="file" @change="readFile">
                    </div>
                    <div class="my-2">
                        <v-btn large color="primary" @click="savePdf">PDF로 저장하기</v-btn>
                    </div>
                    
                    <div class="my-2">
                        <v-btn large color="primary" @click="refTest">ref test</v-btn>
                        
                    </div>
                    
                </v-card>
            </v-col>
        </v-row>
    </v-app>
</template>

<script>
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'

import ImgCard from '@/components/ImgCard.vue'

export default {
    name:"Custom",
    data() {
        return {
            testData:{
                이름:"나상문",
                소속:"열린문교회"
            }
        }
    },
    components: {
        ImgCard
    },
    computed: mapGetters(['excelData']),
    methods:{
        ...mapActions(['readFile', 'refTest']),
        async savePdf() {
            console.log(this.excelData)
            if (this.excelData.length==0) {
                alert("엑셀 파일을 넣어주세요")
            }else{
                const pdf = new jsPDF('p', 'mm', 'a4');
                
                for(let i=0; i<this.excelData.length; i++){
                    // const printArea = document.getElementById("card"+i.toString());
                    const printArea = this.$refs.card+i
                    const canvas = await html2canvas(printArea)

                    const dataURL = canvas.toDataURL();
                    switch(i%4){
                        case 0:
                            pdf.addImage(dataURL, 'JPEG', 5,5); 
                            break;
                        case 1:
                            pdf.addImage(dataURL, 'JPEG', 105,5); 
                            break;
                        case 2:
                            pdf.addImage(dataURL, 'JPEG', 5,155); 
                            break;
                        case 3:
                            pdf.addImage(dataURL, 'JPEG', 105, 155); 
                            if(i+1 !== this.excelData.length){
                                pdf.addPage();
                            }
                            break;
                        default:
                            break;    
                    }
                }
                pdf.save('saved.pdf');
                
            }
        }
    },
    created(){
        // this.path = require(`@/img/${this.$route.query.name}.jpg`)
        this.$store.commit('setImgId', this.$route.query.name)
    },
}
</script>

<style>
    #imgDiv{
        position:relative;
        width:500px;
        margin:auto;
    }
    .saveCard{
        width:100%;
        margin-top:100px;

        position:absolute;

        top:0;
        left:50%;
        transform:translate(-50%);

        z-index:1;

    }
</style>

