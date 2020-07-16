import Vue from 'vue'
import Vuex from 'vuex'
import XLSX from 'xlsx'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import firebase from '@/firebase/init'

import cookies from 'vue-cookies';



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // token: 'logout',
    token: cookies.get('login_token'),
    email: '',

    excelData:'',
    
    imgPath:[],
    userImg:'',
    
    saveWidth:0,
    saveHeight:0,
    selectFont: 'Nanum Gothic',
    tags: [{id: 0, name:'', value:'태그1', top:0, left:0, fontSize:40, fontWeight: 300}],

    saving: 0,

    myList:JSON.parse(cookies.get('myList')),
    
  },
  getters:{
    // token: state => state.token,
    isLoggedIn : state => !!state.token,
    email: state => state.email,
    
    excelData : state => state.excelData,
    imgPath : state => state.imgPath,
    userImg: state => state.userImg,
    saveWidth : state => state.saveWidth,
    saveHeight : state => state.saveHeight,
    tags: state => state.tags,
    selectFont: state => state.selectFont,

    saving: state=> state.saving,
    myList : state => state.myList,
  },
  mutations: {
    setToken : (state, data) => state.token = data,
    setEmail : (state, data) => state.email = data,

    setExcelData : (state, data) => state.excelData = data,

    addPath : (state, data) => state.imgPath.push(data),
    setUserImg : (state, data) => state.userImg = data,
   
    setSaveWidth : (state, data) => state.saveWidth = parseInt(data),
    setSaveHeight : (state, data) => state.saveHeight = parseInt(data),

    setTags : (state, data) => state.tags = data,

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

    saving (state, data){
      if(state.saving >= 100 || data == 0){
        state.saving = 0
      }else{
        state.saving = data
      }
    
    },
    resetMyList : (state) => state.myList = [],
    setMyList : (state, data) => state.myList.push(data),
    
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
    saveCustom({state, commit}, data){
      if(!state.token){
        alert("로그인 후 저장할 수 있습니다!")
      }else{
        let stored = false
        for(let item of state.myList){
          if(item.title === data.title){
            stored = true
            break
          }
        }
        let image = data.idx ? state.imgPath[data.idx] : state.userImg 
        if(stored){
          firebase.firestore().collection('saveList').where('email', '==', state.email).get()
          .then(snapshot => {
            if(!snapshot.empty){
              snapshot.forEach( doc => {
                if(doc.data().title == data.title){
                  firebase.firestore().collection('saveList').doc(doc.id)
                  .update({
                    image,
                    selectFont : state.selectFont,
                    tags : state.tags,
                    size : {
                      width : state.saveWidth,
                      height : state.saveHeight
                    }
                  })
                }
              })
            }
          })
          .then(
            alert("저장 되었습니다")
          )
          .then(()=>{
            cookies.remove('myList')
            commit('resetMyList')
            firebase.firestore().collection('saveList').where('email', '==', state.email).get()
            .then(snapshot => {
              if(!snapshot.empty){
                snapshot.forEach( doc => {
                  commit('setMyList', doc.data())
                  cookies.set('myList', JSON.stringify(state.myList))
                })
              }
            })
            .catch(err=>{
              console.log("firebase error")
              console.log(err)
            })
          })
          .catch(err=>{
            console.log("firebase error")
            console.log(err)
          })
        }else{
          firebase.firestore().collection('saveList')
          .add({
            title: data.title,
            email: state.email,
            image,
            selectFont : state.selectFont,
            tags : state.tags,
            size : {
              width : state.saveWidth,
              height : state.saveHeight
            }
          })
          .then(
            alert("저장 되었습니다")
          )
          .then(()=>{
            cookies.remove('myList')
            commit('resetMyList')
            firebase.firestore().collection('saveList').where('email', '==', state.email).get()
            .then(snapshot => {
              if(!snapshot.empty){
                snapshot.forEach( doc => {
                  commit('setMyList', doc.data())
                  cookies.set('myList', JSON.stringify(state.myList))
                })
              }
            })
            .catch(err=>{
              console.log("firebase error")
              console.log(err)
            })
          })
          .catch(err=>{
              console.log(err)
          })
        }
      }
    },
    removeItem({state, commit}, idx){
      console.log("removeItem")
      firebase.firestore().collection('saveList').where('email', '==', state.email).get()
      .then(snapshot => {
        if(!snapshot.empty){
          snapshot.forEach( doc => {
            if(doc.data().title == state.myList[idx].title){
              firebase.firestore().collection('saveList').doc(doc.id).delete()
            }
          })
        }
      }).then(
        alert("삭제 되었습니다")
      )
      .then(()=>{
        cookies.remove('myList')
        commit('resetMyList')
        firebase.firestore().collection('saveList').where('email', '==', state.email).get()
        .then(snapshot => {
          if(!snapshot.empty){
            snapshot.forEach( doc => {
              commit('setMyList', doc.data())
              cookies.set('myList', JSON.stringify(state.myList))
            })
          }
        })
        .catch(err=>{
          console.log("firebase error")
          console.log(err)
        })
      })
      .catch(err=>{
          console.log(err)
      })
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

          let width = 0
          let height = 0

          for(let i=0; i<10; i++){
            if(width + state.saveWidth <=200){
              if(height + state.saveHeight <= 290){
                pdf.addImage(dataURL, 'JPEG', 5+width, 5+height)
                width = width + state.saveWidth
                // height = state.saveHeight
              }else{
                height = 0
              }
            }else{
              height = height + state.saveHeight
              if(height + state.saveHeight <= 287){
                pdf.addImage(dataURL, 'JPEG', 5, 5+height)
                width = state.saveWidth

              }else{
                pdf.addPage()
                pdf.addImage(dataURL, 'JPEG', 5, 5)
                width = state.saveWidth
                height = 0
              }
            }
          }
          // pdf.addImage(dataURL, 'JPEG', 5,5);
          // pdf.addImage(dataURL, 'JPEG', 105,5); 
          // pdf.addImage(dataURL, 'JPEG', 5, 148.5);
          // pdf.addImage(dataURL, 'JPEG', 105,  148.5); 

        } catch(err){
          console.error(err)
        }
        pdf.save('saved.pdf');
      }
    },
    async savePdf({state, commit}) {
      if (state.excelData.length==0) {
        alert("엑셀 파일을 넣어주세요")
      }else if(!state.saveWidth || !state.saveHeight){
        alert("가로 세로 크기를 입력해 주세요")
      }else{
        let width = 0
        let height = 0

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

            if(width + state.saveWidth <=200){
              if(height + state.saveHeight <= 290){
                pdf.addImage(dataURL, 'JPEG', 5+width, 5+height)
                width = width + state.saveWidth
                // height = state.saveHeight
              }else{
                height = 0
              }
            }else{
              height = height + state.saveHeight
              if(height + state.saveHeight <= 287){
                pdf.addImage(dataURL, 'JPEG', 5, 5+height)
                width = state.saveWidth

              }else{
                pdf.addPage()
                pdf.addImage(dataURL, 'JPEG', 5, 5)
                width = state.saveWidth
                height = 0
              }
            }
            commit('saving', (state.saving + (100 /state.excelData.length )))
          }catch (err) {
            console.error(err)
          }
          
        }
        pdf.save('saved.pdf');
        commit('saving', 0)
      }
    },
    changeSize({commit}, data){
      if(data.saveHeight <= 200 && data.saveWidth <= 200){
        commit('setSaveWidth',data.saveWidth)
        commit('setSaveHeight',data.saveHeight)
        const printAreaImg = document.querySelector("#tempImgCard");
        
        printAreaImg.style.width= `${3.77 * data.saveWidth}px`
        printAreaImg.style.height= `${3.77 * data.saveHeight}px`
        
      }else{
        alert("가로세로는 최대 200(mm)까지 입력이 가능합니다")
      }
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

    },

  },
  modules: {
  }
})
