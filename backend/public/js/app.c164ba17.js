(function(t){function e(e){for(var i,r,l=e[0],s=e[1],c=e[2],v=0,d=[];v<l.length;v++)r=l[v],Object.prototype.hasOwnProperty.call(n,r)&&n[r]&&d.push(n[r][0]),n[r]=0;for(i in s)Object.prototype.hasOwnProperty.call(s,i)&&(t[i]=s[i]);m&&m(e);while(d.length)d.shift()();return o.push.apply(o,c||[]),a()}function a(){for(var t,e=0;e<o.length;e++){for(var a=o[e],i=!0,l=1;l<a.length;l++){var s=a[l];0!==n[s]&&(i=!1)}i&&(o.splice(e--,1),t=r(r.s=a[0]))}return t}var i={},n={app:0},o=[];function r(e){if(i[e])return i[e].exports;var a=i[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=t,r.c=i,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(a,i,function(e){return t[e]}.bind(null,i));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],s=l.push.bind(l);l.push=e,l=l.slice();for(var c=0;c<l.length;c++)e(l[c]);var m=s;o.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var i=a("2b0e"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tool-view")},o=[],r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",{attrs:{id:"inspire"}},[a("v-navigation-drawer",{attrs:{clipped:t.$vuetify.breakpoint.lgAndUp,app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[a("v-list",{attrs:{dense:""}},[a("v-list-item",{attrs:{router:"",to:{name:"Main"},exact:""}},[a("v-list-item-action",[a("v-icon",[t._v("mdi-home")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("홈")])],1)],1),a("v-list-item",{attrs:{router:"",to:{name:"File"},exact:""}},[a("v-list-item-action",[a("v-icon",[t._v("mdi-file")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("파일")])],1)],1),a("v-list-item",{attrs:{router:"",to:{name:"Fav"},exact:""}},[a("v-list-item-action",[a("v-icon",[t._v("mdi-heart")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("즐겨찾기")])],1)],1),a("v-list-item",{attrs:{router:"",to:{name:"Quick"},exact:""}},[a("v-list-item-action",[a("v-icon",[t._v("mdi-history")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("빠른 액세스")])],1)],1),a("v-list-item",{attrs:{router:"",to:{name:"Contact"},exact:""}},[a("v-list-item-action",[a("v-icon",[t._v("mdi-contacts")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("연락처")])],1)],1),a("v-list-item",{attrs:{router:"",to:{name:"Main"},exact:""}},[a("v-list-item-action",[a("v-icon",[t._v("mdi-settings")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("설정")])],1)],1),a("v-list-item",[a("v-list-item-action",[a("v-icon",[t._v("mdi-delete")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("휴지통")])],1)],1),a("v-list-item",{attrs:{router:"",to:{name:"Feedback"},exact:""}},[a("v-list-item-action",[a("v-icon",[t._v("mdi-message")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("피드백")])],1)],1),a("v-list-item",{attrs:{router:"",to:{name:"Main"},exact:""}},[a("v-list-item-action",[a("v-icon",[t._v("mdi-help-circle")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("도움말")])],1)],1)],1)],1),a("v-app-bar",{attrs:{"clipped-left":t.$vuetify.breakpoint.lgAndUp,app:"",color:"blue darken-3",dark:""}},[a("v-app-bar-nav-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),a("v-toolbar-title",{staticClass:"ml-0 pl-4",staticStyle:{width:"300px"}},[a("span",{staticClass:"hidden-sm-and-down"},[t._v("KhuLoud")])]),a("v-text-field",{staticClass:"hidden-sm-and-down",attrs:{flat:"","solo-inverted":"","hide-details":"","prepend-inner-icon":"mdi-magnify",label:"전체 검색"}}),a("v-spacer"),a("v-btn",{attrs:{icon:""},on:{click:function(e){return t.$router.push({name:"Login"})}}},[a("v-icon",[t._v("mdi-login")])],1),a("v-btn",{attrs:{icon:""}},[a("v-icon",[t._v("mdi-bell")])],1)],1),a("v-content",[a("v-container",[a("router-view")],1)],1),a("v-btn",{attrs:{bottom:"",color:"pink",dark:"",fab:"",fixed:"",right:""},on:{click:function(e){t.dialog=!t.dialog}}},[a("v-icon",[t._v("mdi-plus")])],1),a("v-dialog",{attrs:{width:"800px"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",{staticClass:"grey darken-2"},[t._v(" Create contact ")]),a("v-container",[a("v-row",{staticClass:"mx-2"},[a("v-col",{staticClass:"align-center justify-space-between",attrs:{cols:"12"}},[a("v-row",{staticClass:"mr-0",attrs:{align:"center"}},[a("v-avatar",{staticClass:"mx-3",attrs:{size:"40px"}},[a("img",{attrs:{src:"//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png",alt:""}})]),a("v-text-field",{attrs:{placeholder:"Name"}})],1)],1),a("v-col",{attrs:{cols:"6"}},[a("v-text-field",{attrs:{"prepend-icon":"mdi-account-card-details-outline",placeholder:"Company"}})],1),a("v-col",{attrs:{cols:"6"}},[a("v-text-field",{attrs:{placeholder:"Job title"}})],1),a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{"prepend-icon":"mdi-mail",placeholder:"Email"}})],1),a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{type:"tel","prepend-icon":"mdi-phone",placeholder:"(000) 000 - 0000"}})],1),a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{"prepend-icon":"mdi-text",placeholder:"Notes"}})],1)],1)],1),a("v-card-actions",[a("v-btn",{attrs:{text:"",color:"primary"}},[t._v("More")]),a("v-spacer"),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){t.dialog=!1}}},[t._v("Cancel")]),a("v-btn",{attrs:{text:""},on:{click:function(e){t.dialog=!1}}},[t._v("Save")])],1)],1)],1)],1)},l=[],s={props:{source:String},data:function(){return{dialog:!1,drawer:null,items:[{icon:"mdi-home",text:"홈"},{icon:"mdi-file",text:"파일"},{icon:"mdi-heart",text:"즐겨찾기"},{icon:"mdi-history",text:"빠른 액세스"},{icon:"mdi-contacts",text:"연락처"},{icon:"mdi-settings",text:"설정"},{icon:"mdi-message",text:"피드백"},{icon:"mdi-help-circle",text:"도움말"}]}}},c=s,m=a("2877"),v=a("6544"),d=a.n(v),u=a("7496"),f=a("40dc"),p=a("5bc1"),b=a("8212"),_=a("8336"),x=a("b0af"),h=a("99d9"),V=a("62ad"),g=a("a523"),C=a("a75b"),y=a("169a"),k=a("132d"),w=a("8860"),P=a("da13"),T=a("1800"),I=a("5d23"),L=a("f774"),S=a("0fd9"),F=a("2fa4"),E=a("8654"),J=a("2a7f"),j=Object(m["a"])(c,r,l,!1,null,null,null),O=j.exports;d()(j,{VApp:u["a"],VAppBar:f["a"],VAppBarNavIcon:p["a"],VAvatar:b["a"],VBtn:_["a"],VCard:x["a"],VCardActions:h["a"],VCardTitle:h["c"],VCol:V["a"],VContainer:g["a"],VContent:C["a"],VDialog:y["a"],VIcon:k["a"],VList:w["a"],VListItem:P["a"],VListItemAction:T["a"],VListItemContent:I["a"],VListItemTitle:I["c"],VNavigationDrawer:L["a"],VRow:S["a"],VSpacer:F["a"],VTextField:E["a"],VToolbarTitle:J["a"]});var A={data:function(){return{}},components:{ToolView:O}},K=A,$=Object(m["a"])(K,n,o,!1,null,null,null),D=$.exports,B=a("8c4f"),R=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("div",[a("h2",[t._v("안녕하세요!")]),a("br"),a("br")]),a("v-layout",{attrs:{column:""}},[a("v-flex",[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{xs6:""}},[a("v-flex",[a("h1",[t._v("파일")]),a("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.desserts,"expand-icon":t.home,"items-per-page":5}}),a("v-spacer")],1),a("v-flex",[a("br"),a("v-divider"),a("br")],1),a("v-flex",[a("h1",[t._v("빠른액세스")]),a("v-simple-table",{scopedSlots:t._u([{key:"default",fn:function(){return[a("thead",[a("tr",[a("th",{staticClass:"text-left"},[t._v("Name")]),a("th",{staticClass:"text-left"},[t._v("Date")])])]),a("tbody",t._l(t.favorite,(function(e){return a("tr",{key:e.name},[a("td",[t._v(t._s(e.name))]),a("td",[t._v(t._s(e.date))])])})),0)]},proxy:!0}])}),a("v-divider")],1)],1),a("v-flex",[a("br"),a("v-divider"),a("br")],1),a("v-flex",{attrs:{xs6:""}},[a("h1",[t._v("즐겨찾기")]),a("v-simple-table",{scopedSlots:t._u([{key:"default",fn:function(){return[a("thead",[a("tr",[a("th",{staticClass:"text-left"},[t._v("Name")]),a("th",{staticClass:"text-left"},[t._v("Date")])])]),a("tbody",t._l(t.favorite,(function(e){return a("tr",{key:e.name},[a("td",[t._v(t._s(e.name))]),a("td",[t._v(t._s(e.date))])])})),0)]},proxy:!0}])}),a("v-divider")],1)],1)],1)],1)],1)},N=[],M={data:function(){return{headers:[{text:"Dessert (100g serving)",align:"start",sortable:!1,value:"name"},{text:"Calories",value:"calories"},{text:"Fat (g)",value:"fat"},{text:"Carbs (g)",value:"carbs"},{text:"Protein (g)",value:"protein"},{text:"Iron (%)",value:"iron"}],desserts:[{name:"Frozen Yogurt",calories:159,fat:6,carbs:24,protein:4,iron:"1%",format:"dir"},{name:"Ice cream sandwich",calories:237,fat:9,carbs:37,protein:4.3,iron:"1%",format:"pdf"},{name:"Eclair",calories:262,fat:16,carbs:23,protein:6,iron:"7%",format:"file"},{name:"Cupcake",calories:305,fat:3.7,carbs:67,protein:4.3,iron:"8%",format:"dir"},{name:"Gingerbread",calories:356,fat:16,carbs:49,protein:3.9,iron:"16%",format:"pdf"},{name:"Jelly bean",calories:375,fat:0,carbs:94,protein:0,iron:"0%",format:"file"},{name:"Lollipop",calories:392,fat:.2,carbs:98,protein:0,iron:"2%",format:"dir"},{name:"Honeycomb",calories:408,fat:3.2,carbs:87,protein:6.5,iron:"45%",foramt:"file"},{name:"Donut",calories:452,fat:25,carbs:51,protein:4.9,iron:"22%",foramt:"pdf"},{name:"KitKat",calories:518,fat:26,carbs:65,protein:7,iron:"6%",foramt:"dir"}],favorite:[{name:"KitKat",date:"20.05.17"},{name:"Vuetify",date:"20.05.17"}]}}},z=M,U=a("8fea"),H=a("ce7e"),W=a("0e8f"),G=a("a722"),Y=a("1f4f"),Q=Object(m["a"])(z,R,N,!1,null,null,null),q=Q.exports;d()(Q,{VContainer:g["a"],VDataTable:U["a"],VDivider:H["a"],VFlex:W["a"],VLayout:G["a"],VSimpleTable:Y["a"],VSpacer:F["a"]});var X=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",{attrs:{id:"inspire"}},[a("v-content",[a("v-container",{staticClass:"fill-height",attrs:{fluid:""}},[a("v-row",{attrs:{align:"center",justify:"center"}},[a("v-col",{attrs:{cols:"12",sm:"8",md:"4"}},[a("v-card",{staticClass:"elevation-12"},[a("v-toolbar",{attrs:{color:"primary",dark:"",flat:""}},[a("v-toolbar-title",[t._v("KhuLoud")]),a("v-spacer"),a("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.on;return[a("v-btn",t._g({attrs:{href:t.source,icon:"",large:"",target:"_blank"}},i),[a("v-icon",[t._v("mdi-code-tags")])],1)]}}])},[a("span",[t._v("Source")])])],1),a("v-card-text",[a("v-form",[a("v-text-field",{attrs:{label:"Login",name:"login",type:"text"}}),a("v-text-field",{attrs:{id:"password",label:"Password",name:"password",type:"password"}})],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"primary"},on:{click:function(e){return t.$router.push({name:"RegistUser"})}}},[t._v("Regist")]),a("v-btn",{attrs:{color:"primary",router:"",to:{name:"Main"},exact:""}},[t._v("Login")])],1)],1)],1)],1)],1)],1)],1)},Z=[],tt={props:{source:String}},et=tt,at=a("4bd4"),it=a("71d9"),nt=a("3a2f"),ot=Object(m["a"])(et,X,Z,!1,null,null,null),rt=ot.exports;d()(ot,{VApp:u["a"],VBtn:_["a"],VCard:x["a"],VCardActions:h["a"],VCardText:h["b"],VCol:V["a"],VContainer:g["a"],VContent:C["a"],VForm:at["a"],VIcon:k["a"],VRow:S["a"],VSpacer:F["a"],VTextField:E["a"],VToolbar:it["a"],VToolbarTitle:J["a"],VTooltip:nt["a"]});var lt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("div",[a("h2",[t._v("안녕하세요!")]),a("br"),a("br")]),a("v-layout",{attrs:{column:""}},[a("v-flex",[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{lg6:""}},[a("v-flex",[a("Filecard")],1),a("v-flex",[a("br"),a("br")])],1),a("v-flex",[a("br"),a("br")]),a("v-flex",{attrs:{lg6:""}},[a("Favlist")],1)],1)],1)],1),a("v-divider"),a("v-layout",{attrs:{column:""}},[a("v-flex",[a("v-toolbar",{attrs:{flat:""}},[a("v-toolbar-title",[t._v("빠른 액세스")]),a("v-spacer")],1),a("v-simple-table",{scopedSlots:t._u([{key:"default",fn:function(){return[a("thead",[a("tr",[a("th",{staticClass:"text-left"},[t._v("Name")]),a("th",{staticClass:"text-left"},[t._v("Date")])])]),a("tbody",t._l(t.favorite,(function(e){return a("tr",{key:e.name},[a("td",[t._v(t._s(e.name))]),a("td",[t._v(t._s(e.date))])])})),0)]},proxy:!0}])}),a("v-divider")],1)],1)],1)},st=[],ct=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-toolbar",{attrs:{flat:""}},[a("v-toolbar-title",[t._v("파일 ")]),a("v-spacer"),a("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"파일 검색","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),a("v-list",{attrs:{"two-line":"",subheader:""}},[a("v-subheader",{attrs:{inset:""}},[t._v("Folders")]),t._l(t.items,(function(e){return a("v-list-item",{key:e.title,on:{click:function(t){}}},[a("v-list-item-avatar",[a("v-icon",[t._v(t._s(e.iconClass))])],1),a("v-list-item-content",[a("v-list-item-title",{domProps:{textContent:t._s(e.title)}}),a("v-list-item-subtitle",{domProps:{textContent:t._s(e.subtitle)}})],1),a("v-list-item-action",[a("v-btn",{attrs:{icon:""}},[a("v-icon",{attrs:{color:"grey lighten-1"}},[t._v("mdi-information")])],1)],1)],1)})),a("v-divider",{attrs:{inset:""}}),a("v-subheader",{attrs:{inset:""}},[t._v("Files")]),t._l(t.items2,(function(e){return a("v-list-item",{key:e.title,on:{click:function(t){}}},[a("v-list-item-avatar",[a("v-icon",[t._v(" "+t._s(e.iconClass))])],1),a("v-list-item-content",[a("v-list-item-title",{domProps:{textContent:t._s(e.title)}}),a("v-list-item-subtitle",{domProps:{textContent:t._s(e.subtitle)}})],1),a("v-list-item-action",[a("v-btn",{attrs:{icon:""}},[a("v-icon",{attrs:{color:"grey lighten-1"}},[t._v("mdi-information")])],1)],1)],1)}))],2),a("v-file-input",{attrs:{color:"deep-purple accent-4",counter:"",label:"업로드",multiple:"",placeholder:"파일을 화면으로 드래그앤 드롭 하거나, 이곳을 클릭하세요.","prepend-icon":"mdi-paperclip",outlined:"","show-size":1e3},scopedSlots:t._u([{key:"selection",fn:function(e){var i=e.index,n=e.text;return[i<2?a("v-chip",{attrs:{color:"deep-purple accent-4",dark:"",label:"",small:""}},[t._v(" "+t._s(n)+" ")]):2===i?a("span",{staticClass:"overline grey--text text--darken-3 mx-2"},[t._v(" +"+t._s(t.files.length-2)+" File(s) ")]):t._e()]}}]),model:{value:t.files,callback:function(e){t.files=e},expression:"files"}})],1)},mt=[],vt={data:function(){return{items:[{icon:"folder",iconClass:"mdi-folder",title:"Photos",subtitle:"Jan 9, 2014"},{icon:"folder",iconClass:"mdi-folder",title:"Recipes",subtitle:"Jan 17, 2014"},{icon:"folder",iconClass:"mdi-folder",title:"Work",subtitle:"Jan 28, 2014"}],items2:[{icon:"assignment",iconClass:"mdi-file",title:"Vacation itinerary",subtitle:"Jan 20, 2014"},{icon:"call_to_action",iconClass:"mdi-PdfBox",title:"Kitchen remodel",subtitle:"Jan 10, 2014"}]}}},dt=vt,ut=a("cc20"),ft=a("23a7"),pt=a("8270"),bt=a("e0c7"),_t=Object(m["a"])(dt,ct,mt,!1,null,null,null),xt=_t.exports;d()(_t,{VBtn:_["a"],VChip:ut["a"],VDivider:H["a"],VFileInput:ft["a"],VIcon:k["a"],VList:w["a"],VListItem:P["a"],VListItemAction:T["a"],VListItemAvatar:pt["a"],VListItemContent:I["a"],VListItemSubtitle:I["b"],VListItemTitle:I["c"],VSpacer:F["a"],VSubheader:bt["a"],VTextField:E["a"],VToolbar:it["a"],VToolbarTitle:J["a"]});var ht=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"mx-auto",attrs:{"max-width":"98%"}},[a("v-toolbar",{attrs:{color:"light-blue",dark:""}},[a("v-toolbar-title",[t._v("즐겨찾기")]),a("v-spacer")],1),a("v-list",{attrs:{"two-line":"",subheader:""}},[t._l(t.items,(function(e){return a("v-list-item",{key:e.title,on:{click:function(t){}}},[a("v-list-item-avatar",[a("v-icon",{class:[e.iconClass],domProps:{textContent:t._s(e.icon)}})],1),a("v-list-item-content",[a("v-list-item-title",{domProps:{textContent:t._s(e.title)}}),a("v-list-item-subtitle",{domProps:{textContent:t._s(e.subtitle)}})],1),a("v-list-item-action",[a("v-btn",{attrs:{icon:""}},[a("v-icon",{attrs:{color:"grey lighten-1"}},[t._v("mdi-information")])],1)],1)],1)})),t._l(t.items2,(function(e){return a("v-list-item",{key:e.title,on:{click:function(t){}}},[a("v-list-item-avatar",[a("v-icon",{class:[e.iconClass],domProps:{textContent:t._s(e.icon)}})],1),a("v-list-item-content",[a("v-list-item-title",{domProps:{textContent:t._s(e.title)}}),a("v-list-item-subtitle",{domProps:{textContent:t._s(e.subtitle)}})],1),a("v-list-item-action",[a("v-btn",{attrs:{icon:""}},[a("v-icon",{attrs:{color:"grey lighten-1"}},[t._v("mdi-information")])],1)],1)],1)}))],2)],1)},Vt=[],gt={data:function(){return{items:[{icon:"folder",iconClass:"grey lighten-1 white--text",title:"Photos",subtitle:"Jan 9, 2014"},{icon:"folder",iconClass:"grey lighten-1 white--text",title:"Recipes",subtitle:"Jan 17, 2014"},{icon:"folder",iconClass:"grey lighten-1 white--text",title:"Work",subtitle:"Jan 28, 2014"}],items2:[{icon:"assignment",iconClass:"blue white--text",title:"Vacation itinerary",subtitle:"Jan 20, 2014"},{icon:"call_to_action",iconClass:"amber white--text",title:"Kitchen remodel",subtitle:"Jan 10, 2014"}]}}},Ct=gt,yt=Object(m["a"])(Ct,ht,Vt,!1,null,null,null),kt=yt.exports;d()(yt,{VBtn:_["a"],VCard:x["a"],VIcon:k["a"],VList:w["a"],VListItem:P["a"],VListItemAction:T["a"],VListItemAvatar:pt["a"],VListItemContent:I["a"],VListItemSubtitle:I["b"],VListItemTitle:I["c"],VSpacer:F["a"],VToolbar:it["a"],VToolbarTitle:J["a"]});var wt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"mx-auto",attrs:{"max-width":"98%"}},[a("v-toolbar",{attrs:{color:"light-blue",dark:""}},[a("v-toolbar-title",[t._v("파일")]),a("v-spacer")],1),a("v-list",{attrs:{"two-line":"",subheader:""}},[t._l(t.items,(function(e){return a("v-list-item",{key:e.title,on:{click:function(t){}}},[a("v-list-item-avatar",[a("v-icon",{class:[e.iconClass],domProps:{textContent:t._s(e.icon)}})],1),a("v-list-item-content",[a("v-list-item-title",{domProps:{textContent:t._s(e.title)}}),a("v-list-item-subtitle",{domProps:{textContent:t._s(e.subtitle)}})],1),a("v-list-item-action",[a("v-btn",{attrs:{icon:""}},[a("v-icon",{attrs:{color:"grey lighten-1"}},[t._v("mdi-information")])],1)],1)],1)})),t._l(t.items2,(function(e){return a("v-list-item",{key:e.title,on:{click:function(t){}}},[a("v-list-item-avatar",[a("v-icon",{class:[e.iconClass],domProps:{textContent:t._s(e.icon)}})],1),a("v-list-item-content",[a("v-list-item-title",{domProps:{textContent:t._s(e.title)}}),a("v-list-item-subtitle",{domProps:{textContent:t._s(e.subtitle)}})],1),a("v-list-item-action",[a("v-btn",{attrs:{icon:""}},[a("v-icon",{attrs:{color:"grey lighten-1"}},[t._v("mdi-information")])],1)],1)],1)}))],2)],1)},Pt=[],Tt={data:function(){return{items:[{icon:"folder",iconClass:"grey lighten-1 white--text",title:"Photos",subtitle:"Jan 9, 2014"},{icon:"folder",iconClass:"grey lighten-1 white--text",title:"Recipes",subtitle:"Jan 17, 2014"},{icon:"folder",iconClass:"grey lighten-1 white--text",title:"Work",subtitle:"Jan 28, 2014"}],items2:[{icon:"assignment",iconClass:"blue white--text",title:"Vacation itinerary",subtitle:"Jan 20, 2014"},{icon:"call_to_action",iconClass:"amber white--text",title:"Kitchen remodel",subtitle:"Jan 10, 2014"}]}}},It=Tt,Lt=Object(m["a"])(It,wt,Pt,!1,null,null,null),St=Lt.exports;d()(Lt,{VBtn:_["a"],VCard:x["a"],VIcon:k["a"],VList:w["a"],VListItem:P["a"],VListItemAction:T["a"],VListItemAvatar:pt["a"],VListItemContent:I["a"],VListItemSubtitle:I["b"],VListItemTitle:I["c"],VSpacer:F["a"],VToolbar:it["a"],VToolbarTitle:J["a"]});var Ft={components:{FileList:xt,Favlist:kt,Filecard:St},data:function(){return{headers:[{text:"Dessert (100g serving)",align:"start",sortable:!1,value:"name"},{text:"Calories",value:"calories"},{text:"Fat (g)",value:"fat"},{text:"Carbs (g)",value:"carbs"},{text:"Protein (g)",value:"protein"},{text:"Iron (%)",value:"iron"}],desserts:[{name:"Frozen Yogurt",calories:159,fat:6,carbs:24,protein:4,iron:"1%",format:"dir"},{name:"Ice cream sandwich",calories:237,fat:9,carbs:37,protein:4.3,iron:"1%",format:"pdf"},{name:"Eclair",calories:262,fat:16,carbs:23,protein:6,iron:"7%",format:"file"},{name:"Cupcake",calories:305,fat:3.7,carbs:67,protein:4.3,iron:"8%",format:"dir"},{name:"Gingerbread",calories:356,fat:16,carbs:49,protein:3.9,iron:"16%",format:"pdf"},{name:"Jelly bean",calories:375,fat:0,carbs:94,protein:0,iron:"0%",format:"file"},{name:"Lollipop",calories:392,fat:.2,carbs:98,protein:0,iron:"2%",format:"dir"},{name:"Honeycomb",calories:408,fat:3.2,carbs:87,protein:6.5,iron:"45%",foramt:"file"},{name:"Donut",calories:452,fat:25,carbs:51,protein:4.9,iron:"22%",foramt:"pdf"},{name:"KitKat",calories:518,fat:26,carbs:65,protein:7,iron:"6%",foramt:"dir"}],favorite:[{name:"KitKat",date:"20.05.17"},{name:"Vuetify",date:"20.05.17"}]}}},Et=Ft,Jt=Object(m["a"])(Et,lt,st,!1,null,null,null),jt=Jt.exports;d()(Jt,{VContainer:g["a"],VDivider:H["a"],VFlex:W["a"],VLayout:G["a"],VSimpleTable:Y["a"],VSpacer:F["a"],VToolbar:it["a"],VToolbarTitle:J["a"]});var Ot=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("contact")},At=[],Kt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{fluid:""}},[a("v-card-title",[t._v(" 연락처 "),a("v-spacer"),a("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"연락처 검색","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),a("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.desserts,"items-per-page":10}})],1)},$t=[],Dt={data:function(){return{headers:[{text:"Name",align:"start",sortable:!1,value:"name"},{text:"Phone",value:"Phone"},{text:"E-mail",value:"Email"},{text:"Added date",value:"date"}],desserts:[{name:"Frozen Yogurt",Phone:"010-1111-1111",Email:"asdf@asdf.com",date:"2020-05-18"},{name:"Ice cream sandwich",Phone:"010-1111-1111",Email:"asdf@asdf.com",date:"2020-05-18"},{name:"Eclair",Phone:"010-1111-1111",Email:"asdf@asdf.com",date:"2020-05-18"},{name:"Cupcake",Phone:"010-1111-1111",Email:"asdf@asdf.com",date:"2020-05-18"},{name:"Gingerbread",Phone:"010-1111-1111",Email:"asdf@asdf.com",date:"2020-05-18"},{name:"Jelly bean",Phone:"010-1111-1111",Email:"asdf@asdf.com",date:"2020-05-18"},{name:"Lollipop",Phone:"010-1111-1111",Email:"asdf@asdf.com",date:"2020-05-18"},{name:"Honeycomb",Phone:"010-1111-1111",Email:"asdf@asdf.com",date:"2020-05-18"},{name:"Donut",Phone:"010-1111-1111",Email:"asdf@asdf.com",date:"2020-05-18"},{name:"KitKat",Phone:"010-1111-1111",Email:"asdf@asdf.com",date:"2020-05-18"}]}}},Bt=Dt,Rt=Object(m["a"])(Bt,Kt,$t,!1,null,null,null),Nt=Rt.exports;d()(Rt,{VCardTitle:h["c"],VContainer:g["a"],VDataTable:U["a"],VSpacer:F["a"],VTextField:E["a"]});var Mt={components:{contact:Nt}},zt=Mt,Ut=Object(m["a"])(zt,Ot,At,!1,null,"74388183",null),Ht=Ut.exports,Wt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{fluid:""}},[a("FileList")],1)},Gt=[],Yt={components:{FileList:xt,Favlist:kt},data:function(){return{headers:[{text:"Dessert (100g serving)",align:"start",sortable:!1,value:"name"},{text:"Calories",value:"calories"},{text:"Fat (g)",value:"fat"},{text:"Carbs (g)",value:"carbs"},{text:"Protein (g)",value:"protein"},{text:"Iron (%)",value:"iron"}],desserts:[{name:"Frozen Yogurt",calories:159,fat:6,carbs:24,protein:4,iron:"1%",format:"dir"},{name:"Ice cream sandwich",calories:237,fat:9,carbs:37,protein:4.3,iron:"1%",format:"pdf"},{name:"Eclair",calories:262,fat:16,carbs:23,protein:6,iron:"7%",format:"file"},{name:"Cupcake",calories:305,fat:3.7,carbs:67,protein:4.3,iron:"8%",format:"dir"},{name:"Gingerbread",calories:356,fat:16,carbs:49,protein:3.9,iron:"16%",format:"pdf"},{name:"Jelly bean",calories:375,fat:0,carbs:94,protein:0,iron:"0%",format:"file"},{name:"Lollipop",calories:392,fat:.2,carbs:98,protein:0,iron:"2%",format:"dir"},{name:"Honeycomb",calories:408,fat:3.2,carbs:87,protein:6.5,iron:"45%",foramt:"file"},{name:"Donut",calories:452,fat:25,carbs:51,protein:4.9,iron:"22%",foramt:"pdf"},{name:"KitKat",calories:518,fat:26,carbs:65,protein:7,iron:"6%",foramt:"dir"}],favorite:[{name:"KitKat",date:"20.05.17"},{name:"Vuetify",date:"20.05.17"}]}}},Qt=Yt,qt=Object(m["a"])(Qt,Wt,Gt,!1,null,null,null),Xt=qt.exports;d()(qt,{VContainer:g["a"]});var Zt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-toolbar",{attrs:{flat:""}},[a("v-toolbar-title",[t._v("즐겨찾기")]),a("v-spacer"),a("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"즐겨찾기 검색","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),a("v-list",{attrs:{"two-line":"",subheader:""}},[t._l(t.items,(function(e){return a("v-list-item",{key:e.title,on:{click:function(t){}}},[a("v-list-item-avatar",[a("v-icon",[t._v(t._s(e.iconClass))])],1),a("v-list-item-content",[a("v-list-item-title",{domProps:{textContent:t._s(e.title)}}),a("v-list-item-subtitle",{domProps:{textContent:t._s(e.subtitle)}})],1),a("v-list-item-action",[a("v-btn",{attrs:{icon:""}},[a("v-icon",{attrs:{color:"grey lighten-1"}},[t._v("mdi-information")])],1)],1)],1)})),t._l(t.items2,(function(e){return a("v-list-item",{key:e.title,on:{click:function(t){}}},[a("v-list-item-avatar",[a("v-icon",[t._v(" "+t._s(e.iconClass))])],1),a("v-list-item-content",[a("v-list-item-title",{domProps:{textContent:t._s(e.title)}}),a("v-list-item-subtitle",{domProps:{textContent:t._s(e.subtitle)}})],1),a("v-list-item-action",[a("v-btn",{attrs:{icon:""}},[a("v-icon",{attrs:{color:"grey lighten-1"}},[t._v("mdi-information")])],1)],1)],1)}))],2)],1)},te=[],ee={data:function(){return{items:[{icon:"folder",iconClass:"mdi-folder",title:"Photos",subtitle:"Jan 9, 2014"},{icon:"folder",iconClass:"mdi-folder",title:"Recipes",subtitle:"Jan 17, 2014"},{icon:"folder",iconClass:"mdi-folder",title:"Work",subtitle:"Jan 28, 2014"}],items2:[{icon:"assignment",iconClass:"mdi-file",title:"Vacation itinerary",subtitle:"Jan 20, 2014"},{icon:"call_to_action",iconClass:"mdi-PdfBox",title:"Kitchen remodel",subtitle:"Jan 10, 2014"}]}}},ae=ee,ie=Object(m["a"])(ae,Zt,te,!1,null,null,null),ne=ie.exports;d()(ie,{VBtn:_["a"],VIcon:k["a"],VList:w["a"],VListItem:P["a"],VListItemAction:T["a"],VListItemAvatar:pt["a"],VListItemContent:I["a"],VListItemSubtitle:I["b"],VListItemTitle:I["c"],VSpacer:F["a"],VTextField:E["a"],VToolbar:it["a"],VToolbarTitle:J["a"]});var oe=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-toolbar",{attrs:{flat:""}},[a("v-toolbar-title",[t._v("빠른액세스")]),a("v-spacer"),a("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"검색","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),a("v-list",{attrs:{"two-line":"",subheader:""}},[t._l(t.items,(function(e){return a("v-list-item",{key:e.title,on:{click:function(t){}}},[a("v-list-item-avatar",[a("v-icon",[t._v(t._s(e.iconClass))])],1),a("v-list-item-content",[a("v-list-item-title",{domProps:{textContent:t._s(e.title)}}),a("v-list-item-subtitle",{domProps:{textContent:t._s(e.subtitle)}})],1),a("v-list-item-action",[a("v-btn",{attrs:{icon:""}},[a("v-icon",{attrs:{color:"grey lighten-1"}},[t._v("mdi-information")])],1)],1)],1)})),t._l(t.items2,(function(e){return a("v-list-item",{key:e.title,on:{click:function(t){}}},[a("v-list-item-avatar",[a("v-icon",[t._v(" "+t._s(e.iconClass))])],1),a("v-list-item-content",[a("v-list-item-title",{domProps:{textContent:t._s(e.title)}}),a("v-list-item-subtitle",{domProps:{textContent:t._s(e.subtitle)}})],1),a("v-list-item-action",[a("v-btn",{attrs:{icon:""}},[a("v-icon",{attrs:{color:"grey lighten-1"}},[t._v("mdi-information")])],1)],1)],1)}))],2)],1)},re=[],le={data:function(){return{items:[{icon:"folder",iconClass:"mdi-folder",title:"Photos",subtitle:"Jan 9, 2014"},{icon:"folder",iconClass:"mdi-folder",title:"Recipes",subtitle:"Jan 17, 2014"},{icon:"folder",iconClass:"mdi-folder",title:"Work",subtitle:"Jan 28, 2014"}],items2:[{icon:"assignment",iconClass:"mdi-file",title:"Vacation itinerary",subtitle:"Jan 20, 2014"},{icon:"call_to_action",iconClass:"mdi-PdfBox",title:"Kitchen remodel",subtitle:"Jan 10, 2014"}]}}},se=le,ce=Object(m["a"])(se,oe,re,!1,null,null,null),me=ce.exports;d()(ce,{VBtn:_["a"],VIcon:k["a"],VList:w["a"],VListItem:P["a"],VListItemAction:T["a"],VListItemAvatar:pt["a"],VListItemContent:I["a"],VListItemSubtitle:I["b"],VListItemTitle:I["c"],VSpacer:F["a"],VTextField:E["a"],VToolbar:it["a"],VToolbarTitle:J["a"]});var ve=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("feedback")],1)},de=[],ue=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",[a("v-toolbar",{attrs:{flat:""}},[a("v-toolbar-title",[t._v("피드백 ")]),a("v-spacer")],1),a("v-divider"),a("v-form",[a("v-textarea",{attrs:{name:"input-7-1",filled:"",label:"아쉬웠던 점을 말씀해주세요. 칭찬도 당연히 환영입니다!","auto-grow":""}}),a("v-btn",{attrs:{large:"",color:"primary"}},[t._v("SUBMIT")])],1)],1)},fe=[],pe={data:function(){return{}}},be=pe,_e=a("a844"),xe=Object(m["a"])(be,ue,fe,!1,null,"2905bb4a",null),he=xe.exports;d()(xe,{VBtn:_["a"],VCard:x["a"],VDivider:H["a"],VForm:at["a"],VSpacer:F["a"],VTextarea:_e["a"],VToolbar:it["a"],VToolbarTitle:J["a"]});var Ve={components:{feedback:he}},ge=Ve,Ce=Object(m["a"])(ge,ve,de,!1,null,"5f640232",null),ye=Ce.exports;d()(Ce,{VApp:u["a"]});var ke=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",{attrs:{id:"inspire"}},[a("v-content",[a("v-container",{staticClass:"fill-height",attrs:{fluid:""}},[a("v-row",{attrs:{align:"center",justify:"center"}},[a("v-col",{attrs:{cols:"12",sm:"8",md:"4"}},[a("v-card",{staticClass:"elevation-12"},[a("v-toolbar",{attrs:{color:"primary",dark:"",flat:""}},[a("v-toolbar-title",[t._v("KhuLoud")]),a("v-spacer"),a("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.on;return[a("v-btn",t._g({attrs:{href:t.source,icon:"",large:"",target:"_blank"}},i),[a("v-icon",[t._v("mdi-code-tags")])],1)]}}])},[a("span",[t._v("Source")])])],1),a("v-card-text",[a("v-form",[a("v-text-field",{attrs:{label:"ID",name:"ID",type:"text"},model:{value:t.Id,callback:function(e){t.Id=e},expression:"Id"}}),a("v-text-field",{attrs:{label:"Password",name:"password",type:"password"},model:{value:t.Password,callback:function(e){t.Password=e},expression:"Password"}}),a("v-text-field",{attrs:{label:"Name",name:"name",type:"name"},model:{value:t.Name,callback:function(e){t.Name=e},expression:"Name"}}),a("v-text-field",{attrs:{label:"E-mail",rules:t.emailRules,name:"Email"},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}})],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"primary"},on:{click:function(e){return t.$router.push({name:"Login"})}}},[t._v("Regist")])],1)],1)],1)],1)],1)],1)],1)},we=[],Pe={props:{source:String}},Te=Pe,Ie=Object(m["a"])(Te,ke,we,!1,null,null,null),Le=Ie.exports;d()(Ie,{VApp:u["a"],VBtn:_["a"],VCard:x["a"],VCardActions:h["a"],VCardText:h["b"],VCol:V["a"],VContainer:g["a"],VContent:C["a"],VForm:at["a"],VIcon:k["a"],VRow:S["a"],VSpacer:F["a"],VTextField:E["a"],VToolbar:it["a"],VToolbarTitle:J["a"],VTooltip:nt["a"]}),i["a"].use(B["a"]);var Se=new B["a"]({mode:"history",base:"/",routes:[{path:"/",name:"Home",component:q},{path:"/main",name:"Main",component:jt},{path:"/contact",name:"Contact",component:Ht},{path:"/RegistUser",name:"RegistUser",component:Le},{path:"/login",name:"Login",component:rt},{path:"/file",name:"File",component:Xt},{path:"/fav",name:"Fav",component:ne},{path:"/quick",name:"Quick",component:me},{path:"/feedback",name:"Feedback",component:ye}]}),Fe=a("2f62");i["a"].use(Fe["a"]);var Ee=new Fe["a"].Store({state:{},mutations:{},actions:{},modules:{}}),Je=a("f309");i["a"].use(Je["a"]);var je=new Je["a"]({});i["a"].config.productionTip=!1,new i["a"]({router:Se,store:Ee,vuetify:je,render:function(t){return t(D)}}).$mount("#app")}});
//# sourceMappingURL=app.c164ba17.js.map