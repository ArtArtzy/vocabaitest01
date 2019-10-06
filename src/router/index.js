import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

var config = {
  apiKey: "AIzaSyBdtEjH3gCXZBi__HDwxOcGmu0aKKo4blE",
  authDomain: "vocabai.firebaseapp.com",
  databaseURL: "https://vocabai.firebaseio.com",
  projectId: "vocabai",
  storageBucket: "vocabai.appspot.com",
  messagingSenderId: "350281348570",
  appId: "1:350281348570:web:08d10af7ce4c76cfc93ce3"
};

firebase.initializeApp(config);
export const db = firebase.firestore();

Vue.mixin({
  methods: {
    notifyRed(messages) {
      this.$q.notify({
        color: "negative",
        position: "top",
        icon: "error",
        message: messages,
        timeout: 800
      });
    },
    notifyGreen(messages) {
      this.$q.notify({
        color: "secondary",
        position: "top",
        icon: "done",
        message: messages,
        timeout: 800
      });
    },
  },

})
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  return Router
}
