<template lang="html">
  <v-flex>
    <v-toolbar flat>
      <v-toolbar-title>연락처</v-toolbar-title>
    </v-toolbar>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
<!--
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Phone</th>
            <th class="text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in contact_list" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.phone}}</td>
            <td>{{ item.email }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
-->
    <v-data-table
      :headers="headers"
      :items="contact_list"
      :search="search"
    >
    </v-data-table>
    <v-divider></v-divider>
    <div v-cloak @drop.prevnet="addContact" @dragover.prevent>
      <input
        id="file-selector"
        ref="uploadedfile"
        type="file"
        v-on:change="handleFileUpload()"
      />
    </div>
    <br />
    <v-btn color="blue" @click="upload_contact">upload</v-btn>
    <v-btn color="green" @click = "download_contact">download</v-btn>
    <v-btn color="gray" @click = "delete_contact">delete</v-btn>
  </v-flex>
</template>

<script>
  import { uploadContact, downloadContact, printContact, deleteContact } from '../api/index';
  import Axios from 'axios';
  export default {
    data() {
      return {
        search:'',
        headers:[
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name'
          },
          {text: 'phone', value:'email'},
          {text:'email', value:'phone'}
        ],
        contact_list : [],
        contact_file : null
      }
    },
    async created(){
        try {
          const curData = {
            id : this.$store.state.id,
          }
          const list_reponse = await printContact(curData.id);
          this.$store.commit('setContactList', list_reponse.data.contact_list);
          this.contact_list = this.$store.getters.contact;
          console.log(list_reponse);
        } catch (error) {
          console.log("에러");
          console.log(error);
        }
    },
    methods:{
      handleFileUpload() {
        this.contact_file = this.$refs.uploadedfile.files[0];
        console.log(this.contact_file);
      },
      addContact(event){
        let droppedFiles = event.dataTransfer.files;
        if(!droppedFiles) return;
        console.log(droppedFiles);
      },
      async upload_contact(){
        try {
          const formData = new FormData();
          formData.append('file', this.contact_file);
          const currentData = {
            id: this.$store.state.id
          };
          const fileData = {
            id: this.$store.state.id,
            file: formData
          }
          console.log(fileData);
          const response = await uploadContact(fileData);
          const contact_response = await printContact(currentData.id);
          console.log(contact_response);
          this.$store.commit('setContactList', contact_response.data.contact_list);
          console.log(this.$store.getters.contact);
          this.contact_list = this.$store.getters.contact;
        } catch (error) {
          console.log('에러');
          console.log(error);
        }
      },
      async download_contact(){
        try{
          const curData= {
            id: this.$store.state.id
          };
          console.log(curData);
          const response = await downloadContact(curData.id);
          console.log(response);
        }catch(error){
          console.log('에러');
          console.log(error);
        }
      },
      async delete_contact(){
        try{
          const curData = {
            id: this.$store.state.id
          };
          const response_d = await deleteContact(curData.id);

          const contact_response = await printContact(curData.id);

          this.$store.commit('setContactList', contact_response.data.contact_list);

          this.contact_list = this.$store.getters.contact;
        }catch(error){
          console.log('에러');
          console.log(error);
        }
      }

    }
  }
</script>

<style lang="css" scoped>
</style>
