<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bgcolor">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>Winner LAB</q-toolbar-title>

        <div>Alpha 1.0.0</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bgcolor text-grey-2">
      <div>
        <img src="statics/winnerlab.png" alt style="width:100%" />
      </div>
      <div class="bg-black" style="height:5px; width:100%"></div>
      <div align="center">
        <div class="text-h5 q-mt-sm">PENNY AI</div>
        <div class="text-body1 q-mb-sm">Generative Adversarial Networks</div>
      </div>
      <div class="bg-black" style="height:5px; width:100%"></div>

      <div
        class="menuinactive text-center q-pt-sm q-pl-md text-body1 cursor-pointer"
        :class="{'bgmenu' : menuIndex == 1}"
        @click="dataEntryMenu()"
      >
        <table>
          <tr>
            <td style="width:50px">
              <q-icon name="fas fa-keyboard" size="md" />
            </td>
            <td>Data Entry</td>
          </tr>
        </table>
      </div>

      <div
        class="menuinactive text-center q-pt-sm q-pl-md text-body1 cursor-pointer"
        :class="{'bgmenu' : menuIndex == 2}"
        @click="settingMenu()"
      >
        <table>
          <tr>
            <td style="width:50px">
              <q-icon name="fas fa-cog" size="md" />
            </td>
            <td>Control Panel</td>
          </tr>
        </table>
      </div>

      <div
        class="menuinactive text-center q-pt-sm q-pl-md text-body1 cursor-pointer"
        :class="{'bgmenu' : menuIndex == 3}"
        @click="learningMenu()"
      >
        <table>
          <tr>
            <td style="width:50px">
              <q-icon name="fas fa-book-open" size="md" />
            </td>
            <td>Learning</td>
          </tr>
        </table>
      </div>

      <div
        class="menuinactive text-center q-pt-sm q-pl-md text-body1 cursor-pointer"
        :class="{'bgmenu' : menuIndex == 4}"
        @click="simulationMenu()"
      >
        <table>
          <tr>
            <td style="width:50px">
              <q-icon name="fas fa-running" size="md" />
            </td>
            <td>Simulation</td>
          </tr>
        </table>
      </div>

      <div
        class="menuinactive text-center q-pt-sm q-pl-md text-body1 cursor-pointer"
        :class="{'bgmenu' : menuIndex == 5}"
      >
        <table>
          <tr>
            <td style="width:50px">
              <q-icon name="fas fa-star-half-alt" size="md" />
            </td>
            <td>Result</td>
          </tr>
        </table>
      </div>

      <div
        class="menuinactive text-center q-pt-sm q-pl-md text-body1 cursor-pointer"
        :class="{'bgmenu' : menuIndex == 6}"
        @click="noteMenu()"
      >
        <table>
          <tr>
            <td style="width:50px">
              <q-icon name="fas fa-clipboard" size="md" />
            </td>
            <td>Release Note</td>
          </tr>
        </table>
      </div>

      <div class="fixed-bottom">
        <div class="bg-black" style="height:5px; width:100%"></div>
        <div class="menuinactive text-center q-pt-sm q-pl-md text-body1 cursor-pointer">
          <table>
            <tr>
              <td style="width:50px">
                <q-icon name="fas fa-sign-out-alt" size="md" />
              </td>
              <td>Log out</td>
            </tr>
          </table>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MyLayout",

  data() {
    return {
      leftDrawerOpen: false,
      menuIndex: 1
    };
  },
  methods: {
    dataEntryMenu() {
      this.$router.push("/dataentry");
      this.menuIndex = 1;
    },
    settingMenu() {
      this.$router.push("/setting");
      this.menuIndex = 2;
    },
    learningMenu() {
      this.$router.push("/learning");
      this.menuIndex = 3;
    },
    noteMenu() {
      this.$router.push("/note");
      this.menuIndex = 6;
    },
    simulationMenu() {
      this.$router.push("/simulation");
      this.menuIndex = 4;
    }
  }
};
</script>
<style>
.borderm {
  border: 1px solid grey;
}
.bgcolor {
  background-color: #1a2945;
}
.bgmenu {
  background: rgba(248, 164, 38, 1);
  background: linear-gradient(
    45deg,
    rgba(248, 164, 38, 1) 0%,
    rgba(194, 89, 24, 1) 66%,
    rgba(212, 96, 23, 1) 100%
  );
}
.menuinactive {
  height: 60px;
}
</style>
