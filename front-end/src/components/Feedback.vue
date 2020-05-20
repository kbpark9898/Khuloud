<template lang="html">
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>피드백
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-divider></v-divider>
    <v-form>
      <v-textarea
        name="input-7-1"
        filled
        label="아쉬웠던 점을 말씀해주세요. 칭찬도 당연히 환영입니다!"
        auto-grow
      ></v-textarea>
      <v-btn large color="primary">SUBMIT</v-btn>
    </v-form>


  </v-card>
</template>

<script>
export default {
  data(){
    return{

    }
  }
}
</script>

<style lang="css" scoped>
</style>
