// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => {
    return { fbLogedInUser : undefined }
  },
  getters: {
    getFbLogedInUser: (state) => state.fbLogedInUser,
  },
  actions: {
    setFbLogedInUser(user) {
      this.fbLogedInUser = user;
    },
  },
})
