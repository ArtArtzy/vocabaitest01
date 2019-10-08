<template>
  <div class="bg-black text-white">
    <div class="row">
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
                <span @click="deleteBtn(props.row.id)" class="cursor-pointer">
                  <q-icon name="fas fa-trash-alt text-white text-body1" />
                </span>
              </q-td>

              <q-td key="Edit" :props="props">
                <span @click="editBtn(props.row.id)" class="cursor-pointer">
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
                <q-input label="Vocabulary" v-model.trim="data.vocab" outlined bg-color="grey-2" />
              </div>
              <div class="col-12 q-mt-md">
                <q-input label="Meaning" v-model.trim="data.meaning" outlined bg-color="grey-2" />
              </div>
              <div class="col-7 q-mt-md" align="center">
                <q-btn glossy class="btn bgamber" @click="saveBtn()">Save</q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>

      <!-- edit vocab -->
      <q-dialog v-model="editMenu" persistent>
        <q-card class="bgAddMenu">
          <q-card-section class="row items-center">
            <div class="text-h6 text-white">Edit vocabulary</div>
            <q-space />
            <q-btn icon="close" flat dense v-close-popup class="bgamber" />
          </q-card-section>
          <div class="bg-black" style="height:5px; width:100%"></div>
          <q-card-section>
            <div class="row q-mx-xl justify-center">
              <div class="col-12">
                <q-input label="Vocabulary" v-model.trim="data.vocab" outlined bg-color="grey-2" />
              </div>
              <div class="col-12 q-mt-md">
                <q-input label="Meaning" v-model.trim="data.meaning" outlined bg-color="grey-2" />
              </div>
              <div class="col-7 q-mt-md" align="center">
                <q-btn glossy class="btn bgamber" @click="saveEditBtn()">Save</q-btn>
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
      addMenu: false,
      editMenu: false
    };
  },
  methods: {
    async saveBtn() {
      if (this.data.vocab.length > 0 && this.data.meaning.length) {
        await db.collection("vocab").add(this.data);
        this.notifyGreen("บันทึกข้อมูลเสร็จสิ้น");
        this.data.vocab = "";
        this.data.meaning = "";
        this.loadData();
      } else {
        this.notifyRed("กรุณากรอกข้อมูลให้ครบ");
      }
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
      this.$q
        .dialog({
          dark: true,
          title: "ลบคำศัพท์",
          message: "คุณต้องการลบคำศัพท์ใช่หรือไม่",
          ok: "ลบ",
          cancel: "ยกเลิก",
          persistent: true
        })
        .onOk(async () => {
          await db
            .collection("vocab")
            .doc(key)
            .delete();

          this.notifyGreen("ลบข้อมูลเรียบร้อย");

          this.loadData();
        });
    },
    async editBtn(key) {
      this.editMenu = true;
      console.log("test");
      let dataget = await db
        .collection("vocab")
        .doc(key)
        .get();
      this.data = dataget.data();
      this.keydata = key;
    },

    async saveEditBtn() {
      console.log("testxx");
      await db
        .collection("vocab")
        .doc(this.keydata)
        .update(this.data);
      this.notifyGreen("บันทึกข้อมูลเรียบร้อยแล้ว");
      this.editMenu = false;
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
</style>
