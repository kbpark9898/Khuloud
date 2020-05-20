<template lang="html">
    <v-container>
      <div>
        <h2>안녕하세요!</h2>
        <br><br>
      </div>
      <v-layout column>
        <v-flex>
          <v-layout row wrap>
            <v-flex lg6>
              <v-flex>
                <Filecard></Filecard>
              </v-flex>
              <v-flex><br><br></v-flex>
            </v-flex>
            <v-flex><br><br></v-flex>
            <v-flex lg6>
              <Favlist></Favlist>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout column>
        <v-flex>
          <v-toolbar flat>
            <v-toolbar-title>빠른 액세스</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in favorite" :key="item.name">
                  <td>{{ item.name }}</td>
                  <td>{{ item.date }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-divider></v-divider>
        </v-flex>
      </v-layout>
    </v-container>
</template>



<script>
  import FileList from '@/components/FileList'
  import Favlist from '@/components/Fav_list'
  import Filecard from '@/components/FileCardlist.vue'
  export default {
    components:{
      FileList,
      Favlist,
      Filecard
    },
    data () {
      return {
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
            format : 'dir'
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
            format: 'pdf'
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
            format: 'file'
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
            format : 'dir'
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
            format : 'pdf'
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
            format:'file'
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
            format:'dir'
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
            foramt:'file'
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
            foramt:'pdf'
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
            foramt:'dir'
          },
        ],
        favorite:[
          {
            name: 'KitKat',
            date: '20.05.17'
          },
          {
            name: 'Vuetify',
            date: '20.05.17'
          }
        ],
      }
    },
  }
</script>
