<template lang="html">
  <v-flex>
    <h1>빠른액세스</h1>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in recent_list" :key="item.name">
            <td>{{ item.file_id }}</td>
            <td>{{ item.file_name}}</td>
            <td>{{ item.location }}</td>
            <td>{{ item.date }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-divider></v-divider>
  </v-flex>
</template>

<script>
  import { accessed_list } from '../api/index';
  import Axios from 'axios';
  export default {
    data() {
      return {
        recent_list = []
      }
    },
    async created(){
        try {
          const curData = {
            id : this.$store.state.id,
          }
          console.log(curData);
          const list_reponse = await accessed_list(curData);
          this.$store.commit('setRecentList', list_reponse.data)
          this.recent_list = this.$stroe.getters.recentL;
          console.log(this.$store.getters.recentL);
        } catch (error) {
          console.log("에러");
          console.log(error);
        }
    },
    methods:{

    }
  }
</script>

<style lang="css" scoped>
</style>
