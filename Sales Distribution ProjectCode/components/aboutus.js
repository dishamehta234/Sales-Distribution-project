const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { RouteComponent } = owl.router;
const { whenReady } = owl.utils;
const { useRef, useDispatch, useState, useStore } = owl.hooks;
const {qweb} = owl;
import { Sign_Up } from "./signup.js";
import { Sign_In } from "./signin.js";
import { Reg_shop } from "./reg_shop.js";
import { Footer } from "./footer.js";
import { Home } from "./index.js";

const ABOUT_TEMPLATE = xml/* xml */ `
<div>
	<div class="section inner_page_banner">
	    <div class="container">
	        <div class="row">
	            <div class="col-md-12">
	                <div class="banner_title">
	                    <h3>About us</h3>
	                </div>
	            </div>
	       	</div>
	    </div>
	</div>
	<div class="section layout_padding about_bg">
	    <div class="container">
	        <div class="row">
	            <div class="col-md-6">
	                <div class="full paddding_left_15">
	                    <div class="heading_main text_align_left">
	                       	<h2>About</h2>    
	                    </div>
	                </div>
	                <div class="full paddding_left_15">
	                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
	                </div>
	                <div class="full paddding_left_15">
	                    <a class="main_bt" href="#">Read More ></a>
	                </div>
	            </div>
	            <div class="col-md-6">
	                <div class="full text_align_right_img">
	                    <img src="images/img3.png" alt="#" />
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
	<div class="section">
	    <div class="container">
	        <div class="row">
	            <div class="col-md-6">
	                <div class="full text_align_right_img">
	                    <img src="images/img1.png" alt="#" />
	                </div>
	            </div>
	            <div class="col-md-6 layout_padding">
	                <div class="full paddding_left_15">
	                    <div class="heading_main text_align_left">
							<h2><span class="theme_color">Welcome</span> To Exchange</h2>	
	                    </div>
	                </div>
	                <div class="full paddding_left_15">
	                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
	                </div>
	                <div class="full paddding_left_15">
	                    <a class="main_bt" href="#">About more ></a>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
	<div class="section white_fonts" style="background: #111;">
	    <div class="container">
	        <div class="row">
	            <div class="col-md-6" style="background: #fff;">
	                <div class="full text_align_right_img">
	                    <img src="images/img2.png" alt="#" />
	                </div>
	            </div>
	            <div class="col-md-6 layout_padding">
	                <div class="full paddding_left_15">
	                    <div class="heading_main text_align_left">
	                        <h2><span class="theme_color">Apply for</span> Exchange</h2>    
	                    </div>
	                </div>
	                <div class="full paddding_left_15">
	                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
	                </div>
	                <div class="full paddding_left_15">
	                    <a class="main_bt" href="#">Exchange ></a>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
</div>`;

	export class About_us extends Component{
	  static template = ABOUT_TEMPLATE;
	  _aboutUs()
	  {
	  	return this.env.router.navigate({ to: 'aboutus'});
	  }
	}