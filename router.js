import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const page = path => () => import(`~/pages/${path}`).then(m => m.default || m);

const routes = [
	{ path: '/', name: 'index', component: page('index.vue') },
	{ path: '/login', name: 'login', component: page('auth/login.vue') },
	{ path: '/register', name: 'register', component: page('auth/register.vue') },
	{ path: '/verification/verify/:id', name: 'verify', component: page('auth/verification/verify.vue') },
	{ path: '/verification/resend', name: 'verification.resend', component: page('auth/verification/resend.vue') },
	{ path: '/password/email', name: 'password.email', component: page('auth/password/reset_email.vue') },
	{ path: '/password/reset/:token', name: 'password.reset', component: page('auth/password/password_reset.vue') },
	{ path: '/clientes', name: 'clientes.listar', component: page('clientes/listar.vue') },
	{ path: '/clientes/cadastrar', name: 'clientes.cadastrar', component: page('clientes/cadastrar.vue') },
	{ path: '/clientes/:id/editar', name: 'clientes.editar', component: page('clientes/editar.vue') },
	{ path: '/ordens', name: 'ordens.listar', component: page('ordens/listar.vue') },
	{ path: '/ordens/cadastrar', name: 'ordens.cadastrar', component: page('ordens/cadastrar.vue') },
	{ path: '/ordens/:id/editar', name: 'ordens.editar', component: page('ordens/editar.vue') },
];


export function createRouter() {
	return new Router({
		routes,
		mode: 'history'
	});
}