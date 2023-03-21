import { createStore } from 'vuex'
import { userType } from '../utils/types'

export default createStore({
  state: {
    userData: <Array<userType>> [],
    dataReady: <boolean> false
  },
  mutations: {
    SET_USERDATA(state, data:Array<userType>) {
      state.userData = data
      state.dataReady = !!data
    }
  },
  actions: {
    SetUserData(context, data:Array<userType>) {
      context.commit('SET_USERDATA', data)
    }
  },
  modules: {
  }
})
