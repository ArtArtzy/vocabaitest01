<template>
  <div class="bg-black text-white">
    <div class="row">
      <!-- control panel -->
      <div class="bginside q-ma-md row">
        <div class="col-1"></div>
        <div class="col-4">
          <div class="text-center text-h6 q-mt-md">Data control</div>
          <div class="boxcontrol q-py-md q-mt-md" align="center">
            <div>
              <q-btn style="width:80%" class="btn text-black" @click="resetBtn()">Reset</q-btn>
            </div>
            <div class="q-py-md">
              <q-btn style="width:80%" class="btn text-black">Sync</q-btn>
            </div>
          </div>
        </div>
        <div class="col-1"></div>
        <div class="col-4">
          <div class="text-center text-h6 q-mt-md">Time control</div>
          <div class="boxcontrol q-py-md q-mt-md" align="center">
            <div>
              <q-btn style="width:80%" class="btn text-black">+1 Days</q-btn>
            </div>
            <div class="q-py-md">
              <q-btn style="width:80%" class="btn text-black">+3 Days</q-btn>
            </div>
            <div class="q-pb-md">
              <q-btn style="width:80%" class="btn text-black">+7 Days</q-btn>
            </div>
            <div class="q-pb-md">
              <q-btn style="width:80%" class="btn text-black">+1 Week</q-btn>
            </div>
            <div class="q-pb-md">
              <q-btn style="width:80%" class="btn text-black">+2 Week</q-btn>
            </div>
            <div class="q-pb-md">
              <q-btn style="width:80%" class="btn text-black">+4 Week</q-btn>
            </div>
            <div class="q-pb-md">
              <q-btn style="width:80%" class="btn text-black">+6 Week</q-btn>
            </div>
            <div class="q-pb-md">
              <q-btn style="width:80%" class="btn text-black">+8 Week</q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="row">
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
    <div class="col-8">-->
    <!-- Time travel -->
    <!-- <div>
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
    </div>-->
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
      for (const data of docData.docs) {
        console.log(data.id);
        await db
          .collection("user")
          .doc("test01")
          .collection("vocab")
          .doc(data.id)
          .delete();
      }

      let vocabData = await db.collection("vocab").get();
      for (const data of vocabData.docs) {
        await db
          .collection("user")
          .doc("test01")
          .collection("vocab")
          .doc(data.id)
          .set({
            vocab: data.data().vocab,
            meaning: data.data().meaning,
            reviewDate: 0,
            wordType: "unlearn"
          });
      }
      this.notifyGreen("รีเซตข้อมูลเรียบร้อย");
    }
  }
};
</script>

<style scoped>
.bgdata {
  height: calc(100vh - 50px);
}
.bginside {
  height: calc(100vh - 82px);
  background-color: #1a2945;
  width: 100%;
}
.boxcontrol {
  background-color: #f3f0ea;
  height: calc(100vh - 300px);
}
.btn {
  background-color: #f8a426;
}
</style>