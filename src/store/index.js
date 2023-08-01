import Vuex from 'vuex';
import { getUser } from '../firebase/app_auth';
import { findUser, updateUser } from '../firebase/repository/user_repository';
export default new Vuex.Store({
  state: {
    sampleBlogCards: [
      { blogTitle: 'Blog Card #1', blogCoverPhoto: 'stock-1', blogDate: 'May 1, 2021' },
      { blogTitle: 'Blog Card #2', blogCoverPhoto: 'stock-2', blogDate: 'May 1, 2021' },
      { blogTitle: 'Blog Card #3', blogCoverPhoto: 'stock-3', blogDate: 'May 1, 2021' },
      { blogTitle: 'Blog Card #4', blogCoverPhoto: 'stock-4', blogDate: 'May 1, 2021' }
    ],
    editPost: null,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.email;
      state.profileFirstName = doc.firstName;
      state.profileLastName = doc.lastName;
      state.profileUsername = doc.username;
    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join('') +
        state.profileLastName.match(/(\b\S)?/g).join('');
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    setProfileAdmin(state, payload) {
      state.profileAdmin = payload;
      console.log(state.profileAdmin);
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    changeUsername(state, payload) {
      state.profileUsername = payload;
    }
  },
  actions: {
    async getCurrentUser({ commit }, user) {
      const currentUser = getUser();
      const userDoc = await findUser(currentUser.uid);
      commit('setProfileInfo', userDoc.data());
      commit('setProfileInitials');
      const token = await user.getIdTokenResult();
      const admin = await token.claims.admin;
      commit('setProfileAdmin', admin);
    },
    async updateUserSettings({ commit, state }) {
      const currentUser = state.profileId;
      const updateUserData = await updateUser(
        currentUser,
        state.profileFirstName,
        state.profileLastName,
        state.profileUsername
      );
      commit('setProfileInitials');
      console.log(updateUserData);
    }
  },
  modules: {}
});
