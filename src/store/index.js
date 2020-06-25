import Vue from 'vue'
import Vuex from 'vuex'
import XLSX from 'xlsx'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    excelData:'',
    imgId:'',

  },
  getters:{
    excelData(state){
      return state.excelData
    },
    imgId(state){
      return state.imgId
    },

  },
  mutations: {
    setExcelData(state, data){
      state.excelData = data
    },
    setImgId(state, data){
      state.imgId = data
    }
  },
  actions: {
    readFile(context, event) { 
      const file = event.target.files[0]
      // const fileName = file.name

      const reader = new FileReader()
      // let tmpResult = {}
      
      reader.onload = (e) =>{
          let data = e.target.result
          // data = new Uint8Array(data)

          let excelFile = XLSX.read(data, {type:"array"})
          let rows = XLSX.utils.sheet_to_json(excelFile.Sheets['Sheet1']);
          context.commit('setExcelData', rows)
          
          console.log(JSON.stringify(rows));
      }
      reader.readAsArrayBuffer(file)
    },
  },
  modules: {
  }
})
