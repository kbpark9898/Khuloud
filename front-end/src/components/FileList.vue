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
      <v-btn @click="moveParent">...</v-btn>
      <v-list-item
        v-for="item in this.$store.getters.folderL"
        :key="item.title"
      >
        <v-list-item-avatar @click="moveF(item.folder_name)">
          <v-icon>mdi-folder</v-icon>
        </v-list-item-avatar>
        <v-list-item-content @click="moveF(item.folder_name)">
          <v-list-item-title v-text="item.folder_name"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
          <v-btn icon @click="deleteF(item.folder_name)">
            <v-icon color="grey lighten-1">mdi-delete</v-icon>
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
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-delted</v-icon>
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
   </v-file-input>
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
            <v-text-field placeholder="name" id="foldername" type="text" v-model="foldername"></v-text-field>
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
import { folder, makeFolder, deleteFolder } from '../api/index';
import Axios from 'axios';
  export default {
    data() {
      return {
        foldername:'',
        folders: [],
        files: [],
        search:'',
        id: '',
        dialog:false
      }
    },
    async created(){
        try {
          const curData = {
            id : this.$store.state.id,
            cur: '/'
          }
          const response = await folder(curData);
          console.log(response.data);
          this.$store.commit('setFolder', response.data.folders);
          this.$store.commit('setCur', response.data.cur);
          this.$store.commit('setParent', response.data.parentPath);
        } catch (error) {
          console.log("에러");
          console.log(error.response.data);
        }
      },
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
         },
         async moveF(move_folder_name){
           try {
          const curData = {
            id : this.$store.state.id,
            cur: this.$store.state.cur + move_folder_name + '/'
            }
          const response = await folder(curData);
          console.log(response.data);
          this.$store.commit('setFolder', response.data.folders);
          this.$store.commit('setCur', response.data.cur);
          this.$store.commit('setParent', response.data.parentPath);
          } catch (error) {
          console.log("에러");
          console.log(error.response.data);
          }
        },
        async moveParent(){
          try {
            const cData = {
              id : this.$store.state.id,
              cur : this.$store.state.parent
            };
            const response= await folder(cData);
            console.log(response.data);
            this.$store.commit('setFolder', response.data.folders);
            this.$store.commit('setCur', response.data.cur);
            this.$store.commit('setParent', response.data.parentPath);
          } catch (error) {
            console.log("에러");
            console.log(error.response.data);
          }
        },
        async deleteF(folderName){
          try {
            const cData = {
              id: this.$store.state.id,
              cur : this.$store.state.cur,
              folder_name: folderName
            }
            const reponse = await deleteFolder(cData);
            console.log(response.data);
            this.$store.commit('setFolder', response.data.folders);
            this.$store.commit('setCur', response.data.cur);
          } catch (error) {
            console.log("에러");
            console.log(error.response.data);
          }
        }
    }
  }
</script>