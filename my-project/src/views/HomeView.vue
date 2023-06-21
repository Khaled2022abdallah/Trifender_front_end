<template>
  <div>
    <h2>Welcome to the Home page</h2>
    <!-- Add your content here -->
  </div>
  <div class="country-container">
    <div @click="toggleImageVisibility('lebanon')">
      <img src="./Lebanon_images/lebanon.jpeg" alt="Lebanon" class="country-image">
      <label class="country-label">Lebanon</label>
    </div>
    <div @click="toggleImageVisibility('syria')">
      <img src="./Syria_images/syria.jpeg" alt="Syria" class="country-image">
      <label class="country-label">Syria</label>
    </div>
    <div @click="toggleImageVisibility('jordan')">
      <img src="./Jordan_images/jordan.jpeg" alt="Jordan" class="country-image">
      <label class="country-label">Jordan</label>
    </div>
  </div>
  <div v-for="(country, index) in filteredAdditionalImages" :key="index">
    <div v-if="country.visible" class="additional-images">
      <h3>{{ country.name }}</h3>
      <img v-for="(image, imageIndex) in country.images" :key="imageIndex" :src="image.src" :alt="image.alt" class="additional-image">
    </div>
    <div v-if="!country.visible && country.images.length === 0" class="no-images">No additional images available</div>
  </div>
</template>



<script>
export default {
  name: 'HomeView',
  data() {
    return {
      additionalImages: [
        {
          name: 'lebanon',
          visible: false,
          images: [
            { src: require('./Lebanon_images/lebanon1.jpeg'), alt: 'Lebanon Image 1' },
            { src: require('./Lebanon_images/lebanon2.jpeg'), alt: 'Lebanon Image 2' },
            { src: require('./Lebanon_images/lebanon3.jpeg'), alt: 'Lebanon Image 3' }
          ]
        },
        {
          name: 'syria',
          visible: false,
          images: [
            { src: require('./Syria_images/syria1.jpeg'), alt: 'Syria Image 1' },
            { src: require('./Syria_images/syria2.jpeg'), alt: 'Syria Image 2' },
            { src: require('./Syria_images/syria3.jpeg'), alt: 'Syria Image 3' }
          ]
        },
        {
          name: 'jordan',
          visible: false,
          images: [
            { src: require('./Jordan_images/jordan1.jpeg'), alt: 'Jordan Image 1' },
            { src: require('./Jordan_images/jordan2.jpeg'), alt: 'Jordan Image 2' },
            { src: require('./Jordan_images/jordan3.jpeg'), alt: 'Jordan Image 3' }
          ]
        }
      ]
    };
  },
  computed: {
    filteredAdditionalImages() {
      return this.additionalImages.filter((country) => country.visible);
    }
  },
  methods: {
    toggleImageVisibility(country) {
      this.additionalImages.forEach((item) => {
        if (item.name === country) {
          item.visible = true;
        } else {
          item.visible = false;
        }
      });
    }
  }
};
</script>



<style>
.country-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.country-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  cursor: pointer;
}

.country-label {
  color: #000;
  font-family: sans-serif;
  font-size: 24px;
  margin-top: 10px;
  text-align: center;
}

.additional-images {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

.additional-image {
  width: 150px;
  height: 150px;
  margin: 10px;
}
</style>
