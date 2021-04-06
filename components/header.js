const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { RouteComponent } = owl.router;
const { whenReady } = owl.utils;
const { useRef, useDispatch, useState, useStore } = owl.hooks;
const {qweb} = owl;

import { Sign_Up } from "./signup.js";
import { Sign_In } from "./signin.js";
import { User_Form } from "./user_form.js";
import { Footer } from "./footer.js";
import { Home } from "./index.js";
import { Login_Home } from "./loginHome.js";
import { About_us } from "./aboutus.js";
//Sales 
import { Order_sales } from "./salesPerson/order_sales.js";
import { Payment } from "./salesPerson/payment.js";
import { Day_list } from "./salesPerson/day_list.js";
import { payment_list } from "./salesPerson/payment_list.js";
import { completed_order_list } from "./salesPerson/completed_order_list.js";
import { sales_person_profile } from "./salesPerson/sales_person_profile.js";
import { product_list } from "./salesPerson/product_list.js";
import { shopper_profile } from "./shopper/shopper_profile.js";
// import { shop_profile } from "./shopper/shop_profile.js";
// import { shop_order_list } from "./shopper/shop_order.js";



const HEADER_TEMPLATE = xml/* xml */ `
<header class="top-header">
    <div class="header_top">
        <div class="container">
            <div class="row">
                <div class="logo_section">
                    <a class="navbar-brand" href="#"><img src="images/logo1.png" alt="image" height="20%" width="40%"/></a>
                </div>
                <div class="site_information">
                    <ul>
                       	<li class="col-md-3 col-sm-4 pl-5 m	">
                       		<a href="#"><img src="images/mail_icon.png" alt="#" />sales@gmail.com
                       		</a>
                       	</li>
                        <li>
                        	<a href="#"><img src="images/phone_icon.png" alt="#" />+7123569847
                        	</a>
                       	</li>
                    </ul>
                    <ul>
                       	<t t-if="state.user_id and state.is_valid">
                            <t t-if="state.user_role == 'Shopper' " >
                            	<li class="nav-item col-md-2 col-sm-6 pl-4">
				                     <button class="btn btn-primary mr-2" href="#" t-on-click="shopper_profile">Profile</button>
				                </li>
                                <li class="nav-item">
                                    <button class="nav-link btn-primary mr-2" href="#" t-on-click="shop_data">Shop Details</button>
                                </li>
                                <li class="nav-item">
                                    <button class="nav-link btn-primary mr-2" href="#" t-on-click="shop_order_list">Order Deatils</button>
                                </li>
                                <li class="nav-item">
                                    <button class="nav-link btn-primary mr-2" href="#" t-on-click="sp_visited">SalesPerson</button>
                                </li>
                            	<li class="nav-item">
                                    <button class="nav-link btn-warning mr-2" href="#" t-on-click="logout">Logout</button>
                                </li>
                                
                            </t>
                            <t t-else="state.user_role == 'Sales Person' ">
							    <li class="nav-item col-md-2 col-sm-6 pl-4">
				                     <button class="btn btn-primary mr-2" href="#" t-on-click="sales_profile">Profile</button>
				                </li>
				                <li class="nav-item col-md-2 col-sm-6">
				                    <button class="btn btn-primary mr-2" href="#" t-att-id="state.p_id" t-on-click="product_list">Product</button>
				                </li>
				                <li class="nav-item col-md-2 col-sm-6">
				                    <button class="btn btn-primary mr-2" href="#" t-on-click="completed_order_list">Ordered</button>
				                </li>
				                <li class="nav-item col-md-2 col-sm-6">
				                    <button class="btn btn-primary mr-2" href="#" t-att-id="state.id" t-on-click="day_list">Day List</button>
				                </li>
				                <li class="nav-item col-md-2 col-sm-6">
				                    <button class="btn btn-primary mr-2" href="#" t-on-click="payment()">Payment</button>
				                </li>
				                <li class="nav-item col-md-2 col-sm-6">
			                        <button class="btn btn-danger mr-2" href="#" t-on-click="logout">logout</button>
			                    </li>
			                </t>
               			</t>
                       	<t t-else="">
	                        <li>
	                        	<a class="join_bt" t-on-click="onClickLogin()">Join us</a>
	                       	</li>
	                       	<li>
	                        	<a class="join_bt" t-on-click="onClickReg()">Register</a>
	                       	</li>
                       	</t>
                    </ul>
                </div>
            </div>
        </div>
    </div>
	<div class="header_bottom">
	    <div class="container">
	        <div class="col-sm-12">
	            <div class="menu_orange_section">
	                <nav class="navbar header-nav navbar-expand-lg"> 
	                    <div class="menu_section">
	                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-wd" aria-controls="navbar-wd" aria-expanded="false" aria-label="Toggle navigation">
				                <span></span>
				                <span></span>
				                <span></span>
	                		</button>
	                		<div class="collapse navbar-collapse justify-content-end" id="navbar-wd">
			                    <ul class="navbar-nav">
			                        <li>
			                        	<a class="nav-link active" t-on-click="home">Home
			                        	</a>
			                        </li>
			                        <li>
			                        	<a class="nav-link" t-on-click="aboutus">About
			                        	</a>
			                        </li>
			                        <li>
			                        	<a class="nav-link" href="#">Products
			                        	</a>
			                        </li>
			                        <li>
			                        	<a class="nav-link" href="#">Services
			                        	</a>
			                        </li>
			                        <li>
			                        	<a class="nav-link" href="#">News
			                        	</a>
			                        </li>
			                        <li>
			                        	<a class="nav-link" href="#">Contact
			                        	</a>
			                        </li>
			                    </ul>
	                		</div>
	                    </div>
	                </nav>
	                <div class="search-box">
	                    <input type="text" class="search-txt" placeholder="Search" />
	                    <a class="search-btn">
	                        <img src="images/search_icon.png" alt="#" />
	                    </a>
	                </div> 
	            </div>
	        </div>
	    </div>    
	</div>
</header>`;

	export class Header extends Component{
      static template = HEADER_TEMPLATE;
      static components = { Sign_Up, Sign_In, Login_Home, Order_sales, About_us, Payment, Day_list, payment_list, completed_order_list, sales_person_profile, product_list, shopper_profile };
    constructor() {
        super(...arguments);
        this.env.bus.on('login_changed', this, this._loginChanged);
        this._updateState();
    }
    _updateState() {
        this.state = useState({
            user_id: odoo.session_info.user_id,
            is_valid: odoo.session_info.is_valid,
            session_id: odoo.session_info.session_id,
            user_role: odoo.session_info.user_role,
            name: odoo.session_info.name
        });
    }
    home(){
         this.env.router.navigate({ to: 'home' });
    }
    LoginHome(){
        this.env.router.navigate({ to: 'loginhome' });
    }    
    onClickLogin() {
        return this.env.router.navigate({ to: 'signin' });
    } 
    onClickReg(){
        return this.env.router.navigate({ to: 'signup' });
    }
    aboutus()
    {
        return this.env.router.navigate({ to: 'aboutus'});
    }
    order_Sales(){
        this.env.router.navigate({ to: 'ordersales'});
    }
    payment(){
        this.env.router.navigate({ to: 'payment'});
    }
    product_list(ev){
                const xhr = new window.XMLHttpRequest();
                xhr.open('POST', '/view_product_detail');
                xhr.send(JSON.stringify({'session_id': 'blank'}));
                xhr.onload = async () => {
                    const response = JSON.parse(xhr.response);
                    this.env.bus.trigger('product_list', {valid: response.product_detail});
                }
                this.env.router.navigate({ to: 'product_list' });
    }

    payment_list(ev){
                const xhr = new window.XMLHttpRequest();
                xhr.open('POST', '/previous_payment_list');
                xhr.send(JSON.stringify({'session_id': 'blank'}));
                xhr.onload = async () => {
                    const response = JSON.parse(xhr.response);
                    this.env.bus.trigger('payment_list', {valid: response.payment_list});
                }
                this.env.router.navigate({ to: 'payment_list' });
    }

    day_list(ev){
                const xhr = new window.XMLHttpRequest();
                xhr.open('POST', '/view_day_list');
                xhr.send(JSON.stringify({'session_id': 'blank'}));
                xhr.onload = async () => {
                    const response = JSON.parse(xhr.response);
                    this.env.bus.trigger('day_list', {valid: response.day_detail});
                }
                this.env.router.navigate({ to: 'day_list' });
    }

    sales_profile(){
        const xhr = new window.XMLHttpRequest();
            xhr.open('POST', '/get_sales_profile');
            xhr.send(JSON.stringify({'user_id': this.state.user_id}));
            xhr.onload = async () => {
                const response = JSON.parse(xhr.response);
                console.log(response)
                this.env.bus.trigger('sales_profile', {valid: response.sales_profile});
            }
        this.env.router.navigate({ to: 'sales_person_profile' });
    }
    // order_list(ev){
    //             const xhr = new window.XMLHttpRequest();
    //             xhr.open('POST', '/completed_order_list');
    //             xhr.send(JSON.stringify({'session_id': 'blank'}));
    //             xhr.onload = async () => {
    //                 const response = JSON.parse(xhr.response);
    //                 this.env.bus.trigger('order_list', {valid: response.order_list});
    //             }
    //             this.env.router.navigate({ to: 'order_list' });
    // }
    completed_order_list(ev){
                const xhr = new window.XMLHttpRequest();
                xhr.open('POST', '/completed_order_list');
                xhr.send(JSON.stringify({'session_id': 'blank'}));
                xhr.onload = async () => {
                    const response = JSON.parse(xhr.response);
                    this.env.bus.trigger('order_list', {valid: response.order_list});
                }
                this.env.router.navigate({ to: 'completed_order_list' });
    }

    //    shopper
    shopper_profile(){
        const xhr = new window.XMLHttpRequest();
            xhr.open('POST', '/get_shopper_profile');
            xhr.send(JSON.stringify({'user_id': this.state.user_id}));
            xhr.onload = async () => {
                const response = JSON.parse(xhr.response);
                console.log(response)
                this.env.bus.trigger('shopper_profile', {valid: response.shopper_profile});
            }
        this.env.router.navigate({ to: 'shopper_profile' });
    }

    shop_data(ev){
                const xhr = new window.XMLHttpRequest();
                xhr.open('POST', '/shop_profile');
                xhr.send(JSON.stringify({'session_id': 'blank'}));
                xhr.onload = async () => {
                    const response = JSON.parse(xhr.response);
                    this.env.bus.trigger('shop', {valid: response.shop_profile});
                }
                this.env.router.navigate({ to: 'shop_profile' });
    }
     shop_order_list(ev){
                const xhr = new window.XMLHttpRequest();
                xhr.open('POST', '/shop_order_list');
                xhr.send(JSON.stringify({'session_id': 'blank'}));
                xhr.onload = async () => {
                    const response = JSON.parse(xhr.response);
                    this.env.bus.trigger('s_order_list', {valid: response.shop_list});
                }
                this.env.router.navigate({ to: 'shop_order_list' });
    }
    sp_visited(ev){
                const xhr = new window.XMLHttpRequest();
                xhr.open('POST', '/sp_visited');
                xhr.send(JSON.stringify({'session_id': 'blank'}));
                xhr.onload = async () => {
                    const response = JSON.parse(xhr.response);
                    this.env.bus.trigger('sp_shop_visited', {valid: response.sp_visited});
                }
                this.env.router.navigate({ to: 'sp_visited' });
    }
    async logout(ev){
            this.valid = ev.valid;
            const session_id = document.cookie;
            const xhr = new window.XMLHttpRequest();
            xhr.open('POST', '/do_logout');
            xhr.send(JSON.stringify({'session_id': this.state.session_id}));
            xhr.onload = async () => {
                const response = JSON.parse(xhr.response);
                if (response.logout === 'success') {
                    document.cookie = 'session_id=null';
                    odoo.session_info = {
                        user_id: null,
                        is_valid: false,
                        session_id: null,
                        user_role: null
                    };
                    this._updateState();
                    this.env.router.navigate({ to: 'home' });
                }
             }
         }

    _loginChanged (ev) {
        this._updateState();
    }
}