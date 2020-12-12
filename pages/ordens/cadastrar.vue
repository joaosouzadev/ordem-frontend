<template>
    <section class="authentication">
        <div class="auth-body" style="max-width: 100%">
            <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
                Cadastrar Ordem de Serviço
            </h1>
            <form class="auth-form" @submit.prevent="submit">
                <alert-success :form="form">
                    Ordem de Serviço criada!
                </alert-success>

                <div class="row">
                    <div class="col-1">
                        <div class="form-group">
                            <base-input
                                :form="form"
                                field="cliente_id"
                                v-model="form.cliente_id"
                                placeholder="Cliente_id"
                            ></base-input>
                        </div>
                    </div>
                    <div class="col-sm">
                        <div class="form-group">
                            <base-input
                                :form="form"
                                field="cliente"
                                v-model="form.cliente"
                                placeholder="Cliente"
                            ></base-input>
                        </div>
                    </div>
                    <div class="col-sm">
                        <div class="form-group">
                            <base-input
                                :form="form"
                                field="data_entrada"
                                v-model="form.data_entrada"
                                placeholder="Data de Entrada"
                            ></base-input>
                        </div>
                    </div>
                    <div class="col-sm-2">
                        <div class="form-group">
                            <base-input
                                :form="form"
                                field="data_previsao"
                                v-model="form.data_previsao"
                                placeholder="Previsão de Entrega"
                            ></base-input>
                        </div>
                    </div>
                    <div class="col-sm-2">
                        <select v-model="form.situacao" class="form-control">
                          <option disabled value="">Situação</option>
                          <option>Orçamento</option>
                          <option>Em Andamento</option>
                          <option>Concluído</option>
                        </select>
                    </div>
                    <div class="col-sm-2">
                        <div class="form-group">
                            <base-input
                                :form="form"
                                field="valor"
                                v-model="form.valor"
                                placeholder="Valor"
                            ></base-input>
                        </div>
                    </div>
                    <div class="col-sm-2">
                        <div class="form-group">
                            <base-input
                                :form="form"
                                field="data_entrega"
                                v-model="form.data_entrega"
                                placeholder="Data de Entrega"
                            ></base-input>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <base-input
                                :form="form"
                                field="equipamento"
                                v-model="form.equipamento"
                                placeholder="Equipamento"
                            ></base-input>
                        </div>
                    </div>
                    <div class="col-sm">
                        <div class="form-group">
                            <base-input
                                :form="form"
                                field="marca"
                                v-model="form.marca"
                                placeholder="Marca"
                            ></base-input>
                        </div>
                    </div>
                    <div class="col-sm">
                        <div class="form-group">
                            <base-input
                                :form="form"
                                field="modelo"
                                v-model="form.modelo"
                                placeholder="Modelo"
                            ></base-input>
                        </div>
                    </div>
                    <div class="col-sm-2">
                        <div class="form-group">
                            <base-input
                                :form="form"
                                field="numero_serie"
                                v-model="form.numero_serie"
                                placeholder="Número de Série"
                            ></base-input>
                        </div>
                    </div>
                    <div class="col-sm-2">
                        <div class="form-group">
                            <base-input
                                :form="form"
                                field="garantia"
                                v-model="form.garantia"
                                placeholder="Garantia"
                            ></base-input>
                        </div>
                    </div>
                    <div class="col-sm-2">
                        <div class="form-group">
                            <base-input
                                :form="form"
                                field="observacoes"
                                v-model="form.observacoes"
                                placeholder="Observacoes"
                            ></base-input>
                        </div>
                    </div>
                </div>
                
                <select v-model="form.servicos" multiple class="form-control">
                  <option>Sem bateria</option>
                  <option>Tela trincada</option>
                  <option>Formatar</option>
                  <option>Colocar mais RAM</option>
                </select>
                <br>

                <div class="text-right">
                    <!-- criar componente de modal -->
                    <!-- fazer get dos clientes async, jogar numa table num modal, jogar id/nome nos campos ao clicar na tr -->
                    <base-button>Escolher Cliente</base-button>
                    <base-button :loading="form.busy">Cadastrar Ordem</base-button>
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
                cliente_id: '',
                descricao: '',
                data_entrada: '',
                data_previsao: '',
                data_entrega: '',
                situacao: '',
                valor: '',
                equipamento: '',
                marca: '',
                modelo: '',
                numero_serie: '',
                garantia: '',
                observacoes: '',
                servicos: '',
            })
        };
    },

    methods: {
        submit() {
            console.log(this.form);
            this.form.post(`/ordens`)
                .then(res => {
                    this.$router.push({
                        name: 'ordens.editar',
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