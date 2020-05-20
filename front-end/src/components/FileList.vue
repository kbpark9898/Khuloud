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

      <v-divider inset></v-divider>

      <v-subheader inset>Files</v-subheader>

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
