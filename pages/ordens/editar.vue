<template>
    <section class="authentication">
        <div class="auth-body" style="max-width: 100%">
            <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
                Editar Ordem
            </h1>
            <form class="auth-form" @submit.prevent="submit">
                <alert-success :form="form">
                    Ordem de Serviço editada!
                </alert-success>
                
                <div class="row">
                    <div class="col-1">
                        <div class="form-group">
                            <base-input
                                :form="form"
                                field="cliente"
                                v-model="form.cliente"
                                placeholder="Cliente ID"
                            ></base-input>
                        </div>
                    </div>
                    <div class="col-sm">
                        <div class="form-group">
                            <base-input
                                :form="form"
                                field="clienteNome"
                                v-model="form.clienteNome"
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

                        <!-- <div class="form-group">
                            <base-input
                                :form="form"
                                field="situacao"
                                v-model="form.situacao"
                                placeholder="Situação"
                            ></base-input>
                        </div> -->
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

                <select id="select" v-model="form.servicos" multiple class="form-control">
                  <option value="Sem bateria">Sem bateria</option>
                  <option value="Tela trincada">Tela trincada</option>
                  <option value="Formatar">Formatar</option>
                  <option value="Colocar mais RAM">Colocar mais RAM</option>
                </select>
                <br>
                <!-- <span>Selecionados: {{ form.servicos }}</span> -->
                
                <div class="text-right">
                    <base-button :loading="form.busy">Salvar Alterações</base-button>
                    <button class="btn btn-warning" v-on:click.stop.prevent="downloadFile">PDF</button>
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
                cliente: '',
                clienteNome: '',
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

    async asyncData({ $axios, params, error, redirect }) {
        try {
            const ordem = await $axios.get(`/ordens/${params.id}`);
            console.log(ordem.data);
            return { ordem: ordem.data };
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
            this.form.put(`/ordens/${this.$route.params.id}`)
                .then(res => {
                    // this.form.reset();
                    console.log(res);
                }).catch(error => {
                    console.log(error);
                });

            // alert(JSON.stringify(this.form));
        },

        async downloadFile() {
          await this.$axios.get(`/ordens/${this.ordem.data.id}/pdf`, {responseType: 'arraybuffer'})
            .then(response => {
              let blob = new Blob([response.data], { type: 'application/pdf' });
              let link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              // link.download = 'ordem_' + this.ordem.data.id + '.pdf';
              link.target = '_blank';
              link.open;
              link.click();
            })
        },
    },

    mounted() {
        if (this.ordem) {
            Object.keys(this.form).forEach(key => {
                console.log(key);

                if (this.ordem.data.hasOwnProperty(key)) {

                    if (Object.prototype.toString.call(this.ordem.data[key]) == "[object Object]") { // manipula cliente
                        console.log('cliente');
                        this.form[key] = this.ordem.data[key].id;
                        this.form['clienteNome'] = this.ordem.data[key].nome;

                    } else if (key == "servicos") { // manipula servicos
                        let servicos = JSON.parse(this.ordem.data[key]);
                        console.warn(servicos);
                        let select = document.getElementById('select');
                        if (servicos) {
                            servicos.forEach(servico => {
                                for (var i = 0, l = select.options.length, o; i < l; i++)
                                {
                                    o = select.options[i];
                                    if (servico == o.value) {
                                        o.selected = true;
                                    }
                                }
                            })
                        }

                    } else {
                        this.form[key] = this.ordem.data[key];
                    }
                } else {
                    // console.log('form nao possui ' + key);
                }
            });
        }
    }
};

</script>