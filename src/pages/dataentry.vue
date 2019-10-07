<template>
  <div class="bg-black bgdata text-white">
    <div class="row">
      <!-- Introduction mode -->
      <!-- <div v-show="mode==0">
          <div class="screen q-mt-lg q-pa-lg">
            > wait a new command...
            <br />>
          </div>
      </div>-->
      <!-- add new mode -->
      <!-- <div v-show="mode==1">
          <div class="screen q-mt-lg q-pa-lg">
            > add new vocabulary
            <br />>
            <div class="row">
              <div class="col-7">
                <q-input
                  label="Vocabulary"
                  v-model.trim="data.vocab"
                  standout
                  filled
                  bg-color="grey-2"
                />
              </div>
              <div class="col-7 q-mt-md">
                <q-input
                  label="Definition"
                  standout
                  v-model.trim="data.meaning"
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
      </div>-->

      <!-- edit  mode -->
      <!-- <div v-show="mode==3">
          <div class="screen q-mt-lg q-pa-lg">
            > edit vocabulary
            <br />>
            <div class="row">
              <div class="col-7">
                <q-input
                  label="Vocabulary"
                  v-model.trim="data.vocab"
                  standout
                  filled
                  bg-color="grey-2"
                />
              </div>
              <div class="col-7 q-mt-md">
                <q-input
                  label="Definition"
                  standout
                  v-model.trim="data.meaning"
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
      </div>-->

      <!-- vocab list -->
      <div class="bginside q-ma-md">
        <div class="row justify-between">
          <div class="text-h6 q-ma-md">Data Entry | Total {{vocabList.length}} words</div>
          <div class="q-mr-md">
            <q-btn icon="fas fa-plus" class="addbtn" size="lg" @click="addMenu = true"></q-btn>
          </div>
        </div>
        <div class="bg-black" style="height:5px; width:100%"></div>
        <div>
          <q-table
            :data="vocabList"
            :columns="column"
            dark
            row-key="vocab"
            :pagination.sync="paginationControl"
            color="amber"
            card-class="tdx"
          >
            <q-tr slot="body" slot-scope="props" :props="props">
              <q-td key="vocab" :props="props">{{props.row.vocab}}</q-td>
              <q-td key="meaning" :props="props">{{props.row.meaning}}</q-td>

              <q-td key="Delete" :props="props">
                <span @click="deleteBtn(props.row.id)">
                  <q-icon name="fas fa-trash-alt text-white text-body1" />
                </span>
              </q-td>

              <q-td key="Edit" :props="props">
                <span @click="editBtn(props.row.id)">
                  <q-icon name="fas fa-edit text-white text-body1" />
                </span>
              </q-td>
            </q-tr>
          </q-table>
        </div>
      </div>

      <!-- add new vocab -->
      <q-dialog v-model="addMenu" persistent>
        <q-card class="bgAddMenu">
          <q-card-section class="row items-center">
            <div class="text-h6 text-white">Add new vocabulary</div>
            <q-space />
            <q-btn icon="close" flat dense v-close-popup class="bgamber" />
          </q-card-section>
          <div class="bg-black" style="height:5px; width:100%"></div>
          <q-card-section>
            <div class="row q-mx-xl justify-center">
              <div class="col-12">
                <q-input
                  label="Vocabulary"
                  v-model.trim="data.vocab"
                  standout
                  filled
                  bg-color="grey-2"
                />
              </div>
              <div class="col-12 q-mt-md">
                <q-input
                  label="Meaning"
                  standout
                  v-model.trim="data.meaning"
                  filled
                  bg-color="grey-2"
                />
              </div>
              <div class="col-7 q-mt-md" align="center">
                <q-btn glossy class="btn bgamber" @click="saveBtn()">Save</q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { db } from "../router/index.js";
export default {
  data() {
    return {
      data: {
        vocab: "",
        meaning: ""
      },
      vocabList: [],
      keydata: "",
      column: [
        {
          name: "vocab",
          label: "Vocabulary",
          field: "no",
          sortable: true,

          align: "center"
        },
        {
          name: "meaning",
          label: "Meaning",
          field: "no",
          sortable: true,

          align: "left"
        },
        {
          name: "Delete",
          label: "Delete",
          field: "no",

          style: "width:100px;",
          align: "center"
        },
        {
          name: "Edit",
          label: "Edit",
          field: "no",

          style: "width:100px;",
          align: "center"
        }
      ],
      paginationControl: {
        rowsPerPage: 15
      },
      addMenu: false
    };
  },
  methods: {
    async saveBtn() {
      if (this.data.vocab.length > 0 && this.data.meaning.length) {
        await db.collection("vocab").add(this.data);
        this.notifyGreen("Save completely");
        this.data.vocab = "";
        this.data.meaning = "";
        this.loadData();
      } else {
        this.notifyRed("กรุณากรอกข้อมูลให้ครบ");
      }
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
.tdx {
  background-color: #1a2945;
}
.bgAddMenu {
  background-color: #1a2945;
}
.bgamber {
  background-color: #f8a426;
  color: #1a2945;
}
.btn {
  width: 250px;
}
/* .btn {
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
} */
</style>
