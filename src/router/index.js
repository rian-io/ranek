import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Usuario from "@/views/usuario/Usuario.vue";
import UsuarioProdutos from "@/views/usuario/UsuarioProdutos.vue";
import UsuarioCompras from "@/views/usuario/UsuarioCompras.vue";
import UsuarioEditar from "@/views/usuario/UsuarioEditar.vue";
import UsuarioVendas from "@/views/usuario/UsuarioVendas.vue";
import ProdutosCarregando from "@/components/ProdutosCarregando";
import Produto from "@/components/Produto.vue";

Vue.use(VueRouter);
Vue.component("ProdutosCarregando", ProdutosCarregando);
const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/produto/:id",
    name: "produto",
    component: Produto,
    props: true
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    props: true
  },
  {
    path: "/usuario",
    component: Usuario,
    children: [
      {
        path: "",
        name: "usuario",
        component: UsuarioProdutos
      },
      {
        path: "compras",
        name: "compras",
        component: UsuarioCompras
      },
      {
        path: "vendas",
        name: "vendas",
        component: UsuarioVendas
      },
      {
        path: "editar",
        name: "usuario-editar",
        component: UsuarioEditar
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
});

export default router;
