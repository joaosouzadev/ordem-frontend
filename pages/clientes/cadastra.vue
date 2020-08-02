<template>
    <section class="authentication">
        <div class="auth-body">
            <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
                Cadastrar Cliente
            </h1>
            <form class="auth-form" @submit.prevent="submit">
                <alert-success :form="form">
                    Cliente cadastrado!
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
                    <base-button :loading="form.busy">Cadastrar Cliente</base-button>
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

    methods: {
        submit() {
            // console.log('submitting');
            this.form.post(`/clientes`)
                .then(res => {
                    this.$router.push({
                        name: 'cliente.editar',
                        params: { id: res.data.id }
                    });
                    console.log(res);
                }).catch(error => {
                    console.log(error);
                });
        }
    }
};

</script>