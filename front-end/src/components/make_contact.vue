<template>
  <v-container fluid>
    <v-card-title>
    연락처
    <v-spacer></v-spacer>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="연락처 검색"
      single-line
      hide-details
    ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="10"
      class="elevation-1"
    ></v-data-table>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Phone', value: 'Phone' },
          { text: 'E-mail', value: 'Email' },
          { text: 'Added date', value: 'date' }
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            Phone: '010-1111-1111',
            Email: 'asdf@asdf.com',
            date: '2020-05-18'
          },
          {
            name: 'Ice cream sandwich',
            Phone: '010-1111-1111',
            Email: 'asdf@asdf.com',
            date: '2020-05-18'
          },
          {
            name: 'Eclair',
            Phone: '010-1111-1111',
            Email: 'asdf@asdf.com',
            date: '2020-05-18'
          },
          {
            name: 'Cupcake',
            Phone: '010-1111-1111',
            Email: 'asdf@asdf.com',
            date: '2020-05-18'
          },
          {
            name: 'Gingerbread',
            Phone: '010-1111-1111',
            Email: 'asdf@asdf.com',
            date: '2020-05-18'
          },
          {
            name: 'Jelly bean',
            Phone: '010-1111-1111',
            Email: 'asdf@asdf.com',
            date: '2020-05-18'
          },
          {
            name: 'Lollipop',
            Phone: '010-1111-1111',
            Email: 'asdf@asdf.com',
            date: '2020-05-18'
          },
          {
            name: 'Honeycomb',
            Phone: '010-1111-1111',
            Email: 'asdf@asdf.com',
            date: '2020-05-18'
          },
          {
            name: 'Donut',
            Phone: '010-1111-1111',
            Email: 'asdf@asdf.com',
            date: '2020-05-18'
          },
          {
            name: 'KitKat',
            Phone: '010-1111-1111',
            Email: 'asdf@asdf.com',
            date: '2020-05-18'
          },
        ],
      }
    },
  }
</script>
