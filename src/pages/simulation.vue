<template>
  <div class="bg-black text-white">
    <div class="row">
      <!-- vocab list -->
      <div class="bginside q-ma-md">
        <div class="row justify-between">
          <div class="text-h6 q-ma-md">Simulation</div>
        </div>
        <div class="bg-black" style="height:5px; width:100%"></div>
        <div class="row">
          <div class="col-3">
            <div class="q-ma-md text-h6 text-center">Current set</div>
            <div class="row q-mx-md" v-for="i in 7" :key="i">
              <div class="col-6 q-pl-md q-pa-md">{{i}}. dog</div>
              <div class="col-6 q-pa-md text-center">new</div>
            </div>
          </div>
          <div class="col-3 border-left">
            <div class="q-ma-md text-h6 text-center">Current status</div>
            <div class="row q-mx-md">
              <div class="col-6 q-pl-md q-pa-md">Total</div>
              <div class="col-6 q-pa-md text-center">116</div>
            </div>
            <div class="row q-mx-md">
              <div class="col-6 q-pl-md q-pa-md">Learnt</div>
              <div class="col-6 q-pa-md text-center">24</div>
            </div>
            <div class="row q-mx-md">
              <div class="col-6 q-pl-md q-pa-md">Problematic</div>
              <div class="col-6 q-pa-md text-center">8</div>
            </div>
            <div class="row q-mx-md">
              <div class="col-6 q-pl-md q-pa-md">Review (yellow)</div>
              <div class="col-6 q-pa-md text-center">8</div>
            </div>
            <div class="row q-mx-md">
              <div class="col-6 q-pl-md q-pa-md">Review (red)</div>
              <div class="col-6 q-pa-md text-center">4</div>
            </div>
            <div class="row q-mx-md">
              <div class="col-6 q-pl-md q-pa-md">Last Login</div>
              <div class="col-6 q-pa-md text-center">7 days ago</div>
            </div>
            <div class="row q-mx-md">
              <div class="col-6 q-pl-md q-pa-md">Knownledge score</div>
              <div class="col-6 text-h4 text-center">240</div>
            </div>
          </div>
          <div class="col-6 border-left">
            <div class="q-pa-md">
              <div class="text-h2 text-center q-my-lg">abate</div>
              <div class="row">
                <div class="col-6 q-my-md" align="center">
                  <q-btn glossy class="btn text-black">ทำให้น้องลง/บรรเทา</q-btn>
                </div>
                <div class="col-6 q-my-md" align="center">
                  <q-btn glossy class="btn text-black">ทำให้น้องลง/บรรเทา</q-btn>
                </div>
                <div class="col-6 q-my-md" align="center">
                  <q-btn glossy class="btn text-black">ทำให้น้องลง/บรรเทา</q-btn>
                </div>
                <div class="col-6 q-my-md" align="center">
                  <q-btn glossy class="btn text-black">ทำให้น้องลง/บรรเทา</q-btn>
                </div>
              </div>
            </div>
            <div class="bg-black" style="height:5px; width:100%"></div>
            <div align="center">
              <div class="text-h5 q-ma-md">ถูกต้อง</div>
              <div>abate = ทำให้น้องลง</div>
              <div>
                <q-btn class="btn text-black q-mt-md" glossy>ข้อต่อไป</q-btn>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-black" style="height:5px; width:100%"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vocabList: []
    };
  },
  methods: {
    checkstatus() {}
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
.border-left {
  border-left: 5px solid black;
}
.btn {
  width: 300px;
  background-color: #f8a426;
}
</style>