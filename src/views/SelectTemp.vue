<template>
     <v-container>
        
        <v-row style="margin-top:100px; height:300">
            
            <v-col :cols="3">
                <v-card class="pa-2" outlined tile height="100%"></v-card>
            </v-col>
            <v-col :cols="3">
                <router-link to="/custom?name=a">
                    <v-card class="pa-2" outlined tile height="100%">
                        <v-img src="../img/a.jpg" height="100%" contain></v-img>
                    </v-card>
                </router-link>
            </v-col>
            <v-col :cols="3">
                <router-link to="/custom?name=b">
                <v-card class="pa-2" outlined tile height="100%">
                    <v-img src="@/img/b.jpg" height="100%" contain></v-img>
                </v-card>
                </router-link>
            </v-col>
            <v-col :cols="3">
                <v-card class="pa-2" outlined tile height="100%">

                </v-card>
            </v-col>
            
        </v-row>
    </v-container>
</template>

<script>
export default {

}
</script>

<style>
</style>