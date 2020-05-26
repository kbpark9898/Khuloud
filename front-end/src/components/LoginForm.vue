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

              </v-toolbar>
              <v-card-text>
                <v-form > 
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
                <v-btn color="primary" :disabled="!id || !password" @click="submitForm">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { loginUser } from '../api/index'

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
                  const userData = {
                      user_id: this.id,
                      user_pw: this.password
                  };
                  const { data } = await loginUser(userData);
                  console.log(data);
                  
                  this.$store.commit('setId', data.user_id);
                  this.$router.push('/main');
                  
              } catch (error) {
                  console.log("에러");
                  console.log(error.response.data);
              } finally {
                  this.initForm();
              }
          },
          initForm(){
          this.id ='';
          this.password='';
        }
      },
  }
</script>
