<template>
  <div>Cargando...</div>
</template>

<script>
import axios from "axios";
//Variables globales
import Global from "../Global";
import Car from "../models/Car";
//import { required } from "vuelidate/lib/validators";
import swal from "sweetalert";

export default {
  name: "car",
  data() {
    return {
      url: Global.url,
      cars2: null,
      varcar: true,
      car: new Car(null, null, null, null)
    };
  },
  mounted() {
    //If exist params
    this.carro = this.$route.params.id;
    this.productoid = this.$route.params.productoid;
    this.cantidad = this.$route.params.cantidad;
    this.fecha = new Date();

    this.car = new Car(this.carro, this.productoid, this.cantidad, this.fecha);

    //this.searchString = 1;

    if (this.carro !== null) {
      //Obtengo los datos

      this.getCarBySearch(this.car, this.carro);
    }
    //}
  },
  methods: {
    //If exist params
    getCarBySearch(car, carroid) {
      this.productoid = car.productoid;
      console.log("contenido de car =", car);

      axios.post(this.url + "car/save/", car).then(res => {
        if (res.data.car) {
          swal(
            "Cart created",
            "The cart has been created successfully :)",
            "success"
          );

          this.car = res.data.car;
          this.$router.push({
            name: "carritoid",
            params: { id: carroid, id2: this.productoid }
          });
        } else {
          //Mostrar alerta de error
          swal(
            "Failed creation",
            "The cart has not been stored well!!",
            "error"
          );
        }
      });
    }
  }
};
</script>