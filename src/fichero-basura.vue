  <template>
  <section id="products-component">

        <!-- Filter -->
    <div class="filter col-xs-12 col-lg-2">
        <h3><b>Language</b></h3>
      <label class="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">
        <input name="check[]" type="checkbox" class="custom-control-input1" value="php" />
        <span class="custom-control-indicator checkbox1"></span>
        <span class="custom-control-description">&nbsp;PHP</span>
      </label>
      <br />

      <label class="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">
        <input name="check[]" type="checkbox" class="custom-control-input2" value="javascript" />
        <span class="custom-control-indicator checkbox2"></span>
        <span class="custom-control-description">&nbsp;Javascript</span>
      </label>
      <br />

      <label class="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">
        <input name="check[]" type="checkbox" class="custom-control-input3" value="java" />
        <span class="custom-control-indicator checkbox3"></span>
        <span class="custom-control-description">&nbsp;Java</span>
      </label>
      <br />
      <br />
      <router-link :to="{name:'Products', params: {id:'Hola soy un parametro'}}" active-class="active">Pagina 1</router-link>
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
                        <router-link
                          :to="{name: 'product', params: {id: product._id}}"
                        >{{product.nombre}}</router-link>
                      </h2>

                      <!--<span class="date">{{article.date | moment('dddd, MMMM, YYYY') }}</span>-->
                      <!--<span class="date">{{article.date | moment("from", "now") }}</span>-->
                      <h3>
                        <b>Precio : {{product.precio}}</b>
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
                      >View details</button>
                      <button
                        type="button"
                        class="btn btn-primary btn-lg btn-block text-center"
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
    <div v-else-if="products && products.length < 1">No hay productos para mostrar</div>
    <div v-else>Cargando...</div>
  </section>
</template>
  
  ---------------
  mounted() {
    //If exist params
    this.searchString = this.$route.params.id;
    if (this.searchString !== null) {
      this.getProductsBySearch(this.searchString);
    }
  },
  methods: {
    //If not exist params
    getLastProducts() {
      axios.get(this.url + "productos").then(res => {
        if (res.data.status == "success") {
          this.products = res.data.productos;
          console.log(this.products);
        }
      });
    },

    getProductsBySearch(searchString){
      axios.get(this.url + "search/" + searchString).then(res => {
        if (res.data.status == "success") {
          this.products2 = res.data.productos;
          console.log(this.products2);
        }
      });
    },
  }