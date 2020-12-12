<template>
    <section class="authentication">
        <div class="auth-body" style="max-width: 100%">
            <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
                Editar Cliente
            </h1>
            <form class="auth-form" @submit.prevent="submit">
                <alert-success :form="form">
                    Cliente editado!
                </alert-success>
                
                <div class="row">
                    <div class="col-sm">
                        <div class="form-group">
                            <base-input
                                :form="form"
                                field="nome"
                                v-model="form.nome"
                                placeholder="Nome"
                            ></base-input>
                        </div>
                    </div>
                    <div class="col-sm">
                        <div class="form-group">
                            <base-input
                                :form="form"
                                field="email"
                                v-model="form.email"
                                placeholder="Email"
                            ></base-input>
                        </div>
                    </div>
                    <div class="col-sm-2">
                        <div class="form-group">
                            <base-input
                                :form="form"
                                field="telefone"
                                v-model="form.telefone"
                                placeholder="Telefone"
                            ></base-input>
                        </div>
                    </div>
                    <div class="col-sm-2">
                        <div class="form-group">
                            <base-input
                                :form="form"
                                field="celular"
                                v-model="form.celular"
                                placeholder="Celular"
                            ></base-input>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-sm">
                        <div class="form-group">
                            <base-input
                                :form="form"
                                field="cep"
                                v-model="form.cep"
                                placeholder="Cep"
                            ></base-input>
                        </div>
                    </div>
                    <div class="col-sm">
                        <div class="form-group">
                            <base-input
                                :form="form"
                                field="rua"
                                v-model="form.rua"
                                placeholder="Rua"
                            ></base-input>
                        </div>
                    </div>
                    <div class="col-sm-2">
                        <div class="form-group">
                            <base-input
                                :form="form"
                                field="numero"
                                v-model="form.numero"
                                placeholder="Numero"
                            ></base-input>
                        </div>
                    </div>
                    <div class="col-sm-2">
                        <div class="form-group">
                            <base-input
                                :form="form"
                                field="complemento"
                                v-model="form.complemento"
                                placeholder="Complemento"
                            ></base-input>
                        </div>
                    </div>
                    <div class="col-sm-2">
                        <div class="form-group">
                            <base-input
                                :form="form"
                                field="bairro"
                                v-model="form.bairro"
                                placeholder="Bairro"
                            ></base-input>
                        </div>
                    </div>
                    <div class="col-sm-2">
                        <div class="form-group">
                            <base-input
                                :form="form"
                                field="cidade"
                                v-model="form.cidade"
                                placeholder="Cidade"
                            ></base-input>
                        </div>
                    </div>
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
                celular: '',
                cep: '',
                rua: '',
                numero: '',
                complemento: '',
                bairro: '',
                cidade: '',
            })
        };
    },

    async asyncData({ $axios, params, error, redirect }) {
        try {
            const cliente = await $axios.get(`/clientes/${params.id}`);
            console.log(cliente.data);
            return { cliente: cliente.data };
        } catch(err) {
            if (err.response.status == 404 || err.response.status == 403) {
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