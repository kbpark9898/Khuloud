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
                <v-form @submit.prevent="submitForm">
                  <v-text-field
                    label="ID"
                    v-model="id"
                    name="ID"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    label="Password"
                    name="password"
                    type="password"
                  ></v-text-field>

                  <v-text-field
                    label="Name"
                    v-model="name"
                    name="name"
                    type="name"
                  ></v-text-field>

                  <v-text-field
                    label="E-mail"
                    v-model="email"
                    :rules="emailRules"
                    name="Email"
                  ></v-text-field>

                  <v-text-field 
                  label="Contact" 
                  v-model="contact" 
                  name="Contact">
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" :disabled="!id || !password || !name || !email || !contact" @click = "$router.push({name: 'Login'})">Regist</v-btn>
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
              password: '',
              name: '',
              email: '',
              contact: '',
          }
      },
      methods: {
          async submitForm() {
              try {
                  const usderData = {
                      id: this.id,
                      password: this.password,
                      name: this.name,
                      email: this.email,
                      contact: this.contact
                  };
                  const { data } = await registerUser(userData);
                  console.log("회원가입 완료"); 
                  this.$router.push('/');
              } catch (error) {
                  console.log(error.response.data);
              } finally{
                  this.initForm();
              }
          },
          initForm(){
              this.id = '';
              this.password ='';
              this.name = '';
              this.email = '';
              this.contact = '';
          }
      }
  }
</script>
