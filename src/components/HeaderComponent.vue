<template>
  <header id="header">
    <div class="container-fluid">
      <div class="row cabecera">
        <div class="col-xs-12 col-lg-8">
          <img src="../assets/logo.png" class="app-logo" alt="Logotipo" />
          <h1>Welcome to the WebLibrary Vue.js Node.js Mongodb</h1>
          <span>Please select your products ... you book store</span>
        </div>
        <div class="col-xs-12 col-lg-4">
          <button
            type="button"
            class="btn-car btn btn-primary"
            @click="redirigirAlCarrito()"
          >See the Car</button>
          <br />
          <br />
          <button type="button" class="btn-main btn btn-primary" @click="redirigirAlMain()">Homepage</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import swal from "sweetalert";
export default {
  name: "HeaderComponent",
  data() {
    return {
      carroid: null
    };
  },
  methods: {
    redirigirAlCarrito() {
      if (localStorage.getItem("carro")) {
        console.log("localstorage : ", localStorage.getItem("carro"));
        this.carroid = localStorage.getItem("carro");

        this.$router.push({
          name: "carritoid",
          params: { id: this.carroid, id2: 0 }
        });
      } else {
        swal(
          "You have no products in the cart",
          "You must add products to the cart!!",
          "error"
        );
      }
    },
    redirigirAlMain() {
      this.$router.push("/");
    }
  }
};
</script>