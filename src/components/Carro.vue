<template>
  <div id="carro" class="col-lg-12">
    <div class="container">
      <div class="row">
        <div class="izquierda col-lg-8 col-md-8 mb-8 mb-md-0">
          <!--<div class="col-12 col-md-12 mb-12 mb-md-0 box2">-->
          <h2>Your Cart</h2>
          <div class="car-list" v-if="cars2 && cars2.length >=1">
            <section>
              <article class="car-item" v-for="car2 in cars2" :key="car2._id">
                <article class="prod-item" v-for="pro2 in pros2" :key="pro2._id">
                  <div class="row">
                    <div class="izquierda p-1">
                      <img
                        :src="url + 'get-image/' + pro2.imageurl"
                        :alt="pro2.title"
                        v-if="pro2._id==car2.idproducto && pro2.imageurl"
                        class="img-responsive img-libros"
                      />
                      <img
                        src="../assets/imagen/default.jpg"
                        :alt="pro2.title"
                        v-if="pro2._id==car2.idproducto && !pro2.imageurl"
                        class="img-responsive img-libros"
                      />
                    </div>
                    <div class="derecha p-1">
                      <!--<h3 v-if="pro2._id==car2.idproducto">Cantidad : {{car2.cantidad}}</h3>-->
                      <h3 v-if="pro2._id==car2.idproducto">
                        <b>{{pro2.nombre}}</b>
                      </h3>

                      <h6 v-if="pro2._id==car2.idproducto">{{pro2.descripcion}}</h6>

                      <h3 v-if="pro2._id==car2.idproducto">
                        <b>{{pro2.precio}} €</b>
                      </h3>

                      <button
                        v-if="pro2._id==car2.idproducto"
                        type="button"
                        class="btn btn-primary"
                        @click="deleteCart(car2._id, pro2._id)"
                      >Delete product</button>
                    </div>
                  </div>
                  <div class="separa"></div>
                </article>
              </article>
            </section>
          </div>
          <div v-else-if="cars2 && cars2.length < 1">No hay productos para mostrar</div>
          <div v-else>Cargando...</div>
          <!--<hr width="75%" />-->

          <!--@endforeach-->
        </div>
        <div class="derecha box-total col-4 col-md-4 col-lg-4 mb-5 mb-md-0">
          <div class="col-12 col-md-12 mb-12 mb-md-0 box2"></div>
          <div class="col-12 col-md-12 mb-12 mb-md-0 box3">
            <h2>Summary</h2>
          </div>
          <div class="col-12 col-md-12 mb-12 mb-md-0 box4">
            Free Shipping
            <br />
            <br />Free shipping on print orders for US, UK, Europe and selected Asian countries
            <hr width="75%" />Sub Total:€
            <!--{{ $obj->sumtotal}}-->
            <br />
            <b>Quantity :{{cars2.length}}</b>
            <!--{{ $obj->items }}-->
            <br />
            <b>VAT :€6.24</b>
            <br />Shipping :€0.00
            <br />
            <br />

            <!--@if ($obj->sumtotal<=0)-->
            <h2>
              Total:
              <!--{{ $obj->sumtotal }}-->
            </h2>
            <!--@endif-->
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
import swal from "sweetalert";

export default {
  name: "carro",
  mounted() {
    //If exist params
    this.idcar = this.$route.params.id;
    this.idpro = this.$route.params.id2;
    console.log("id = ", this.idcar, " idpro = ", this.idpro);

    if (this.idcar !== null) {
      this.getCarBySearch(this.idcar, this.idpro);
    }
  },
  data() {
    return {
      url: Global.url,
      cars2: null,
      pros2: null,
      idpro: null,
      cantidadTotal: 0
    };
  },
  methods: {
    //If exist params
    getCarBySearch(idcar, idpro) {
      axios.get(this.url + "car/search3/" + idcar).then(res => {
        if (res.data.status == "success") {
          this.cars2 = res.data.car;

          console.log("Carros = ", this.cars2);
          console.log("idpro = ", idpro);

          axios.get(this.url + "productos").then(res => {
            if (res.data.status == "success") {
              this.pros2 = res.data.productos;
              console.log("Productos = ", this.pros2);
            }
          });
        }
      });
    },
    deleteCart(idcar, idpro) {
      console.log("c:", idcar, " p:", idpro);
      axios.delete(this.url + "carro/" + idcar + "/" + idpro).then(res => {
        if (res.data.status == "success") {
          swal(
            "Deleted cart product",
            "The Product has been successfully deleted",
            "success"
          );

          this.$router.push("/");
        }
      });
    }
  }
};
</script>