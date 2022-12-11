<template>
  <div id="app">
    
    <PageHeader/>

    <div class="container">
      <router-view />
    </div>



  </div>
</template>

<script>
import PageHeader from './views/Header.vue';

export default {
  name: 'App',

  components: {
    PageHeader
  },

  data: () => ({
    //
  }),
  methods: {
    openInNewTab(url) {
      var win = window.open(url, '_blank');
      win.focus();
    },
  },
};
</script>
