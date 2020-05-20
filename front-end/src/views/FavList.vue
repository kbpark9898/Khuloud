<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>즐겨찾기</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="즐겨찾기 검색"
        single-line
        hide-details
      ></v-text-field>
    </v-toolbar>

    <v-list two-line subheader>


      <v-list-item
        v-for="item in items"
        :key="item.title"
        @click=""
      >
        <v-list-item-avatar>
          <v-icon

          >{{item.iconClass}}</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>


      <v-list-item
        v-for="item in items2"
        :key="item.title"
        @click=""
      >
        <v-list-item-avatar>
          <v-icon> {{item.iconClass}}</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
  export default {
    data: () => ({
      items: [
        { icon: 'folder', iconClass: 'mdi-folder', title: 'Photos', subtitle: 'Jan 9, 2014' },
        { icon: 'folder', iconClass: 'mdi-folder', title: 'Recipes', subtitle: 'Jan 17, 2014' },
        { icon: 'folder', iconClass: 'mdi-folder', title: 'Work', subtitle: 'Jan 28, 2014' },
      ],
      items2: [
        { icon: 'assignment', iconClass: 'mdi-file', title: 'Vacation itinerary', subtitle: 'Jan 20, 2014' },
        { icon: 'call_to_action', iconClass: 'mdi-PdfBox', title: 'Kitchen remodel', subtitle: 'Jan 10, 2014' },
      ],
    }),
  }
</script>
