<!-- HomeView.vue -->
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
        <img v-for="(image, imageIndex) in country.images" :key="imageIndex" :src="'${image.src}.jpeg'" :alt="image.alt" 
        class="additional-image">

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
          images: []
        },
        {
          name: 'syria',
          visible: false,
          images: []
        },
        {
          name: 'jordan',
          visible: false,
          images: []
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
    async toggleImageVisibility(country) {
  try {
    for (const item of this.additionalImages) {
      if (item.name === country) {
        item.visible = true;
        const images = await this.getImagesForTable(1); // Assuming relatedType 1 is for countries
        item.images = images.filter((image) => image.relatedId === parseInt(item.name));
      } else {
        item.visible = false;
        item.images = []; // Reset images for non-selected countries
      }
    }
  } catch (error) {
    console.error(error);
  }
},
    async getImagesForTable(tableType) {
      const response = await fetch(`http://localhost:3000/getimages?tableType=${tableType}`);

      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }

      const data = await response.json();
      console.log('Retrieved images:', data.images); // Add this console log
      return data.images;
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
