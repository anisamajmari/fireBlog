<template>
  <div class="home">
    <blog-post v-if="!user" :post="welcomeScreen"></blog-post>
    <blog-post :post="post" v-for="(post, index) in blogPostsFeed" :key="index"></blog-post>
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <blog-card :post="post" v-for="(post, index) in blogPostsCards" :key="index"></blog-card>
        </div>
      </div>
    </div>
    <div v-if="!user" class="updates">
      <div class="container">
        <h2>Never miss a post. Register for your free account today!</h2>
        <router-link class="router-button" to="#">
          Register for FireBlogs <Arrow class="arrow arrow-light"
        /></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from '../components/BlogPost.vue';
import BlogCard from '../components/BlogCard.vue';
import Arrow from '../assets/Icons/arrow-right-light.svg';

export default {
  components: { BlogPost, BlogCard, Arrow },
  data() {
    return {
      welcomeScreen: {
        title: 'Welcome!',
        blogPost:
          'Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!',
        welcomeScreen: true,
        photo: 'coding'
      }
      // sampleBlogPost: [
      //   {
      //     title: 'This is the title',
      //     blogHTML: 'This is a filler blog post title!',
      //     blogCoverPhoto: 'beautiful-stories'
      //   },
      //   {
      //     title: 'This is the title',
      //     blogHTML: 'This is a filler blog post title!',
      //     blogCoverPhoto: 'designed-for-everyone'
      //   }
      // ]
    };
  },
  computed: {
    blogPostsFeed() {
      return this.$store.getters.blogPostsFeed;
    },
    blogPostsCards() {
      return this.$store.getters.blogPostsCards;
    },
    user() {
      return this.$store.state.user;
    }
  }
};
</script>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}

.updates {
  .container {
    padding: 100px;
    display: flex;
    align-items: center;
    flex-direction: column;
    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
      justify-content: space-around;
    }

    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;

      @media (min-width: 800px) {
        margin-left: auto;
      }
    }

    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;
      @media (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>
