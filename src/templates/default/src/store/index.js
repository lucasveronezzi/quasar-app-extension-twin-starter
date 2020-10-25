import Vue from 'vue'
import Vuex from 'vuex'

<% if (!prompts.useModules) { %>import import Auth from 'app/src/store/Auth'<% } %>

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: <% if (!prompts.useModules) { %>Auth<% } else { %>{}<% } %>,

    strict: process.env.DEV
  })

  return Store
}
