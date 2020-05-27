<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>파일
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="파일 검색"
        single-line
        hide-details
      ></v-text-field>
    </v-toolbar>
    <v-list two-line subheader>
      <v-subheader inset>Folders</v-subheader>
      <v-list-item
        v-for="item in this.$store.getters.folderL"
        :key="item.title"
        @click="$router.push({name: 'Folder'})"
      >
        <v-list-item-avatar>
          <v-icon>mdi-folder</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="item.folder_name"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-divider inset></v-divider>
      <v-subheader inset>Files</v-subheader>
      <v-list-item
        v-for="item in this.$store.getters.fileL"
        :key="item.title"
        @click=""
      >
        <v-list-item-avatar>
          <v-icon> mdi-file</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="item"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-file-input
     v-model="files"
     color="deep-purple accent-4"
     counter
     label="업로드"
     multiple
     placeholder="파일을 화면으로 드래그앤 드롭 하거나, 이곳을 클릭하세요."
     prepend-icon="mdi-paperclip"
     outlined
     :show-size="1000"
     >
     <template v-slot:selection="{ index, text }">
       <v-chip
         v-if="index < 2"
         color="deep-purple accent-4"
         dark
         label
         small
       >
         {{ text }}
       </v-chip>
       <span
         v-else-if="index === 2"
         class="overline grey--text text--darken-3 mx-2"
       >
         +{{ files.length - 2 }} File(s)
       </span>
     </template>
<<<<<<< HEAD
   </v-file-input>
=======
    </v-file-input>
>>>>>>> eacf2da71fd7ae8340b48d4dac8ee121a816fd94
      <v-btn
        bottom
        color="blue"
        dark
        fab
        fixed
        right
        @click="dialog = !dialog"
      >
        <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      width="800px"
    >
      <v-card>
        <v-card-title class="grey darken-2">
          Create Folder
        </v-card-title>
        <v-container>
          <div>
            <v-icon>mdi-folder</v-icon>
<<<<<<< HEAD
            <v-text-field placeholder="name" id="foldername" type="text" v-model="foldername"></v-text-field>
=======
            <v-text-field placeholder="name" id="foldername" type="text" v-model="foldername" ></v-text-field>
>>>>>>> eacf2da71fd7ae8340b48d4dac8ee121a816fd94
          </div>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="dialog = false"
          >Cancel</v-btn>
          <v-btn
            text
            @click="makeF"
          >Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
<<<<<<< HEAD
import { folder, makeFolder } from '../api/index';
  export default {
    data() {
      return {  
        foldername:'',
        folders: [],
        files: [],
        search:'',
        id: '',
        dialog:false
=======
import { dropbox, makeFolder } from '../api/index';
  export default {
    data() {
      return {
        foldername: '',
        folders: [],
        files: [],
        search:'',
        id: '',
        dialog: false,
>>>>>>> eacf2da71fd7ae8340b48d4dac8ee121a816fd94
      }
    },
    async created(){
        try {
<<<<<<< HEAD
          const curData = {
            id : this.$store.state.id,
            cur: this.$store.state.cur
          }
          const response = await folder(curData);
          console.log(response);
          this.$store.commit('setFolder', response.data.folders);
=======
          const userData = this.$store.state.id;
          console.log(this.id);
          
          const response = await dropbox(userData);
          console.log(response);
          this.$store.commit('setFolder', response.data.folders);
          this.$store.commit('setFile', response.data.files);
>>>>>>> eacf2da71fd7ae8340b48d4dac8ee121a816fd94
        } catch (error) {
          console.log("에러");
          console.log(error.response.data);
        }
      },
<<<<<<< HEAD
       methods: {
         initFolderName(){
           this.foldername = '';
         },
         async makeF(){
           try {
             const folderData = {
               user_id : this.$store.state.id,
               cur : this.$store.state.cur,
               folder_name : this.foldername
             };
             const response = await makeFolder(folderData); 
             console.log(response.data)
             console.log("폴더 생성 완료");
             this.$store.commit('setFolder', response.data.folders);
           } catch (error) {
             console.log("에러");
             console.log(error.response.data);
           } finally{
             this.initFolderName();
             this.dialog = false;
           }
         }

  }
=======
      methods: {
        initFolderName(){
          this.foldername = '';
        },
        async makeF(){
          try {
            const folderData = {
              user_id : this.$store.state.id,
              cur : this.$store.state.id,
              folder_name : this.foldername
            };
            const response = await makeFolder(folderData);
            this.$store.commit('setFolder', response.data.folders);
            console.log("폴더 생성 완료");
          } catch (error) {
            console.log("에러");
            console.log(error.response.data);
          } finally{
            this.initFolderName();
            this.dialog = false;
          }
        }
      }
>>>>>>> eacf2da71fd7ae8340b48d4dac8ee121a816fd94
  }
</script>
