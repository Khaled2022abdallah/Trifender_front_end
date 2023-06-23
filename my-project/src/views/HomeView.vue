<template>
  <div>
    <h2>Welcome to the Home page</h2>
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
        <img v-for="(image, imageIndex) in country.images" :key="imageIndex" :src="image.src" :alt="image.name" class="additional-image">
      </div>
      <div v-if="!country.visible && country.images.length === 0" class="no-images">No additional images available</div>
    </div>
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
      this.additionalImages.forEach((item) => {
        item.visible = item.name === country ? !item.visible : false;
      });

      const images = await fetchImagesFromBackend(country);
      this.additionalImages.find((item) => item.name === country).images = images;
    }
  }
};

async function fetchImagesFromBackend(country) {
  try {
    const response = await fetch(`http://localhost:3000/getimages?country=${country}`);
    if (!response.ok) {
      throw new Error('Failed to fetch images from the backend');
    }
    const data = await response.json();
    if (data) {
      console.log(data);
    }
    const images = await Promise.all(
      data.images.map((image) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({
              id: image.id,
              name: image.name,
              src: reader.result,
            });
          };
          reader.readAsDataURL(new Blob([new Uint8Array(image.image.data)]));
        });
      })
    );
    return images;
  } catch (error) {
    console.error('An error occurred while fetching images:', error);
    throw error;
  }
}
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

.no-images {
  text-align: center;
  margin-top: 20px;
  font-family: sans-serif;
  font-size: 16px;
  color: #888;
}
</style>
