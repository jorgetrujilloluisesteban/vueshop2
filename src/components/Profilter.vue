  <template>
  <section id="products-component">
    <!-- Filter -->
    <div class="filter col-xs-12 col-lg-2">
      <h3>
        <b>Language</b>
      </h3>

      <router-link class="link" :to="{name:'lastproduct'}" active-class="active">Main page</router-link>
    </div>
    <!--Products-->

    <div id="products-list" v-if="products2 && products2.length >=1">
      <div id="lenguaje"></div>

      <div class="col-xs-10 col-lg-10">
        <!--<div class="col-xs-12 col-lg-2 col-lg-12">-->
        <div class="row">
          <div class="card-group">
            <!--FOR-->
            <article class="product-item" v-for="product in products2" :key="product._id">
              <!--<div class="col-3 col-md-3 mb-5 mb-md-0">-->
              <div class="card-deck">
                <div class="card">
                  <div class="img-responsive img-libros imglibro">
                    <img
                      :src="url + 'get-image/' + product.imageurl"
                      :alt="product.title"
                      v-if="product.imageurl"
                    />
                    <img
                      src="../assets/imagen/default.jpg"
                      :alt="product.title"
                      v-if="!product.imageurl"
                    />
                  </div>
                  <div class="card-block">
                    <h2>
                      <router-link
                        :to="{name: 'product', params: {id: product._id}}"
                      >{{product.nombre}}</router-link>
                    </h2>
                    <h3>
                      <b>Price : {{product.precio}}</b>
                    </h3>
                    <!--<a href="#">Leer más</a>-->
                    <p class="descripcion">
                      <b>{{product.descripcion}}</b>
                    </p>
                  </div>
                  <div class="card-footer">
                    <!--<small class="text-muted">Last updated 3 mins ago</small>-->
                    <button
                      type="button"
                      class="btn btn-warning btn-lg btn-block text-center"
                      @click="getCartDetail(product._id)"
                    >View details</button>
                    <button
                      type="button"
                      class="btn btn-primary btn-lg btn-block text-center"
                      @click="getCartSave(cantidad, product)"
                    >Add to car</button>
                  </div>
                </div>
              </div>
              <!--</div>-->
            </article>
            <!--FOR-->
          </div>
        </div>
        <!--</div>-->
      </div>
    </div>
    <div v-else-if="products && products.length < 1">There are no products to show.</div>
    <div v-else>Loading...</div>
  </section>
</template>

<script>
import axios from "axios";
//Variables globales
import Global from "../Global";
export default {
  name: "Profilter",
  props: ["products"],
  data() {
    return {
      url: Global.url,
      products2: null,
      cantidad: 1,
      carrito: null,
      productid: null
    };
  },
  mounted() {
    if (this.$route.params.id) {
      //If exist params
      this.searchString = this.$route.params.id;
      if (this.searchString !== null) {
        //Obtengo los datos
        this.getProductsBySearch(this.searchString);
        console.log(this.searchString);
      }
    }
  },
  created() {},
  updated() {
    //Escribo el parametro en pantalla
    document.getElementById("lenguaje").innerHTML =
      "Books in " + this.searchString;
  },
  methods: {
    //If exist params
    getProductsBySearch(searchString) {
      axios.get(this.url + "search2/" + searchString).then(res => {
        if (res.data.status == "success") {
          this.products2 = res.data.productos;
          console.log(this.products2);
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