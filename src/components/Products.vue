  <template>
  <section id="products-component">
    <!-- Filter -->
    <div class="filter col-xs-12 col-lg-2">
      <h3>
        <b>Language</b>
      </h3>
      <router-link
        class="link"
        :to="{name:'profilter', params: {id:'Php'}}"
        active-class="active"
      >Php</router-link>
      <br />
      <router-link
        class="link"
        :to="{name:'profilter', params: {id:'Javascript'}}"
        active-class="active"
      >Javascript</router-link>
      <br />
      <router-link
        class="link"
        :to="{name:'profilter', params: {id:'Java'}}"
        active-class="active"
      >Java</router-link>
    </div>
    <!--Products-->

    <div id="products-list" v-if="products && products.length >=1">
      <div class="col-xs-10 col-lg-10">
        <!--<div class="col-xs-12 col-lg-2 col-lg-12">-->
        <div class="row">
          <div class="card-group">
            <!--FOR-->
            <article class="product-item" v-for="product in products" :key="product._id">
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
                      {{product.nombre}}
                    </h2>
                    <h3>
                      <b>Price : {{product.precio}}</b>
                    </h3>
                    <p class="descripcion">
                      <b>{{product.descripcion}}</b>
                    </p>
                  </div>
                  <div class="card-footer">
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
    <!--</div>-->
    <div v-else-if="products && products.length < 1">There are no products to show.</div>
    <div v-else>Loading...</div>
  </section>
</template>

<script>
//import axios from "axios";
//Variables globales
import Global from "../Global";
export default {
  name: "Products",
  props: ["products", "products2"],
  mounted() {
  },
  data() {
    return {
      url: Global.url,
      cantidad: 1,
      carrito: null,
      productid: null
    };
  },
  methods: {
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