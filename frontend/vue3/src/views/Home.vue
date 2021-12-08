<template>
  <div class="home">
    <img alt="Vue logo" :src="logo" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import logo from '@/assets/logo.png';

@Options({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  logo = logo
}
</script>
