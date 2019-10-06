<template>
  <div class="bg-black bgdata text-light-green-2">
    <div class="row">
      <div class="col-4">
        <img src="../statics/hal.jpg" style="width:100%" />
        <div align="center">
          <q-btn color="blue-6 text-h6 q-mt-md" class="btn" @click="newVocab()">Learn new words</q-btn>
          <br />
          <br />
          learnt word : {{learntWord}}
        </div>
      </div>
      <div class="col-8">
        <!-- Wait -->
        <div>
          <div class="screen q-mt-lg q-pa-lg" v-show="mode==0">
            > wait a new command...
            <br />>
          </div>
          <!-- Learn -->
          <div class="screen q-mt-lg q-pa-lg" v-show="mode==1">
            <table>
              <tr v-for="(item,index) in vocabList" :key="index">
                <td style="width:120px;">
                  <div @click="soundRun(item.vocab)" class="cursor-pointer">
                    <u>{{item.vocab}}</u>
                  </div>
                </td>
                <td>{{item.meaning}}</td>
              </tr>
            </table>
            <br />
            <q-btn color="deep-orange" glossy @click="learnIt()">Learnt</q-btn>
            <br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../router/index.js";
export default {
  data() {
    return {
      mode: 0,
      vocabList: [],
      showVocab: 0,
      learntWord: 0
    };
  },
  methods: {
    async newVocab() {
      this.mode = 1;
      this.vocabList = [];
      let vocabData = await db
        .collection("user")
        .doc("test01")
        .collection("vocab")
        .where("wordType", "==", "unlearn")
        .limit(5)
        .get();
      this.showVocab = 0;
      if (vocabData.size >= 5) {
        this.showVocab = 5;
      } else {
        this.showVocab = vocabData.size;
      }
      for (let i = 0; i < this.showVocab; i++) {
        let dataKey = {
          vocab: vocabData.docs[i].data().vocab,
          meaning: vocabData.docs[i].data().meaning,
          key: vocabData.docs[i].id
        };

        this.vocabList.push(dataKey);
      }
    },
    soundRun(vocab) {
      const msg = new SpeechSynthesisUtterance();
      msg.volume = 1;
      msg.rate = 0.5;
      msg.pitch = 1;
      msg.text = vocab;

      speechSynthesis.speak(msg);
    },
    async learnIt() {
      for (let i = 0; i < this.showVocab; i++) {
        await db
          .collection("user")
          .doc("test01")
          .collection("vocab")
          .doc(this.vocabList[i].key)
          .update({
            wordType: "learnt"
          });
      }
      this.showWordInfo();
      this.newVocab();
    },
    showWordInfo() {
      db.collection("user")
        .doc("test01")
        .collection("vocab")
        .where("wordType", "==", "learnt")
        .get()
        .then(doc => {
          this.learntWord = doc.size;
        });
    }
  },
  mounted() {
    this.showWordInfo();
  }
};
</script>

<style scoped>
.bgdata {
  height: calc(100vh - 50px);
}
.btn {
  width: 250px;
}
.screen {
  width: 90%;
  background-color: #333d49;
  height: 700px;
  border-radius: 25px;
  border: 5px solid grey;
}
</style>