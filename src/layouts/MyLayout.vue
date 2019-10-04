<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>Penny AI</q-toolbar-title>

        <div>Alpha 1.0</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-blue-grey-10 text-grey-2"
    >
      <div class="bg-deep-purple shadow-4 q-py-md">
        <div class="text-h4" align="center">GAN Model</div>
        <div class="text-body1" align="center">Genrative Adversarial Networks</div>
      </div>

      <div
        class="q-pa-md borderm cursor-pointer"
        :class="{'bg-indigo-9' : menuIndex != 1, 'bg-green-6' : menuIndex ==1}"
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
        class="q-pa-md borderm cursor-pointer"
        :class="{'bg-indigo-9' : menuIndex != 2, 'bg-green-6' : menuIndex ==2}"
        @click="settingMenu()"
      >
        <table>
          <tr>
            <td style="width:50px">
              <q-icon name="fas fa-cog" size="md" />
            </td>
            <td>Setting</td>
          </tr>
        </table>
      </div>

      <div class="q-pa-md bg-indigo-9 borderm">
        <table>
          <tr>
            <td style="width:50px">
              <q-icon name="fas fa-running" size="md" />
            </td>
            <td>Simulation</td>
          </tr>
        </table>
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
      this.$router.push("/");
      this.menuIndex = 1;
    },
    settingMenu() {
      this.$router.push("/setting");
      this.menuIndex = 2;
    }
  }
};
</script>
<style>
.borderm {
  border: 1px solid grey;
}
</style>
