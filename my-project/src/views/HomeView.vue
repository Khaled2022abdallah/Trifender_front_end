<!-- HomeView.vue -->
<template>
  <div>
    <h2>Let's take a look for our countries</h2>
    <div class="country-container">
      <div @click="toggleImageVisibility('lebanon')">
        <img src="./Lebanon_images/lebanon.jpeg" alt="Lebanon" class="country-image">
        <label class="country-label">Lebanon</label>
        <div class="button-container">
          <button @click="showPhotos('lebanon')">Photos</button>
          <button @click="showTrips('lebanon')">Trips</button>
          <button @click="showAttractions('lebanon')">Attractions</button>
          <button @click="showReviews('lebanon')">Reviews</button>
        </div>
      </div>
      <!-- Repeat the same structure for other countries -->

      <div @click="toggleImageVisibility('syria')">
        <img src="./Syria_images/syria.jpeg" alt="Syria" class="country-image">
        <label class="country-label">Syria</label>
      </div>
      <div @click="toggleImageVisibility('soumal')">
        <img src="./Soumal_images/soumal.jpg" alt="Soumal" class="country-image">
        <label class="country-label">Soumal</label>
      </div>
      <div @click="toggleImageVisibility('soudan')">
        <img src="./Soudan_images/soudan.jpg" alt="Soudan" class="country-image">
        <label class="country-label">Soudan</label>
      </div>
      <div @click="toggleImageVisibility('jordan')">
        <img src="./Jordan_images/jordan.jpeg" alt="Jordan" class="country-image">
        <label class="country-label">Jordan</label>
      </div>
    </div>
    <div v-for="(country, index) in filteredAdditionalImages" :key="index">
      <div v-if="country.visible" class="additional-images">
        <h3>{{ country.name }}</h3>
        <img v-for="(image, imageIndex) in country.images" :key="imageIndex" :src="image.src" :alt="image.name"
          class="additional-image">
      </div>
    <!-- Modify the template to display images within the selected country section -->
    <div v-for="(country, index) in filteredAdditionalImages" :key="index">
      <div class="selected-country">
        <h3>{{ country.name }}</h3>
        <img :src="`./${country.name}_images/${country.name}.jpeg`" :alt="country.name" class="country-image">
        <div class="additional-images">
          <img v-for="(image, imageIndex) in country.images" :key="imageIndex" :src="image.src" :alt="image.name"
            class="additional-image">
        </div>
      </div>
    </div>

    <div v-if="!country.visible && country.images.length === 0" class="no-images">No additional images available</div>
</div>

  <div v-if="showPhotosSection">
    <!-- Display the photos section -->
    <h3>Photos</h3>
    <!-- ... display photos here ... -->
  </div>

  <div v-if="showTripsSection">
    <!-- Display the trips section -->
    <h3>Trips</h3>
    <!-- ... display trips here ... -->
  </div>

  <div v-if="showAttractionsSection">
    <!-- Display the attractions section -->
    <h3>Attractions</h3>
    <!-- ... display attractions here ... -->
  </div>

  <div v-if="showReviewsSection">
    <!-- Display the reviews section -->
    <h3>Reviews</h3>
    <!-- ... display reviews here ... -->
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
          name: 'soumal',
          visible: false,
          images: []
        },
        {
          name: 'soudan',
          visible: false,
          images: []
        },
        {
          name: 'jordan',
          visible: false,
          images: []
        }
      ],
      showPhotosSection: false,
      showTripsSection: false,
      showAttractionsSection: false,
      showReviewsSection: false
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

      const images = await this.fetchImagesFromBackend(country);
      this.additionalImages.find((item) => item.name === country).images = images;


    },
    showPhotos(country) {
      this.showPhotosSection = true;
      this.showTripsSection = false;
      this.showAttractionsSection = false;
      this.showReviewsSection = false;

      this.additionalImages.forEach((item) => {
        item.visible = item.name === country ? !item.visible : false;
      });

      // Call the fetchImagesFromBackend method to fetch and set the images
      this.fetchImagesFromBackend(country)
        .then((images) => {
          this.additionalImages.find((item) => item.name === country).images = images;
        })
        .catch((error) => {
          console.error('An error occurred while fetching images:', error);
          // Handle the error, such as showing an error message
        });
    },
    async fetchImagesFromBackend(country) {
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
    },
    //   showPhotos(country) {
    //   this.showPhotosSection = true;
    //   this.showTripsSection = false;
    //   this.showAttractionsSection = false;
    //   this.showReviewsSection = false;

    //   // Additional logic for fetching and displaying photos
    // },

    // showTrips(country) {
    //   this.showPhotosSection = false;
    //   this.showTripsSection = true;
    //   this.showAttractionsSection = false;
    //   this.showReviewsSection = false;

    //   // Additional logic for fetching and displaying trips
    // },

    // showAttractions(country) {
    //   this.showPhotosSection = false;
    //   this.showTripsSection = false;
    //   this.showAttractionsSection = true;
    //   this.showReviewsSection = false;

    //   // Additional logic for fetching and displaying attractions
    // },

    // showReviews(country) {
    //   this.showPhotosSection = false;
    //   this.showTripsSection = false;
    //   this.showAttractionsSection = false;
    //   this.showReviewsSection = true;

    //   // Additional logic for fetching and displaying reviews
    // }
  }
}
</script>


<style>
.country-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
  margin-top: 20px;
}

.country-image {
  width: 100%;
  height: auto;
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

/* New styles for displaying country and additional images */

.selected-country {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
}

.selected-country h3 {
  font-size: 24px;
  margin-bottom: 20px;
}

.selected-country .country-image {
  width: 300px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
}

.selected-country .additional-images {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 20px;
  margin-top: 20px;
}

.selected-country .additional-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
  cursor: pointer;
}
</style>




<!-- <style>
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

/* New styles for displaying country and additional images */

.selected-country {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
}

.selected-country h3 {
  font-size: 24px;
  margin-bottom: 20px;
}

.selected-country .country-image {
  width: 300px;
  height: 300px;
}

.selected-country .additional-images {
  margin-top: 40px;
}

.selected-country .additional-image {
  width: 200px;
  height: 200px;
  margin: 20px;
}

</style> -->




<!-- <style>
.country-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
}

.country-item {
  flex-basis: calc(33.33% - 10px);
  margin-bottom: 20px;
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
</style> -->





<!-- 
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
</style> -->
