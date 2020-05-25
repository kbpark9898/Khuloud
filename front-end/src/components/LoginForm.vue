<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>KhuLoud</v-toolbar-title>
                <v-spacer></v-spacer>
                <!-- <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      :href="source"
                      icon
                      large
                      target="_blank"
                      v-on="on"
                    >
                      <v-icon>mdi-code-tags</v-icon>
                    </v-btn>
                  </template>
                  <span>Source</span>
                </v-tooltip> -->
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="submitForm"> 
                  <v-text-field
                    label="ID"
                    name="ID"
                    type="text"
                    v-model="id"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <!-- <v-btn color="primary" @click = "$router.push({name: 'RegistUser'})">Regist</v-btn> -->
                <v-btn color="primary" :disabled="!id || !password" router :to="{name: 'Main'}" exact>Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>


  export default {
      data() {
          return {
              id: '',
              password: ''
          }
      },
      methods: {
          async submitForm(){
              try {
                  const usderData = {
                      id: this.id,
                      password: this.password
                  };
                  const { data } = await loginUser(userData);
                  this.$store.commit('setid', data.user.userid);
                  this.$router.push('/main');
                  
              } catch (error) {
                  console.log(error.response.data);
              } finally {
                  this.initForm();
              }
          }
      },
      initForm(){
          this.id ='';
          this.password='';
      }
  }
</script>
