<template>
    <section class="authentication">
        <div class="auth-body">
            <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
                Criar conta
            </h1>
            <form class="auth-form" @submit.prevent="submit">
                <alert-success :form="form">
                    Enviamos um e-mail para você ativar sua conta.
                </alert-success>
                <div class="form-group">
                    <base-input
                        :form="form"
                        field="name"
                        v-model="form.name"
                        placeholder="Nome"
                    ></base-input>
                </div>
                <div class="form-group">
                    <base-input
                        :form="form"
                        field="username"
                        v-model="form.username"
                        placeholder="Usuário"
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
                        field="email"
                        inputType="password"
                        v-model="form.password"
                        placeholder="Senha"
                    ></base-input>
                </div>
                <div class="form-group">
                    <base-input
                        :form="form"
                        field="email"
                        inputType="password"
                        v-model="form.password_confirmation"
                        placeholder="Confirme sua senha"
                    ></base-input>
                </div>
                
                <div class="text-right">
                    <base-button :loading="form.busy">Registrar</base-button>
                </div>
                <p class="font-14 fw-400 text-center mt-4">
                    Já é registrado?
                    <nuxt-link to="/login" class="color-blue" href="#">Faça login.</nuxt-link>
                </p>
            </form>
        </div>
    </section>
</template>

<script>
    
export default {
    middleware: ['guest'],
    data() {
        return {
            form: this.$vform({
                username: '',
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            })
        };
    },

    methods: {
        submit() {
            // console.log('submitting');
            this.form.post(`/register`)
                .then(res => {
                    this.form.reset();
                    console.log(res);
                }).catch(error => {
                    console.log(error);
                });
        }
    }
};

</script>