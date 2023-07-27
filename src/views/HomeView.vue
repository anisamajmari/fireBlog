<template>
  <div class="home">
    <blog-post :post="welcomeScreen"></blog-post>
    <blog-post :post="post" v-for="(post, index) in sampleBlogPost" :key="index"></blog-post>
  </div>
</template>

<script>
import BlogPost from '../components/BlogPost.vue';
export default {
  components: { BlogPost },
  data() {
    return {
      welcomeScreen: {
        title: 'Welcome!',
        blogPost:
          'Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!',
        welcomeScreen: true,
        photo: 'coding'
      },
      sampleBlogPost: [
        {
          title: 'This is the title',
          blogHTML: 'This is a filler blog post title!',
          blogCoverPhoto: 'beautiful-stories'
        },
        {
          title: 'This is the title',
          blogHTML: 'This is a filler blog post title!',
          blogCoverPhoto: 'designed-for-everyone'
        }
      ]
    };
  }
};
</script>
