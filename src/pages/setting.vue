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
              <q-btn style="width:80%" class="btn text-black" @click="resetBtn()" glossy>Reset</q-btn>
            </div>
            <div class="q-py-md">
              <q-btn style="width:80%" class="btn text-black" glossy>Sync</q-btn>
            </div>
          </div>
        </div>
        <div class="col-1"></div>
        <div class="col-4">
          <div class="text-center text-h6 q-mt-md">Time control</div>
          <div class="boxcontrol q-py-md q-mt-md" align="center">
            <div>
              <q-btn style="width:80%" class="btn text-black" glossy>+1 Days</q-btn>
            </div>
            <div class="q-py-md">
              <q-btn style="width:80%" class="btn text-black" glossy>+3 Days</q-btn>
            </div>
            <div class="q-pb-md">
              <q-btn style="width:80%" class="btn text-black" glossy>+7 Days</q-btn>
            </div>
            <div class="q-pb-md">
              <q-btn style="width:80%" class="btn text-black" glossy>+1 Week</q-btn>
            </div>
            <div class="q-pb-md">
              <q-btn style="width:80%" class="btn text-black" glossy>+2 Week</q-btn>
            </div>
            <div class="q-pb-md">
              <q-btn style="width:80%" class="btn text-black" glossy>+4 Week</q-btn>
            </div>
            <div class="q-pb-md">
              <q-btn style="width:80%" class="btn text-black" glossy>+6 Week</q-btn>
            </div>
            <div class="q-pb-md">
              <q-btn style="width:80%" class="btn text-black" glossy>+8 Week</q-btn>
            </div>
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
      this.$q.loading.show({ delay: 400 });
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
        // console.log(data.id);
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
      this.$q.loading.hide();
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