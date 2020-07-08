import Vue from 'vue'
import Vuex from 'vuex'
import XLSX from 'xlsx'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import cookies from 'vue-cookies';



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // token: 'logout',
    token: cookies.get('login_token'),

    excelData:'',
    
    imgPath:[],
    userImg:'',
    
    saveWidth:0,
    saveHeight:0,
    selectFont: 'Nanum Gothic',
    tags: [{id: 0, name:'', value:'태그1', top:0, left:0, fontSize:40, fontWeight: 300}],
    
  },
  getters:{
    // token: state => state.token,
    isLoggedIn : state => !!state.token,
    
    excelData : state => state.excelData,
    imgPath : state => state.imgPath,
    userImg: state => state.userImg,
    saveWidth : state => state.saveWidth,
    saveHeight : state => state.saveHeight,
    tags: state => state.tags,
    selectFont: state => state.selectFont,
  },
  mutations: {
    setToken : (state, data) => state.token = data,
    setExcelData : (state, data) => state.excelData = data,

    addPath : (state, data) => state.imgPath.push(data),
    setUserImg : (state, data) => state.userImg = data,
   
    setSaveWidth : (state, data) => state.saveWidth = data,
    setSaveHeight : (state, data) => state.saveHeight = data,

    addTag(state){
      if (state.tags.length<5){
        state.tags.push({id: state.tags[state.tags.length-1].id+1 ,name: '', value:`태그${state.tags[state.tags.length-1].id+2}`, top:0, left:0, fontSize:40, fontWeight:300})
      }else{
        alert("태그의 개수는 최대 5개 입니다")
      }
    },
    
    setTagPosition:(state, data) => state.tags[data.i].top = data.top,
    // setTagPosition(state, data){  
    //   state.tags[data.idx].top = data.top
    //   state.tags[data.idx].left = data.left
    // },

    removeTag : (state, idx) => state.tags.length>1 ? state.tags.splice(idx, 1) : state.tags,

    setFont : (state, data) => state.selectFont = data,
    setFontWeight : (state, data) => state.tags[data.idx].fontWeight = data.weight,
    
  },
  actions: {
    readFile({commit}, event) { 
      if(event){
        const file = event
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
      }
    },
    async saveTestFile({state}){
      if (state.excelData.length==0) {
        alert("엑셀 파일을 넣어주세요")
      }else if(!state.saveWidth || !state.saveHeight){
        alert("가로 세로 크기를 입력해 주세요")
      }else{
        const pdf = new jsPDF('p', 'mm', 'a4');
        // const printArea = document.querySelector("#tempCard");
        // const printAreaImg = document.querySelector("#tempImgCard");
        
        const printArea = document.querySelector("#tempDiv")
        const printAreaImg = document.querySelector("#tempImgCard")

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
      }else if(!state.saveWidth || !state.saveHeight){
        alert("가로 세로 크기를 입력해 주세요")
      }else{
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        for(let i=0; i<state.excelData.length; i++){
          const printArea = document.querySelector("#card"+i.toString());
          const printAreaImg = document.querySelector("#imgCard"+i.toString());

          printAreaImg.style.width= `${3.77 * state.saveWidth}px`
          printAreaImg.style.height= `${3.77 * state.saveHeight}px`
          
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

      // dispatch('alignCenter')

    },
    alignCenter({state, commit}){
      for (let i = 0; i < state.tags.length; i++) {
        const element = document.querySelector("#tag"+state.tags[i].id)
        element.style.left = "50%"
        element.style.transform = "translate(-50%)"
        
        commit('setTagPosition', {top:element.style.top, left:element.style.left, i})
      } 
    },
    // moveTag({commit}, idx){
    //   const element = document.querySelector("#tag"+this.state.tags[idx].id)
    //   commit('setTagPosition', {top:element.style.top, left:element.style.left, idx})
    // },
    inputUserImg({commit}, event){
      let files = event.target.files;

      // FileReader support
      if (FileReader && files && files.length) {
          let fr = new FileReader();
          fr.onload = function () {
              document.getElementById("addTestImg").src = fr.result;
              commit('setUserImg', fr.result);
          }
          fr.readAsDataURL(files[0]);
      }

    }
  },
  modules: {
  }
})
