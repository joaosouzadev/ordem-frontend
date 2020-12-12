<template>
    <section class="authentication">
        <div class="auth-body" style="max-width: 100%">
            <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
                Cadastrar Cliente
            </h1>
            <form class="auth-form" @submit.prevent="submit">
                <alert-success :form="form">
                    Cliente cadastrado!
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

    methods: {
        submit() {
            // console.log('submitting');
            this.form.post(`/clientes`)
                .then(res => {
                    this.$router.push({
                        name: 'clientes.editar',
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