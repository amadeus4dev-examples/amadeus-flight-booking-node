//store.js
// Make sure to call Vue.use(Vuex) first if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
Vue.use(Vuex)

export const store = new Vuex.Store({

	state: {
    flavor: '',
    pricing :'',
    chats : null,
    handle : "",
    dataCitySearch:[],
    dataCitySearchArrival:[]
  },
  mutations: {
    change(state, flavor) {
      state.flavor = flavor
    }
    ,
    changePricing (state, pricing) {
    state.pricing = pricing
    },
        SET_CHAT : (state,payload) => {
      state.chats = payload;
    },
    ADD_CHAT : (state,payload) => {
      state.chats.push(payload);
    },
    SET_HANDLE : (state,payload) => {
      state.handle = payload;
    },
    dataCitySearchMute (state, dataCitySearch){
      state.dataCitySearch=dataCitySearch
    },
    dataCitySearchArrival (state, dataCitySearchArrival){
      state.dataCitySearchArrival=dataCitySearchArrival
    },
  },
  getters: {
    flavor: state => state.flavor,
    pricing: state => state.pricing,
     CHATS : state => {
      return state.chats
    },
    HANDLE : state => {
      return state.handle
    },dataCitySearch : state => {
      return state.dataCitySearch
    },dataCitySearchArrival : state => {
      return state.dataCitySearchArrival
    },
    

  },
   actions : {
    SET_CHAT : async (context) => {
      let {data} = await Axios.get('http://localhost:3000/chat');
      window.console.log(data);
      context.commit("SET_CHAT",data);
    },
    ADD_CHAT : (context)=> {
      context.commit("ADD_CHAT");
    },
    SET_HANDLE : (context)=> {
      context.commit("SET_HANDLE");
    }
  },
})