<template src="./appHome.html">
  
</template>
<script>

  /* eslint-disable no-mixed-spaces-and-tabs */
export default {
data: function(){
    return {
      menuVisible: false,
      isVisible: false,
      mojsOptions: {
            count: 6,
            radius: {
                15: 100
            },
            origin: '100% 100%',
            degree: 360,
            children: {
                shape: 'polygon',
                fill: ['blue', 'white'],
                isSwirl: true,
                swirlSize: 10,
                swirlFrequency: 2,
                delay: 'stagger(0, 30)'
            }
        },
    }
  },
  name: 'app',
  
  components: {
  },
  created(){

 	
  },
  methods: {

  

  }
}
</script>

<style lang="scss">
.md-app-content {min-height :1280px}
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: md-get-palette-color(green, A200), // The primary color of your application
  accent: md-get-palette-color(red, A200) // The accent or secondary color
));

@import "~vue-material/dist/theme/all";
</style>
