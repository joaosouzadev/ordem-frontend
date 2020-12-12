<template>
    <section class="authentication">
        <div class="auth-body" style="max-width: 100%">
            <h1 class="text-uppercase fw-500 mb-4 font-22">
                Ordens Cadastradas
                <nuxt-link :to="{name: 'ordens.cadastrar'}" class="btn btn-primary float-right">
                    + Cadastrar Nova Ordem
                </nuxt-link>
            </h1>

            <table class="table">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Cliente</td>
                        <td>Descrição</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody id="tbodyCliente">
                    <tr v-for="ordem in ordens.data" :key="ordem.id">
                        <td>{{ ordem.id }}</td>
                        <td>{{ ordem.cliente.nome }}</td>
                        <td>{{ ordem.descricao }}</td>
                        <td>
                            <nuxt-link :to="{name: 'ordens.editar', params: { id: ordem.id }}">
                                <i class="fas fa-edit"></i>
                            </nuxt-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script>
    
export default {
    middleware: ['auth'],

    data() {
        return {
            ordens: []
        }
    },

    methods: {
        async fetchOrdens() {
            const { data } = await this.$axios.get('/ordens');
            this.ordens = data;
            console.log(this.ordens);
        }
    },

    created() {
        this.fetchOrdens();
    }
};

</script>