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

const HEADER_TEMPLATE = xml/* xml */ `
<header class="top-header">
    <div class="header_top">
        <div class="container">
            <div class="row">
                <div class="logo_section">
                    <a class="navbar-brand" href="index.html"><img src="images/logo1.png" alt="image" height="20%" width="40%"/></a>
                </div>
                <div class="site_information">
                    <ul>
                       	<li>
                       		<a href="#"><img src="images/mail_icon.png" alt="#" />sales@gmail.com
                       		</a>
                       	</li>
                        <li>
                        	<a href="#"><img src="images/phone_icon.png" alt="#" />+7123569847
                        	</a>
                       	</li>
                       	<t t-if="valid">
		                    <li class="nav-item">
		                        <button class="nav-link btn-warning mr-2" href="#" t-on-click="logout">Logout</button>
		                    </li>
                		</t>
                       	<t t-else="">
	                        <li>
	                        	<a class="join_bt" t-on-click="_onClickLogin()">Join us</a>
	                       	</li>
	                       	<li>
	                        	<a class="join_bt" t-on-click="_onClickReg()">Register</a>
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
			                        	<a class="nav-link active" href="index.html">Home
			                        	</a>
			                        </li>
			                        <li>
			                        	<a class="nav-link" href="about.html">About
			                        	</a>
			                        </li>
			                        <li>
			                        	<a class="nav-link" href="exchange.html">Exchange
			                        	</a>
			                        </li>
			                        <li>
			                        	<a class="nav-link" href="services.html">Services
			                        	</a>
			                        </li>
			                        <li>
			                        	<a class="nav-link" href="new.html">News
			                        	</a>
			                        </li>
			                        <li>
			                        	<a class="nav-link" href="contact.html">Contact
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
	  static components = { Sign_Up, Sign_In,User_Form};
	constructor() {
	    super(...arguments);
	    // from willstar
	    this.env.bus.on('login_changed', this, this._loginChanged);
    }
    Home(ev){
         this.env.router.navigate({ to: 'home' });
    }
    homeAfterLogin(ev){
         this.env.router.navigate({ to: 'signup' });
    }    
	_onClickLogin() {
		return this.env.router.navigate({ to: 'signin' });
	} 
	_onClickReg(){
		return this.env.router.navigate({ to: 'signup' });
	}
	 async logout(ev){
            this.valid = ev.valid;
            const session_id = localStorage.getItem('session_id');
            const xhr = new window.XMLHttpRequest();
            xhr.open('POST', '/do_logout');
            xhr.send(JSON.stringify({'session_id': session_id}));
            xhr.onload = async () => {
                console.log(xhr);
                localStorage.removeItem('session_id', session_id);
            }
            this.env.router.navigate({ to: 'home' });
        }

    _loginChanged (ev) {
        this.valid=ev.valid
    }
    session_val (ev){
        this.valid=ev.valid
    }

}