<template>
  <v-app>
      <div id="background">
        <div id="backgroundCover"></div>
      </div> 
      <div>
        <navBar />
      </div>
      <div id="routerBody">
        <router-view />
      </div>
  </v-app>
</template>

<script>
import navBar from '@/components/navBar.vue'
import cookies from 'vue-cookies'
import router from '@/router/index'

export default {
  name: 'App',

  components: {
    navBar
  },

  data: () => ({
    //
  }),

  beforeRouteLeave (to, from, next) {
    // If the form is not dirty or the user confirmed they want to lose unsaved changes,
    // continue to next view
    if (!this.form_dirty || this.confirmLeave()){
      next()
    } else {
      // Cancel navigation
      next(false)
    }
  },

  created() {
    window.addEventListener('beforeunload', this.refresh)
    // window.addEventListener('keydown', this.disableF5)

    if(cookies.get('refresh')){
      router.push('/')
      cookies.remove('refresh')
    }
  },

  // beforeDestroy() {
  //   window.removeEventListener('beforeunload', this.onBeforeUnload)
  // },

  methods: {
    disableF5(e) { 
      if ((e.which || e.keyCode) == 116 || (e.which || e.keyCode) == 82 && event.shiftKey) {
        e.preventDefault() 
        
        // e.returnValue = '';
        // location.pathname ='/'
      }
      
    },
    refresh (e) {
      e.preventDefault()
      e.returnValue = '';
      
      cookies.set('refresh', true)
    },
    // my_onkeydown_handler() {
    //   switch (event.keyCode) {
    //     case 116 : // 'F5'
    //       event.returnValue = false;
    //       event.keyCode = 0;
    //       window.status = "We have disabled F5";
    //       break;
    //   }
    // },
    
    // onBeforeUnload(e) {
    //   if (this.form_dirty && !this.confirmLeave()) {
    //     // Cancel the event
    //     e.preventDefault()
    //     // Chrome requires returnValue to be set
    //     e.returnValue = ''
    //   }   
    // },

    // confirmLeave() {
    //   return window.confirm('Do you really want to leave? you have unsaved changes!')
    // }, 
  },

  // beforeRouteLeave (to, from, next) {
  //   // If the form is not dirty or the user confirmed they want to lose unsaved changes,
  //   // continue to next view
  //   if (!this.form_dirty || this.confirmLeave()){
  //     next('/')
  //   } else {
  //     // Cancel navigation
  //     next(false)
  //   }
  // },

  // created() {
  //   window.addEventListener('beforeunload', this.refresh)
  // },
  // beforeDestroy() {
  //   window.removeEventListener('beforeunload', this.refresh)
  // },


  // methods: {
  //   refresh (e) {
  //     e.preventDefault()
  //     e.returnValue = '';
  //     this.$router.push('/')
  //   },
  // },

};
</script>

<style>
  #mainBody{
    margin-top:50px;
  }
  #background{
    position: absolute;
    width: 100%;
    height: 100vh;
    background-color: Lavender;
  } 
   #backgroundCover{
    width: 100%;
    height: 85%; 
    background-color: white;
    border-bottom-left-radius: 70% 50% ;
    border-bottom-right-radius: 30% 10% ;
  }

  #routerBody{
    height: calc(100vh - 50px );
  }
  #routerBody>div{
    height:100%;
  }
</style>