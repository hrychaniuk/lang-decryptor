<template>
  <div id="app">
    <ul class="langs">
      <li class="lang" :key="alian.id" v-for="alian in aliens">
        <div class="lang-img">
          <img width="40" height="40" :src="`/alien/${alian.id}.png`" />
          {{alian.id}}
        </div>
      </li>
    </ul>

    <ul class="langs">
      <li class="lang" :key="native.name" v-for="native in native">
        <div class="lang-img">
          {{native.name}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import words from "@/../words.alien.json";
import aliens from "@/../lang.alien.json";
import native from "@/../lang.native.json";

export default {
  name: "app",
  data: () => ({
    aliens,
    native
  }),
  created() {
    console.log(aliens);
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.lang {
  padding: 10px;
}
.lang-img {
  display: flex;
  flex-direction: column;
}

ul {
  margin: 0;
  padding: 9px;
  display: flex;
  list-style: none;
}
</style>
