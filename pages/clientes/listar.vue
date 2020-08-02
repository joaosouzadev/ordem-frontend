<template>
    <section class="authentication">
        <div class="auth-body" style="max-width: 100%">
            <h1 class="text-uppercase fw-500 mb-4 font-22">
                Clientes Cadastrados
                <nuxt-link :to="{name: 'clientes.cadastrar'}" class="btn btn-primary float-right">
                    + Cadastrar Novo Cliente
                </nuxt-link>
            </h1>

            <table class="table">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Nome</td>
                        <td>Email</td>
                        <td>Telefone</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody id="tbodyCliente">
                    <tr v-for="cliente in clientes.data" :key="cliente.id">
                        <td>{{ cliente.id }}</td>
                        <td>{{ cliente.nome }}</td>
                        <td>{{ cliente.email }}</td>
                        <td>{{ cliente.telefone }}</td>
                        <td>
                            <nuxt-link :to="{name: 'clientes.editar', params: { id: cliente.id }}">
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
            clientes: []
        }
    },

    methods: {
        async fetchClientes() {
            const { data } = await this.$axios.get('/clientes');
            this.clientes = data;
        }
    },

    created() {
        this.fetchClientes();
    }
};

</script>