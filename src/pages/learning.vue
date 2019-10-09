<template>
  <div class="bg-black text-white">
    <div class="row">
      <!-- vocab list -->
      <div class="bginside q-ma-md">
        <div class="row justify-between">
          <div class="text-h6 q-ma-md">Learning | Total {{learntWord}} words</div>
          <div class="q-mr-md">
            <q-btn icon="fas fa-bookmark" class="addbtn text-black" size="lg" @click="newVocab()"></q-btn>
          </div>
        </div>
        <div class="bg-black" style="height:5px; width:100%"></div>
        <div class="row col-12">
          <div class="col-3" v-for="(item,index) in vocabList" :key="index">
            <div class="cardbox row cursor-pointer" @click="soundRun(item.vocab)">
              <div class="col-12 row">
                <div class="col-12 q-pa-md text-h4 text-center text-black">{{item.vocab}}</div>
                <div class="col-12 q-pb-md text-body1 text-center text-black">{{item.meaning}}</div>
              </div>
            </div>
          </div>
          <div class="col-12" align="center">
            <q-btn glossy class="btn text-black" @click="learnIt()">I knew these words</q-btn>
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
      this.$q.loading.show({ delay: 400 });
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
      this.showWordInfo();
      this.$q.loading.hide();
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
      this.$q.loading.show({ delay: 400 });
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
      this.$q.loading.hide();

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
    this.newVocab();
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
  background-color: #f3f0ea;
  border: 2px solid black;
  margin: 15px;
  border-radius: 15px;
}
.btn {
  width: 250px;
  background-color: #f8a426;
}
</style>