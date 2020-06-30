import Vue from 'vue';
import BootstrapVue from "bootstrap-vue";
import App from './App.vue';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import ErrorComponent from './components/ErrorComponent.vue';
import LastProducts from './components/LastProducts.vue';
import Profilter from './components/Profilter.vue';
import CarritoComponent from './components/CarritoComponent.vue';
import Carro from './components/Carro.vue';
import DetailComponent from './components/DetailComponent.vue';

Vue.use(BootstrapVue)

/*import MiComponente from './components/MiComponente.vue';
import Blog from './components/Blog.vue';
import Formulario from './components/Formulario.vue';
import Pagina from './components/Pagina.vue';
import Peliculas from './components/Peliculas.vue';
import Search from './components/Search.vue';
import Redirect from './components/Redirect.vue';
import Article from './components/Article.vue';
import CreateArticle from './components/CreateArticle.vue';
import EditArticle from './components/EditArticle.vue';*/

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.use(require('vue-moment'));

const routes = [
  /*{path: '/blog', component: Blog},
  {path: '/articulo/:id', name: 'article', component: Article},
  {path: '/editar/:id', name: 'edit', component: EditArticle},
  {path: '/crear-articulo', name: 'create', component: CreateArticle},
  {path: '/formulario', component: Formulario},
  {path: '/pagina/:id?', name: 'pagina', component: Pagina},
  {path: '/ultimos-articulos', component: LastArticles},
  {path: '/buscador/:searchString', component: Search},
  {path: '/redirect/:searchString', component: Redirect},
  {path: '/mi-componente', component: MiComponente},
  {path: '/peliculas', name: 'peliculas', component: Peliculas},*/

  //this.$router.push('/car/:id'+this.carrito+'/:productid'+productid+'/:cantidad'+cantidad);

  //{path: '/car/:id/:productoid/:cantidad', name: 'carrito', component: CarritoComponent},
  //{path: '/car/:id', name: 'carrito', component: CarritoComponent},

  { path: '/productosFilter/:id?', name: 'profilter', component: Profilter },
  { path: '/crear-car/:id/:productoid/:cantidad', name: 'create', component: CarritoComponent },
  { path: '/car-detail/:id', name: 'detail', component: DetailComponent },
  { path: '/carro/:id/:id2', name: 'carritoid', component: Carro },
  { path: '/:id?', name: 'lastproduct', component: LastProducts },
  { path: '*', component: ErrorComponent },

];


const router = new VueRouter({
  routes,
  mode: 'history'
});

Vue.use(BootstrapVue)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')