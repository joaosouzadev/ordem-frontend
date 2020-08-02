<template>
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
        Criar nova senha
      </h1>
      <form class="auth-form" @submit.prevent="submit">
        <alert-success :form="form">
          {{ status }}
          <p>
            <nuxt-link to="/login">Ir para Login</nuxt-link>
          </p>
        </alert-success>
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
          <base-button :loading="form.busy">Criar nova senha</base-button>
        </div>
        <p class="font-14 fw-400 text-center mt-4">
          <nuxt-link :to="{ name: 'login' }" class="color-blue">
            Voltar para login
          </nuxt-link>
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
      status: '',
      form: this.$vform({
        email: '',
        password: '',
        password_confirmation: '',
        token: ''
      })
    };
  },
  methods: {
    submit() {
      this.form
        .post('/password/reset')
        .then(res => {
          this.status = res.data.status;
          this.form.reset();
        })
        .catch(e => {
          console.log(e);
        });
    }
  },

  created() {
    this.form.email = this.$route.query.email;
    this.form.token = this.$route.params.token;
  }
};
</script>