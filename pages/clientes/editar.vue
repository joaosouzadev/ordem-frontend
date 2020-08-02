<template>
    <section class="authentication">
        <div class="auth-body">
            <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
                Editar Cliente
            </h1>
            <form class="auth-form" @submit.prevent="submit">
                <alert-success :form="form">
                    Cliente editado!
                </alert-success>
                <div class="form-group">
                    <base-input
                        :form="form"
                        field="nome"
                        v-model="form.nome"
                        placeholder="Nome"
                    ></base-input>
                </div>
                <div class="form-group">
                    <base-input
                        :form="form"
                        field="email"
                        v-model="form.email"
                        placeholder="Email"
                    ></base-input>
                </div>
                <div class="form-group">
                    <base-input
                        :form="form"
                        field="telefone"
                        v-model="form.telefone"
                        placeholder="Telefone"
                    ></base-input>
                </div>
                
                <div class="text-right">
                    <base-button :loading="form.busy">Salvar Alterações</base-button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
    
export default {
    middleware: ['auth'],
    data() {
        return {
            form: this.$vform({
                nome: '',
                email: '',
                telefone: '',
            })
        };
    },

    async asyncData({ $axios, params, error, redirect }) {
        try {
            const cliente = await $axios.get(`/clientes/${params.id}`);
            console.log(cliente.data);
            return { cliente: cliente.data };
        } catch(err) {
            if (err.response.status == 404) {
                error({ statusCode: 404, message: 'Cliente não encontrado'})
            } else {
                error({ statusCode: 500, message: 'Erro de servidor'})
            }
        }
    },

    methods: {
        submit() {
            // console.log('submitting');
            this.form.put(`/clientes/${this.$route.params.id}`)
                .then(res => {
                    // this.form.reset();
                    console.log(res);
                }).catch(error => {
                    console.log(error);
                });
        }
    },

    mounted() {
        if (this.cliente) {
            Object.keys(this.form).forEach(key => {
                if (this.cliente.data.hasOwnProperty(key)) {
                    this.form[key] = this.cliente.data[key];
                } else {
                    console.log('form nao possui ' + key);
                }
            });
        }
    }
};

</script>