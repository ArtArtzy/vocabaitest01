<template>
  <div class="bg-black bgdata text-light-green-2">
    <div class="row">
      <div class="col-4">
        <img src="../statics/hal.jpg" style="width:100%" />
        <div v-show="mode==0">
          <div class="q-ma-lg text-h6 text-green-6" align="center">Human...What do you want?</div>
          <div align="center">
            <q-btn color="blue-6 text-h6" class="btn" @click="showListBtn()">Show vocab list</q-btn>
          </div>
          <div align="center">
            <q-btn color="blue-6 text-h6 q-mt-md" class="btn" @click="addNewBtn()">Add new vocab</q-btn>
          </div>
        </div>
        <div v-show="mode==1">
          <div class="q-ma-lg text-h6 text-green-6" align="center">Don't be lazy... Human</div>
          <div align="center">
            <q-btn color="blue-6 text-h6 q-mt-md" class="btn" @click="showListBtn()">Show vocab list</q-btn>
          </div>
        </div>
        <div v-show="mode==2">
          <div class="q-ma-lg text-h6 text-green-6" align="center">Concentrate your work... Human</div>
          <div align="center">
            <q-btn color="blue-6 text-h6 q-mt-md" class="btn" @click="addNewBtn()">Add new vocab</q-btn>
          </div>
        </div>

        <div v-show="mode==3">
          <div class="q-ma-lg text-h6 text-green-6" align="center">Always make mistake... Human</div>
          <div align="center">
            <q-btn color="blue-6 text-h6 q-mt-md" class="btn" @click="showListBtn()">Show vocab list</q-btn>
          </div>
        </div>
      </div>
      <div class="col-8">
        <!-- Introduction mode -->
        <div v-show="mode==0">
          <div class="screen q-mt-lg q-pa-lg">
            > wait a new command...
            <br />>
          </div>
        </div>
        <!-- add new mode -->
        <div v-show="mode==1">
          <div class="screen q-mt-lg q-pa-lg">
            > add new vocabulary
            <br />>
            <div class="row">
              <div class="col-7">
                <q-input label="Vocabulary" v-model="data.vocab" standout filled bg-color="grey-2" />
              </div>
              <div class="col-7 q-mt-md">
                <q-input
                  label="Definition"
                  standout
                  v-model="data.meaning"
                  filled
                  bg-color="grey-2"
                />
              </div>
              <div class="col-7 q-mt-md" align="center">
                <q-btn
                  color="white"
                  glossy
                  class="btn text-black q-mr-md"
                  @click="cancelBtn()"
                >cancel</q-btn>
                <q-btn color="deep-orange" glossy class="btn" @click="saveBtn()">Save</q-btn>
              </div>
            </div>
          </div>
        </div>

        <!-- edit  mode -->
        <div v-show="mode==3">
          <div class="screen q-mt-lg q-pa-lg">
            > edit vocabulary
            <br />>
            <div class="row">
              <div class="col-7">
                <q-input label="Vocabulary" v-model="data.vocab" standout filled bg-color="grey-2" />
              </div>
              <div class="col-7 q-mt-md">
                <q-input
                  label="Definition"
                  standout
                  v-model="data.meaning"
                  filled
                  bg-color="grey-2"
                />
              </div>
              <div class="col-7 q-mt-md" align="center">
                <q-btn
                  color="white"
                  glossy
                  class="btn text-black q-mr-md"
                  @click="cancelBtn()"
                >cancel</q-btn>
                <q-btn color="deep-orange" glossy class="btn" @click="saveEditBtn()">Save</q-btn>
              </div>
            </div>
          </div>
        </div>

        <!-- vocab list -->
        <div v-show="mode==2">
          <div class="screen q-mt-lg q-pa-lg">
            > show vocab list
            <br />
            <div class="showResult">
              <table class="fixed_header">
                <thead>
                  <tr>
                    <th style="width: 50px;">No.</th>
                    <th style="width: 200px;">Vocabulary</th>
                    <th style="width: 450px;">Meaning</th>
                    <th style="width: 100px;">delete</th>
                    <th style="width: 100px">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in vocabList" :key="index">
                    <td style="width: 50px;">{{index+1}}</td>
                    <td style="width: 200px;">{{item.vocab}}</td>
                    <td style="width: 450px;">{{item.meaning}}</td>
                    <td style="width: 100px">
                      <div class="cursor-pointer" @click="deleteBtn(item.id)">
                        <u>delete</u>
                      </div>
                    </td>
                    <td style="width: 80px">
                      <div class="cursor-pointer" @click="editBtn(item.id)">
                        <u>edit</u>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
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
      mode: 0, //0=intro, 1=add new, 2 show list, 3= edit
      data: {
        vocab: "",
        meaning: ""
      },
      vocabList: [],
      keydata: ""
    };
  },
  methods: {
    addNewBtn() {
      this.mode = 1;
    },
    async saveBtn() {
      await db.collection("vocab").add(this.data);
      this.$q.notify({
        color: "secondary",
        position: "bottom",
        icon: "done",
        message: "Save completely",
        timeout: 800
      });
      this.data.vocab = "";
      this.data.meaning = "";
      this.mode = 2;
      this.loadData();
    },
    showListBtn() {
      this.mode = 2;
    },
    cancelBtn() {
      this.data.vocab = "";
      this.data.meaning = "";
      this.mode = 2;
    },
    async loadData() {
      this.vocabList = [];
      let doc = await db
        .collection("vocab")
        .orderBy("vocab")
        .get();
      doc.forEach(data => {
        let dataKey = {
          id: data.id,
          vocab: data.data().vocab,
          meaning: data.data().meaning
        };
        this.vocabList.push(dataKey);
      });
    },
    async deleteBtn(key) {
      await db
        .collection("vocab")
        .doc(key)
        .delete();

      this.$q.notify({
        color: "secondary",
        position: "bottom",
        icon: "done",
        message: "Delete completely",
        timeout: 800
      });

      this.loadData();
    },
    async editBtn(key) {
      let dataget = await db
        .collection("vocab")
        .doc(key)
        .get();
      this.data = dataget.data();
      this.keydata = key;
      this.mode = 3;
    },
    async saveEditBtn() {
      await db
        .collection("vocab")
        .doc(this.keydata)
        .update(this.data);
      this.$q.notify({
        color: "secondary",
        position: "bottom",
        icon: "done",
        message: "Update completely",
        timeout: 800
      });
      this.mode = 2;
      this.loadData();
    }
  },
  mounted() {
    this.loadData();
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
td,
th {
  border: 1px solid green;
  text-align: center;
}
table {
  border-collapse: collapse;
}
.brx {
  border: 1px solid red;
}
.showResult {
  height: 630px;
}
.fixed_header tbody {
  display: block;
  width: 100%;
  overflow: auto;
  height: 600px;
}

.fixed_header thead tr {
  display: block;
}

.fixed_header thead {
  background: #1b5e20;
  color: #fff;
}

.fixed_header th,
.fixed_header td {
  padding: 5px;
  text-align: left;
}
.fixed_header {
  table-layout: fixed;
  border-collapse: collapse;
}
</style>
