<template>
  <div class="form">
    <!-- Your existing template code -->
    <div class="input-container ic2">
      <input id="city" class="input" type="text" placeholder="">
      <div class="cut cut-short"></div>
      <label for="city" class="placeholder">City</label>
    </div>
    <button type="button" class="submit" @click="handleSubmit">Submit</button>
    <p>{{ message }}</p> <!-- Display the message -->
  </div>
</template>

<script>
import { createUser } from '../api'; // Import the createUser function

export default {
  name: "LoginView",
  data() {
    return {
      message: "",
    };
  },
  methods: {
    async handleSubmit() {
      console.log("Submit button clicked!");
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const age = document.getElementById("age").value;
      const gender = document.getElementById("gender").value === "male" ? "1" : "2";
      const city = document.getElementById("city").value;

      // Check if the city exists in the database
      let cityId = null;
      if (city) {
        try {
          const response = await fetch(`http://localhost:3000/cities?name=${city}`);
          const data = await response.json();
          if (data && data.length > 0) {
            cityId = data[0].id;
          }
        } catch (error) {
          console.error(error);
        }
      }

      const formData = {
        username,
        email,
        age,
        gender,
        cityId,
      };

      try {
        const createdUser = await createUser(formData); // Use await here to wait for the async operation

        // Handle the response from the server
        // e.g., show a success message or redirect
        this.message = "Form submitted successfully!";
        console.log(createdUser); // You can access the server response here
      } catch (error) {
        // Handle any errors that occurred during the request
        console.error(error);
        this.message = "Error submitting the form.";
      }
    },
  },
};
</script>

  
<style>
.form {
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  height: 450px;
  width: 320px;
  
  /* Center the form */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  /* Add some padding */
  padding: 20px;
}



.title {
  color: #eee;
  font-family: sans-serif;
  font-size: 36px;
  font-weight: 600;
}

.subtitle {
  color: #eee;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: 600;
}

.input-container {
  height: 40px;
  position: relative;
  width: 100%;
}

.ic1 {
  margin-top: 20px;
}

.ic2 {
  margin-top: 30px;
}

.input {
  background-color: #303245;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  font-size: 18px;
  height: 40px;
  outline: 0;
  padding: 4px 10px 0;
  width: 100%;
}

.cut {
  background-color: #15172b;
  border-radius: 10px;
  height: 10px;
  left: 20px;
  position: absolute;
  top: -20px;
  transform: translateY(0);
  transition: transform 200ms;
  width: 76px;
}

.cut-short {
  width: 30px;
}

.input:focus ~ .cut,
.input:not(:placeholder-shown) ~ .cut {
  transform: translateY(8px);
}

.placeholder {
  color: #65657b;
  font-family: sans-serif;
  left: 20px;
  line-height: 14px;
  pointer-events: none;
  position: absolute;
  transform-origin: 0 50%;
  transition: transform 200ms, color 200ms;
  top: 20px;
}

.input:focus ~ .placeholder,
.input:not(:placeholder-shown) ~ .placeholder {
  transform: translateY(-30px) translateX(10px) scale(0.75);
}

.input:not(:placeholder-shown) ~ .placeholder {
  color: #808097;
}

.input:focus ~ .placeholder {
  color: #dc2f55;
}

.submit {
  background-color: #08d;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  cursor: pointer;
  font-size: 18px;
  height: 50px;
  margin-top: 38px;
  text-align: center;
  width: 100%;
}

.submit:active {
  background-color: #06b;
}

</style>
  