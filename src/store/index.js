import Vue from 'vue'
import Vuex from 'vuex'
import XLSX from 'xlsx'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    excelData:'',
    imgId:'',
    saveWidth:0,
    saveHeigh:0,

  },
  getters:{
    excelData : state => state.excelData,
    imgId :state => state.imgId,
    saveWidth : state => state.saveWidth,
    saveHeight : state => state.saveHeigh,
  },
  mutations: {
    setExcelData : (state, data) => state.excelData = data,

    setImgId :(state, data) => state.imgId = data,

    setSaveWidth : (state, data) => state.saveWidth = data,
    setSaveHeigh : (state, data) => state.saveHeigh = data
  },
  actions: {
    readFile({commit}, event) { 
      const file = event.target.files[0]
      // const fileName = file.name

      const reader = new FileReader()
      // let tmpResult = {}
      
      reader.onload = (e) =>{
          let data = e.target.result
          // data = new Uint8Array(data)

          let excelFile = XLSX.read(data, {type:"array"})
          let rows = XLSX.utils.sheet_to_json(excelFile.Sheets['Sheet1']);
          rows.map((row,idx)=>{
            return row.id=idx
          })
          commit('setExcelData', rows)
      }
      reader.readAsArrayBuffer(file)
    },
    async saveTestFile(){
      const pdf = new jsPDF('p', 'mm', 'a4');
      const printArea = document.getElementById("cardundefined");
      const printAreaImg = document.getElementById("imgCardundefined");

      console.log(printArea.offsetWidth)
      console.log(printArea.offsetHeight)
      printAreaImg.style.width= `${3.77 * 100}px`
      printAreaImg.style.height= `${3.77 * 150}px`
      
      console.log(printArea.offsetWidth)
      console.log(printArea.offsetHeight)

      try{
        const canvas = await html2canvas(printArea )
        const dataURL = canvas.toDataURL();
        pdf.addImage(dataURL, 'JPEG', 5,5);
        pdf.addImage(dataURL, 'JPEG', 105,5); 
        pdf.addImage(dataURL, 'JPEG', 5,155);
        pdf.addImage(dataURL, 'JPEG', 105, 155); 
      } catch(err){
        console.error(err)
      }
      pdf.save('saved.pdf');
    },
    async savePdf({state}) {
      if (state.excelData.length==0) {
          alert("엑셀 파일을 넣어주세요")
      }else{
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        for(let i=0; i<state.excelData.length; i++){
            const printArea = document.getElementById("card"+i.toString());
            const printAreaImg = document.getElementById("imgCard"+i.toString());

            printAreaImg.style.width= `${3.77 * 100}px`
            printAreaImg.style.height= `${3.77 * 150}px`
            
            console.log(printArea.offsetWidth)
            try{
              // const pixel = 3.77
              
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
                      if(i+1 !== state.excelData.length){
                          pdf.addPage();
                      }
                      break;
                  default:
                      break;    
              }
            }catch (err) {
              console.error(err)
            }
            
        }
        pdf.save('saved.pdf');
        
      }
    },
  },
  modules: {
  }
})
