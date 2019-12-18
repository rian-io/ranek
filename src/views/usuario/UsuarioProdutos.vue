<template>
  <section>
    <h2>Adicionar Produtos</h2>
    <ProdutosAdicionar />
    <transition-group v-if="usuario_produtos" name="list" tag="ul">
      <li v-for="(produto, index) in usuario_produtos" class="produtos" :key="index + 0">
        <ProdutoItem :produto="produto">
          <p>{{produto.descricao}}</p>
          <button class="deletar" @click.prevent="deletarProduto(produto.id)">Deletar</button>
        </ProdutoItem>
      </li>
    </transition-group>
  </section>
</template>

<script>
import ProdutosAdicionar from "@/components/ProdutosAdicionar.vue";
import ProdutoItem from "@/components/ProdutoItem.vue";
import { mapState, mapActions } from "vuex";
import { api } from "@/services.js";

export default {
  name: "UsuarioProdutos",
  components: {
    ProdutosAdicionar,
    ProdutoItem
  },
  watch: {
    login() {
      this.getUsuarioProdutos();
    }
  },
  methods: {
    ...mapActions(["getUsuarioProdutos"]),
    deletarProduto(id) {
      const confirmar = window.confirm("Deseja remover este produto?");
      if (confirmar) {
        api
          .delete(`/produto/${id}`)
          .then(() => {
            this.getUsuarioProdutos();
          })
          .catch(error => {
            console.log(error.response);
          });
      }
    }
  },
  computed: {
    ...mapState(["login", "usuario", "usuario_produtos"])
  },
  created() {
    if (this.login) {
      this.getUsuarioProdutos();
    }
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}

.deletar {
  position: absolute;
  top: 0px;
  right: 0px;
  background: url("../../assets/remove.svg") no-repeat center center;
  width: 24px;
  height: 24px;
  text-indent: -140px;
  overflow: hidden;
  cursor: pointer;
  border: none;
}
</style>