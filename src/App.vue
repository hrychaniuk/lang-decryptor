<template>
  <div id="app">
    <ul class="langs highlight">
      <li class="lang" :key="alian.id" v-for="alian in aliens">
        <div class="lang-img">
          <img width="40" height="40" :src="`/alien/${alian.id}.png`" />
          {{alian.id}}
        </div>
      </li>
    </ul>

    {{native.length}}

    <div>
      <ul class="langs single" :key="i" v-for="(w, i) in words">
        <li class="lang" :key="`${i}${j}`" v-for="(id, j) in w.key.split(' ')">
          <div class="lang-img">
            <img width="40" height="40" :src="`/alien/${id}.png`" />
            {{relation[id]}}
          </div>
        </li>
      </ul>      
    </div>
  </div>
</template>

<script>
import check from "./check";
import randomGenerator from "./generate-random";
// --
import words from "@/../words.alien.json";
import aliens from "@/../lang.alien.json";
import native from "@/../lang.native.json";
// --
import lodash from "lodash";

let lastIndexLocalStorage = 0;

export default {
  data: () => ({
    words: lodash.cloneDeep(words),
    aliens: lodash.cloneDeep(aliens),
    native: lodash.cloneDeep(native),
    relation: [],
  }),
  methods: {
    async recursion() {
      await this.step().then(arr => {
        if(arr.length) arr.forEach(i => {
          localStorage[lastIndexLocalStorage] = `${i.word} --> ${i.key}`;
          ++lastIndexLocalStorage;
        })
      });

      await new Promise(res => setTimeout(res, 100));

      this.recursion();
    },
    step() {
      const self = this;
      let coincidence = [];
      self.relation = randomGenerator();

      const wordsWithRelations = words.map(i => {
        const ids = i.key.trim().split(' ');
        return {
          key: i.key.trim(),
          word: ids.reduce((acc, i) => {
            acc += self.relation[i];
            return acc;
          }, '')
        }
      });

      return new Promise(async (resolve) => {
        await Promise.all(wordsWithRelations.map(({ word, key }) => {
          return new Promise(_resolve => {
              check(word).then(
                r => {
                  console.warn("SUCCESS", r);
                  coincidence.push({word, key});
                  _resolve();
                },
                e => {
                  // console.error("ERROR", e); 
                  _resolve();
                }
            );
          });
        }));

        if(coincidence.length > 1 
          && coincidence.some(i => i.word.length > 3)) resolve(coincidence);
        else resolve([]);
      });
    }
  },
  created() {
    this.recursion();
  }
};
</script>

<style>
@import "./style.css";
</style>
