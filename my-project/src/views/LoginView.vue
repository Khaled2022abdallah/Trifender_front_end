<template>
  <div class="form">
    <div class="subtitle">Let's create your account!</div>
    <div class="input-container ic1">
      <input id="username" class="input" type="text" placeholder="">
      <div class="cut"></div>
      <label for="username" class="placeholder">User name</label>
    </div>
    <div class="input-container ic2">
      <input id="email" class="input" type="text" placeholder="">
      <div class="cut cut-short"></div>
      <label for="email" class="placeholder">Email</label>
    </div>
    <div class="input-container ic2">
      <input id="age" class="input" type="number" placeholder="">
      <div class="cut"></div>
      <label for="age" class="placeholder">Age</label>
    </div>
    <div class="input-container ic2">
      <select id="gender" class="input">
        <option value="" disabled selected></option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <div class="cut cut-short"></div>
      <label for="gender" class="placeholder">Gender</label>
    </div>
    <div class="input-container ic2">
      <input id="city" class="input" type="text" placeholder="">
      <div class="cut cut-short"></div>
      <label for="city" class="placeholder">City</label>
    </div>
    <p class="message">{{ message }}</p> <!-- Display the message -->
    <button type="button" class="submit" @click="handleSubmit">Submit</button>
  </div>
</template>
  

<script>
export default {
  name: "LoginView",
  data() {
    return {
      message: "",
    };
  },
  methods: {
    async handleSubmit() {
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const age = document.getElementById("age").value;
      const gender = document.getElementById("gender").value === "male" ? "1" : "2";
      const city = document.getElementById("city").value;

      try {
        let cityId = null;
        if (city) {
          cityId = await this.fetchCityId(city);
        }

        const formData = {
          username,
          email,
          age,
          gender,
          cityId,
        };

        const createdUser = await this.createUser(formData);

        if (createdUser && createdUser.user) {
          console.log(createdUser.user); // Log the created user object
          this.message = "Form submitted successfully!";
          // Perform any additional UI updates or navigation here
          return; // Exit the method here to prevent displaying the error message
        } else {
          console.error("Error creating user:", createdUser);
          this.message = "Error creating the user.";
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
        this.message = "Error submitting the form.";
      }
    },

    async fetchCityId(city) {
      try {
        const response = await fetch(`http://localhost:3000/getcities?name=${city}`);
        const data = await response.json();
        console.log(data); // Log the data to inspect the response
        if (data.cities && data.cities.length > 0) {
          return data.cities[0].id;
        } else {
          console.error("City not found:", city);
        }
      } catch (error) {
        console.error("Error fetching city ID:", error);
      }
      return null;
    },

    async createUser(userData) {
      try {
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        if (response.ok) {
          const createdUser = await response.json();
          return createdUser;
        } else {
          const errorResponse = await response.json();
          console.error("Error creating user:", errorResponse);
          throw new Error("Failed to create user"); // Throw an error to handle it in the calling function
        }
      } catch (error) {
        console.error("Error creating user:", error);
        throw error; // Rethrow the error to handle it in the calling function
      }
    },
  },
};
</script>



<style>
.message{
  color: #eee;
}
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
  