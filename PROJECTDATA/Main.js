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
import { User_Form } from "./components/user_form.js";
import { Login_Home } from "./components/loginHome.js";
import { About_us } from "./components/aboutus.js";
import { Order_sales } from "/components/salesPerson/order_sales.js";
import { Payment } from "/components/salesPerson/payment.js";
import { Day_list } from "/components/salesPerson/day_list.js";
import { payment_list } from "/components/salesPerson/payment_list.js";
//import { order_list } from "/components/salesPerson/order_list.js";
import { completed_order_list } from "/components/salesPerson/completed_order_list.js";
import { sales_person_profile } from "/components/salesPerson/sales_person_profile.js";
import { product_list } from "/components/salesPerson/product_list.js";
import { shopper_profile } from "/components/shopper/shopper_profile.js";
import { shop_profile } from "/components/shopper/shop_profile.js";
import { shop_order_list } from "/components/shopper/shop_order.js";
import { sp_visited } from "/components/shopper/sp_visited_shop.js";

const APP_TEMPLATE = xml/* xml */ `
   	<div>
    	<Header/>
	    	<RouteComponent/>
		<Footer/>
	</div>`;

class App extends Component {
    static template = APP_TEMPLATE;
    static components = {  Footer, RouteComponent, Header };
}

	const ROUTES = [
		{ name: "signup", path: "/signup", component: Sign_Up },
		{ name: "signin", path: "/signin", component: Sign_In },
		{ name: "regshop", path: "/regshop", component: Reg_shop },
        { name: "userform", path: "/user_form", component: User_Form },
		{ name: "home", path: "/", component: Silder },
        { name: "loginhome", path: "/loginhome", component: Login_Home },
        { name: "aboutus", path: "/aboutus", component: About_us },
        { name: "ordersales", path: "/ordersales", component: Order_sales },
        { name: "payment", path: "/payment", component: Payment },
        { name: "day_list", path: "/day_list", component: Day_list },
        { name: "payment_list", path: "/payment_list", component: payment_list },
        //{ name: "/order_list", path: "/order_list", component: order_list },
        { name: "completed_order_list", path: "/completed_order_list", component: completed_order_list },
        { name: "sales_person_profile", path: "/sales_person_profile", component: sales_person_profile },
        { name: "product_list", path: "/product_list", component: product_list },
        { name: "shopper_profile", path: "/shopper_profile", component: shopper_profile },
        { name: "shop_order_list", path: "/shop_order_list", component: shop_order_list },
        { name: "shop_profile", path: "/shop_profile", component: shop_profile },
        { name: "sp_visited", path: "/sp_visited", component: sp_visited}

	];

	function makeEnvironment() {

    const env = { qweb };
    env.router = new owl.router.Router(env, ROUTES);
    env.router.start();
    env.bus = new EventBus();
    return env;
}
	function makeStore() {
    const localState = window.localStorage.getItem("PROJECTDATA");
    const state = localState ? JSON.parse(localState) : initialState;
    const store = new Store({ state, actions });
    store.on("update", null, () => {
      localStorage.setItem("PROJECTDATA", JSON.stringify(store.state));
    });
    return store;
  }   

  	
	App.env = makeEnvironment();

	async function setup() {
		const salesInstance = new App();
	 	salesInstance.mount(document.body);
	}

	whenReady(setup);