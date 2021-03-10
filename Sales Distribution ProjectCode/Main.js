const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { RouteComponent } = owl.router;
const { whenReady } = owl.utils;
const { useRef, useDispatch, useState, useStore } = owl.hooks;
const {qweb} = owl;
const { EventBus } = owl.core;

import { Sign_Up } from "./components/signup.js";
import { Sign_In } from "./components/signin.js";
import { Reg_shop } from "./components/reg_shop.js";
import { Footer } from "./components/footer.js";
import { Header } from "./components/header.js";
import { Silder } from "./components/silder.js";

const APP_TEMPLATE = xml/* xml */ `
   	<div>
    	<Header/>
	    	<RouteComponent/>
		<Footer/>
	</div>`;

class App extends Component {
    static template = APP_TEMPLATE;
    static components = { Sign_Up, Sign_In, RouteComponent, Reg_shop, Footer, Header,Silder };

    async willStart() {
            const session_id = localStorage.getItem('session_id');
                // const sessionPromise = new Promise((resolve) => {return resolve});
            if(session_id){
                const xhr = new window.XMLHttpRequest();
                xhr.open('POST', '/session_validate');
                xhr.send(JSON.stringify({'session_id': session_id}));
                xhr.onload = async () => {
                    const response = JSON.parse(xhr.response);
                    if (response.valid === true) {
                        this.env.bus.trigger('login_changed', {valid: true});
                        this.env.router.navigate({to:'signup'});
                    }
                    else if (response.valid === false) {
                        this.env.bus.trigger('login_changed', {valid: false});
                        this.env.router.navigate({to:'home'});
                    }
                };
            }
            else {
                    this.env.bus.trigger('login_changed', {valid: false});
                    this.env.router.navigate({to:'home'});
            }
        }
	
	_ShopReg() {
		return this.env.router.navigate({ to: 'regshop'});
	}
	_FooTer() {
		return this.env.router.navigate({ to: 'footer'});
	}
	_Header() {
		return this.env.router.navigate({ to: 'header'});
	}
}

	const ROUTES = [
		{ name: "signup", path: "/signup", component: Sign_Up },
		{ name: "signin", path: "/signin", component: Sign_In },
		{ name: "regshop", path: "/regshop", component: Reg_shop },
		{ name: "footer", path: "/footer", component: Footer },
		{ name: "header", path: "/header", component: Header },
		{ name: "home", path: "/", component: Silder }
	];

	function makeEnvironment() {

    const env = { qweb };
    env.router = new owl.router.Router(env, ROUTES);
    env.router.start();
    env.bus = new EventBus();
    return env;
}
	App.env = makeEnvironment();

	async function setup() {
		const salesInstance = new App();
	 	salesInstance.mount(document.body);
	}

	whenReady(setup);