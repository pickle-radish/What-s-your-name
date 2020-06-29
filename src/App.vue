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
export default {
  name: 'App',

  components: {
    navBar
  },

  data: () => ({
    //
  }),
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
    background-color: lightcyan;
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