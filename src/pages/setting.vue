<template>
  <div class="bg-black bgdata text-light-green-2">
    <div class="row">
      <div class="col-4">
        <img src="../statics/hal.jpg" style="width:100%" />
        <div>
          <div
            class="q-ma-lg text-h6 text-green-6"
            align="center"
          >Human...you can change your life if you wannna</div>
          <div align="center">
            <q-btn color="blue-6 text-h6" class="btn" @click="syncData()">Grow up knowledge</q-btn>
          </div>
          <div align="center">
            <q-btn color="blue-6 text-h6 q-mt-md" class="btn" @click="showListBtn()">Time travel</q-btn>
          </div>
          <div align="center">
            <q-btn color="blue-6 text-h6 q-mt-md" class="btn" @click="resetBtn()">Reset your life</q-btn>
          </div>
        </div>
      </div>
      <div class="col-8">
        <!-- Time travel -->
        <div>
          <div class="screen q-mt-lg q-pa-lg" v-show="mode==0">
            > wait a new command...
            <br />>
          </div>
          <div class="screen q-mt-lg q-pa-lg" v-show="mode==1">
            > reset your life...
            <br />>
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
      mode: 0 //0 = introduction, 1 = reset your life
    };
  },
  methods: {
    async resetBtn() {
      this.mode = 1;
      await db
        .collection("user")
        .doc("test01")
        .set({
          score: 0,
          lastLogin: 0
        });
      let docData = await db
        .collection("user")
        .doc("test01")
        .collection("vocab")
        .get();

      docData.forEach(async data => {
        db.collection("user")
          .doc("test01")
          .collection("vocab")
          .doc(data.id)
          .delete();
      });
      let vocabData = await db.collection("vocab").get();
      vocabData.forEach(async data => {
        db.collection("user")
          .doc("test01")
          .collection("vocab")
          .doc(data.id)
          .set({
            vocab: data.data().vocab,
            meaning: data.data().meaning,
            reviewDate: 0,
            wordType: "unlearn"
          });
      });

      this.$q.notify({
        color: "secondary",
        position: "bottom",
        icon: "done",
        message: "reset completely",
        timeout: 800
      });
    }
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