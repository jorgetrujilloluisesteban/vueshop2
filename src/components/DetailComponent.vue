<template>
  <div id="detailcar">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 p-2">
          <div class="col-lg-4" style="float: left !important;">
            <br />
            <img
              :src="url + 'get-image/' + product.imageurl"
              :alt="product.title"
              v-if="product.imageurl"
            />
            <img src="../assets/imagen/default.jpg" :alt="product.title" v-if="!product.imageurl" />
          </div>

          <div class="col-lg-8" style="float: right !important;">
            <!--<div class="card-block">-->
            <h2 class="text-uppercase mb-0" style="color:#ec6611;">{{product.nombre}}</h2>
            <h4>
              <b>{{product.descripcion}}</b>
            </h4>

            <div class="col-3 col-md-3 mb-5 mb-md-0 box" style="float: right !important;">
              <h4>Mapt Subscription</h4>
              <h3 style="color:#5594db;">
                <b>FREE</b>
              </h3>
              <h4>€30.23/m after trial</h4>
            </div>
            <div class="col-3 col-md-3 mb-5 mb-md-0 box" style="float: right !important;">
              <h4>Book</h4>
              <h3 style="color:#5594db;">
                <b>{{product.precio}} €</b>
              </h3>
              <h4 style="color:red;">Save 29%</h4>
            </div>
            <div class="col-3 col-md-3 mb-5 mb-md-0 box" style="float: right !important;">
              <h4>Print + eBook</h4>
              <h3 style="color:#5594db;">
                <b>€42.99</b>
              </h3>
              <h4>RRP €42.99</h4>
            </div>
            <div class="col-lg-12 col-md-12 p-3" style="float: right !important;">
              <button
                type="button"
                class="btn btn-primary btn-lg btn-block text-center"
                @click="getCartSave(cantidad, product)"
              >Add to car</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
//Variables globales
import Global from "../Global";
//import Car from "../models/Car";
//import { required } from "vuelidate/lib/validators";

export default {
  name: "detailcar",
  mounted() {
    this.productoid = this.$route.params.id;
    console.log("idpro2 = ", this.productoid);

    if (this.productoid !== null) {
      //Obtengo los datos
      this.getProductBySearch(this.productoid);
    }
    //}
  },
  data() {
    return {
      url: Global.url,
      productoid: null,
      product: null,
      cantidad: 1
    };
  },
  methods: {
    //If not exist params
    getProductBySearch(id) {
      axios.get(this.url + "producto/" + id).then(res => {
        if (res.data.status == "success") {
          this.product = res.data.producto;
          console.log("Este es el producto : ", this.product);
        }
      });
    },
    generateUUID() {
      var d = new Date().getTime();
      var uuid = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(
        c
      ) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      });
      return uuid;
    },
    getCartSave(cantidad, product) {
      if (localStorage.getItem("carro")) {
        this.carrito = localStorage.getItem("carro");
      } else {
        this.carrito = this.generateUUID();
        localStorage.setItem("carro", this.carrito);
      }

      this.productid = product._id;

      console.log(
        "carrito = ",
        this.carrito,
        " cantidad = ",
        cantidad,
        " productoid = ",
        this.productid
      );

      if (cantidad == 1) {
        this.$router.push(
          "/crear-car/" + this.carrito + "/" + this.productid + "/" + cantidad
        );
      }

      return this.carrito;
    },
    getCartDetail(id) {
      this.$router.push("/car-detail/" + id);
    }
  }
};
</script>