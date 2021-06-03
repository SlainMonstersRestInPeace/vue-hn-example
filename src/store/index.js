import axios from 'axios';
import { createStore } from 'vuex'

async function fetchOperation({ commit, dispatch, state }, url, { options, errorHandler, transformResponse, onSuccess }) {
  const opts = options || {};
  const errorhandler = errorHandler || ((err) => {throw err});
  const transform = transformResponse || (res => res);
  const onsuccess = onSuccess || (() => {});

  let res = {};

  try {
    commit('fetchStart');

    res = await axios(url, opts);
    res = transform(res);

    onsuccess(res, { commit, dispatch, state });
  } catch (err) {
    commit('fetchEnd');

    errorhandler(err);
  }

  commit('fetchEnd');

  return res;
}

export default createStore({
  state: {
    fetchLoading: false,
    hnItems: [],
    previousRoute: null
  },
  mutations: {
    fetchStart(state) {
      state.fetchLoading = true;
    },
    fetchEnd(state) {
      state.fetchLoading = true;
    },
    setHNItems(state, payload) {
      state.hnItems = payload.hits;
      state.nbPages = payload.nbPages;
      state.nbHits = payload.nbHits;
      state.page = payload.page;
    },
    clearHNItems(state) {
      state.hnItems = [];
    },
    setPreviousRoute(state, payload) {
      state.previousRoute = payload;
    }
  },
  actions: {
    async fetchHNItems(cxt, { url, options }) {
      await fetchOperation(cxt, url, {
        options,
        transformResponse: res => res.data,
        errorHandler: err => {
          if (!axios.isCancel(err)) {
            throw err;
          }
        },
        onSuccess: (data, { commit }) => {
          commit('setHNItems', data)
        }
      })
    }
  },
  modules: {
  }
})
