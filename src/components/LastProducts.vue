<template>
  <div class="general">
    <div class="center">
      <section id="content">
        <Products :products="products" :products2="products2"></Products>
        <!--Listado productos-->
        <div id="products" v-if="products"></div>
        <div id="products2" v-if="products2"></div>
      </section>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
//Variables globales
import Global from "../Global";
import Products from "./Products.vue";

export default {
  name: "LastProducts",
  components: {
    Products
  },
  mounted() {
    this.getLastProducts();

    //If exist params
    this.searchString = this.$route.params.id;
    console.log("id = ", this.searchString);

    if (this.searchString !== null) {
      this.getProductsBySearch(this.searchString);
    }
  },
  data() {
    return {
      url: Global.url,
      products: null,
      products2: null
    };
  },
  methods: {
    getLastProducts() {
      axios.get(this.url + "productos").then(res => {
        if (res.data.status == "success") {
          this.products = res.data.productos;
        }
      });
    },
    //If exist params
    getProductsBySearch(searchString) {
      axios.get(this.url + "search/" + searchString).then(res => {
        if (res.data.status == "success") {
          this.products2 = res.data.productos;
          console.log("Productos = ", this.products2);
        }
      });
    }
  }
};
</script>