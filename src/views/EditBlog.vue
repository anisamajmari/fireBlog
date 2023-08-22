<template>
  <div class="create-post">
    <BlogCoverPreview v-show="this.$store.state.blogPhotoPreview" />
    <LoadingComponent v-show="loading" />
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error: </span>{{ this.errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle" />
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input
            type="file"
            ref="blogPhoto"
            id="blog-photo"
            @change="fileChange"
            accept=".png, .jpg, .jpeg"
          />
          <button
            @click="openPreview"
            class="preview"
            :class="{ 'button-inactive': !this.$store.state.blogPhotoFileURL }"
          >
            Preview Photo
          </button>
          <span>File Chosen: {{ this.$store.state.blogPhotoName }}</span>
        </div>
      </div>
      <div class="editor">
        <vue-editor
          :editorOptions="editorSettings"
          v-model="blogHTML"
          useCustomImageHandler
          @image-added="imageHandler"
        />
      </div>
      <div class="blog-actions">
        <button @click="updateBlog">Save Changes</button>
        <router-link class="router-button" :to="{ name: 'BlogPreview' }"
          >Preview Changes</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import BlogCoverPreview from '../components/BlogCoverPreview.vue';
import LoadingComponent from '../components/LoadingComponent.vue';
import { updateBlogPhotos, updateBlog } from '../firebase/repository/blog_repository.js';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { VueEditor, Quill } from 'vue3-editor';
window.Quill = Quill;

import ImageResize from 'quill-image-resize-vue';
import firebaseApp from '../firebase/firebaseInit';
import { db } from '../firebase/firebaseInit.js';
import { doc } from 'firebase/firestore';

Quill.register('modules/imageResize', ImageResize);

export default {
  components: { VueEditor, BlogCoverPreview, LoadingComponent },
  namespaced: 'CreatePost',
  data() {
    return {
      file: null,
      error: null,
      errorMsg: null,
      editorSettings: {
        modules: {
          imageResize: {}
        }
      },
      loading: null,
      routeId: null,
      currentBlog: null
    };
  },
  async mounted() {
    this.routeId = this.$route.params.blogid;
    this.currentBlog = await this.$store.state.blogPosts.filter((post) => {
      return post.blogId === this.routeId;
    });
    this.$store.commit('setBlogState', this.currentBlog[0]);
  },
  computed: {
    profileId() {
      return this.$store.state.profileId;
    },
    blogCoverPhotoName() {
      return this.$store.state.blogPhotoName;
    },
    blogTitle: {
      get() {
        return this.$store.state.blogTitle;
      },
      set(payload) {
        this.$store.commit('updateBlogTitle', payload);
      }
    },
    blogHTML: {
      get() {
        return this.$store.state.blogHTML;
      },
      set(payload) {
        this.$store.commit('newBlogPost', payload);
      }
    }
  },
  methods: {
    fileChange() {
      this.file = this.$refs.blogPhoto.files[0];
      const fileName = this.file.name;
      this.$store.commit('fileNameChange', fileName);
      this.$store.commit('createFileURL', URL.createObjectURL(this.file));
    },

    openPreview() {
      this.$store.commit('openPhotoPreview');
    },

    async imageHandler(file, Editor, cursorLocation, resetUploader) {
      try {
        const storage = getStorage(firebaseApp);
        const imagesRef = ref(storage, `documents/blogPostPhotos/${file.name}`);
        const result = await uploadBytes(imagesRef, file);
        const url = await getDownloadURL(result.ref);
        Editor.insertEmbed(cursorLocation, 'image', url);
        resetUploader();
      } catch (error) {
        console.log(error);
      }
    },
    errorHandler(message) {
      this.error = true;
      this.errorMsg = message;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    },
    async updateBlog() {
      try {
        const docRef = doc(db, 'blogPosts', this.routeId);
        if (this.blogTitle.length !== 0 && this.blogHTML.length !== 0) {
          if (this.file) {
            this.loading = true;
            const storage = getStorage(firebaseApp);
            const imagesRef = ref(
              storage,
              `documents/blogPostPhotos/${this.$store.state.blogPhotoName}`
            );
            const result = await uploadBytes(imagesRef, this.file);
            const url = await getDownloadURL(result.ref);

            await updateBlogPhotos(
              this.routeId,
              url,
              this.blogHTML,
              this.blogCoverPhotoName,
              this.blogTitle
            );

            await this.$store.dispatch('updatePost', this.routeId);
            this.loading = false;

            this.$router.push({ name: 'ViewBlog', params: { blogid: docRef.id } });
            return;
          }
          this.loading = true;
          await updateBlog(this.routeId, this.blogHTML, this.blogTitle);
          await this.$store.dispatch('updatePost', this.routeId);
          this.loading = false;
          this.$router.push({ name: 'ViewBlog', params: { blogid: docRef.id } });
          return;
        }
        this.errorHandler('Please ensure that Blog Title & Blog Post has been filled!');
        return;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
      this.loading = false;
    }
  }
};
</script>

<style lang="scss">
.create-post {
  position: relative;
  height: 100%;

  button {
    margin-top: 0;
  }

  .router-button {
    text-decoration: none;
    color: #fff;
  }

  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;

    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }

  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }

  // error styling
  .invisible {
    opacity: 0 !important;
  }

  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;

    p {
      font-size: 14px;
    }

    span {
      font-weight: 600;
    }
  }

  .blog-info {
    display: flex;
    margin-bottom: 32px;

    input:nth-child(1) {
      min-width: 300px;
    }

    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }

    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;

      input {
        display: none;
      }

      .preview {
        margin-left: 16px;
        text-transform: initial;
      }

      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }

  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;

    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }

    .ql-editor {
      padding: 20px 16px 30px;
    }
  }

  .blog-actions {
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
  }
}
</style>
