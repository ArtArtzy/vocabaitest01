<template>
  <div class="bg-black text-white">
    <div class="row">
      <!-- vocab list -->
      <div class="bginside q-ma-md">
        <div class="row justify-between">
          <div class="text-h6 q-ma-md">Learning | Total {{learntWord}} words</div>
          <div class="q-mr-md">
            <q-btn icon="fas fa-bookmark" class="addbtn" size="lg" @click="newVocab()"></q-btn>
          </div>
        </div>
        <div class="bg-black" style="height:5px; width:100%"></div>
        <div class="row col-12">
          <div class="col-3" v-for="(item,index) in vocabList" :key="index">
            <div class="cardbox row cursor-pointer">
              <div class="col-12 row">
                <div class="col-12 q-pa-md text-h4 text-center">{{item.vocab}}</div>
                <div class="col-12 q-pa-md text-body1 text-center">{{item.meaning}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="bg-black bgdata text-white">
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
  <div class="col-8">-->
  <!-- Wait -->
  <!-- <div>
          <div class="screen q-mt-lg q-pa-lg" v-show="mode==0">
            > wait a new command...
            <br />>
  </div>-->
  <!-- Learn -->
  <!-- <div class="screen q-mt-lg q-pa-lg" v-show="mode==1">
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
  </div>-->
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
        .limit(8)
        .get();
      this.showVocab = 0;
      if (vocabData.size >= 8) {
        this.showVocab = 8;
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
.bginside {
  height: calc(100vh - 82px);
  background-color: #1a2945;
  width: 100%;
}
.brx {
  border: 1px solid red;
}
.addbtn {
  background-color: #f8a426;
  height: 45px;
  margin-top: 6px;
  width: 50px;
  color: #1a2945;
}
.cardbox {
  border: 2px solid black;
  margin: 15px;
  border-radius: 15px;
}
</style>