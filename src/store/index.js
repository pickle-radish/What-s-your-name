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
    saveWidth:100,
    saveHeight:145,
    tags: [{id: 0, name:'', value:'태그1', top:0}],
  },
  getters:{
    excelData : state => state.excelData,
    imgId :state => state.imgId,
    saveWidth : state => state.saveWidth,
    saveHeight : state => state.saveHeight,
    tags: state => state.tags,
  },
  mutations: {
    setExcelData : (state, data) => state.excelData = data,

    setImgId :(state, data) => state.imgId = data,

    setSaveWidth : (state, data) => state.saveWidth = data,
    setSaveHeight : (state, data) => state.saveHeight = data,

    addTag: state => state.tags.push({id: state.tags.length ,name: '', value:`태그${state.tags.length+1}`, top:0}),
    
    setTagPosition:(state, data) => state.tags[data.i].top = data.top 
    // transform(state){
    //   state.excelData.map(item=>{
    //     item.forEach
    //     return item.tags = 
    //   }) 
    // }
  },
  actions: {
    readFile({commit, state}, event) { 
      

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
          console.log(state.excelData)
      }
      reader.readAsArrayBuffer(file)
    },
    async saveTestFile({state}){
      if (state.excelData.length==0) {
        alert("엑셀 파일을 넣어주세요")
      }else{
        const pdf = new jsPDF('p', 'mm', 'a4');
        // const printArea = document.querySelector("#tempCard");
        // const printAreaImg = document.querySelector("#tempImgCard");
        
        const printArea = document.querySelector("#card0")
        const printAreaImg = document.querySelector("#imgCard0")

        printAreaImg.style.width= `${3.77 * state.saveWidth}px`
        printAreaImg.style.height= `${3.77 * state.saveHeight}px`

        try{
          const canvas = await html2canvas(printArea)
          const dataURL = canvas.toDataURL();
          pdf.addImage(dataURL, 'JPEG', 5,5);
          pdf.addImage(dataURL, 'JPEG', 105,5); 
          pdf.addImage(dataURL, 'JPEG', 5, 148.5);
          pdf.addImage(dataURL, 'JPEG', 105,  148.5); 
        } catch(err){
          console.error(err)
        }
        pdf.save('saved.pdf');
      }
    },
    async savePdf({state}) {
      if (state.excelData.length==0) {
          alert("엑셀 파일을 넣어주세요")
      }else{
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        for(let i=0; i<state.excelData.length; i++){
          const printArea = document.querySelector("#card"+i.toString());
          const printAreaImg = document.querySelector("#imgCard"+i.toString());

          printAreaImg.style.width= `${3.77 * state.saveWidth}px`
          printAreaImg.style.height= `${3.77 * state.saveHeight}px`
          
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
                    pdf.addImage(dataURL, 'JPEG', 5, 148.5); 
                    break;
                case 3:
                    pdf.addImage(dataURL, 'JPEG', 105, 148.5); 
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
    changeSize({commit}, data){
      commit('setSaveWidth',data.saveWidth)
      commit('setSaveHeight',data.saveHeight)
      const printAreaImg = document.querySelector("#tempImgCard");
      
      printAreaImg.style.width= `${3.77 * data.saveWidth}px`
      printAreaImg.style.height= `${3.77 * data.saveHeight}px`

    },
    alignCenter({state, commit}){
      for (let i = 0; i < state.tags.length; i++) {
        const element = document.querySelector("#tag"+i.toString())
        element.style.left = "50%"
        element.style.transform = "translate(-50%)"
        
        commit('setTagPosition', {top:element.style.top, i})
      } 
    },
  },
  modules: {
  }
})
