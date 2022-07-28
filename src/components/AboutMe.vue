<template>
  <header class="w-full flex gap-2 flex-col items-start">
    <div class="flex items-center gap-2">
      <div class="grid items-center about mt-2">
        <h1 class="font-bold text-2xl text-2xl">Hello, I'm PHP</h1>
        <p>
        PHP a <span v-tooltip="`${calculateAgeDecimals}`">{{ calculateAge }}</span> Years Old Self-Taught Student from India, 
        Who's Currently Learning Backend Web Development To Create Stunning User Experiences on the Front-End, Scalable and Secure Infrastructure.


        </p>
      </div>
      <nuxt-img src="/php.png" class="rounded-md w-32 h-32" alt="PHP" />
    </div>
    <div class="flex flex-col md:(grid-cols-2 grid) gap-2 w-full">
      <WidgetDiscord />
      <WidgetSpotify class="h-full" />
    </div>
 

  <div class="flex flex-col">
    <h1 class="font-bold text-lg">Technologies I Use</h1>
    <div class="h-full my-2 grid sm:grid-cols-2 md:grid-cols-4 gap-3">
      <div
        v-for="(tech, index) in technologies"
        :key="`tech-${index}`"
        class="bg-gray-900 rounded-md bg-opacity-30 flex items-center justify-between p-4"
      >
        <IconBrand :name="tech" class="w-10 h-10" />
        <h1 class="bold">{{ tech }}</h1>
      </div>
    </div>
  </div>


  </header>
</template>

<script>
    export default {
      data() {
    return {
      technologies: [
        'JavaScript',
        'TypeScript',
        'Python',
        'Vue.js',
        'Nuxt.js',
        'WindiCSS',
        'Firebase',
        'Node.js',
        'Sass',
        'Docker',
        'Dotnet',
        'Github',
        'Figma',
        'React',
      ],
    }
  },
      computed:{
        calculateAge: function() {
          let currentDate = new Date();
          let birthDate = new Date("2004/07/21");
          let difference = currentDate - birthDate;
          let age = Math.floor(difference/31557600000);
          return age
        },
        calculateAgeDecimals: function(){
          let currentDate = new Date();
          let birthDate = new Date("2004/07/21");
          let difference = currentDate - birthDate;
          return difference/31557600000;
        }
      }
    }
</script>

<style></style>
