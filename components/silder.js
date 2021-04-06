const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { RouteComponent } = owl.router;
const { whenReady } = owl.utils;
const { useRef, useDispatch, useState, useStore } = owl.hooks;
const {qweb} = owl;

const SILDER_TEMPLATE = xml/* xml */ `
<div>
	<div class="ulockd-home-slider">
	    <div class="container-fluid">
	        <div class="row">
	            <div class="pogoSlider" id="js-main-slider">
	                <div class="pogoSlider-slide" style="background-image:url(images/ss1.png);">
	                </div>
	                <div class="pogoSlider-slide" style="background-image:url(images/ss4.jpeg);">
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
	                   	<img src="images/b4.png" alt="#" />
	                </div>
	            </div>
	            <div class="col-md-6 layout_padding">
	                <div class="full paddding_left_15">
	                    <div class="heading_main text_align_left">
							<h2>
								<span class="theme_color">Welcome To Distribution One </span>
							</h2>	
	                    </div>
	                </div>
	                <div class="full paddding_left_15">
	                    <p>"The secret of getting ahead is getting started." – Mark Twain</p>
	                </div>
	                <div class="full paddding_left_15">
	                    <a class="main_bt" href="#">About more ></a>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
	<div class="section layout_padding">
	    <div class="container-fluid">
	        <div class="row">
	            <div class="col-md-12">
	                <div class="full">
	                    <div class="heading_main text_align_center">
	                        <h2><span class="theme_color">Trending Products</span></h2>    
	                    </div>
	                </div>
	            </div>
	        </div>
	        <div class="row">
	            <div class="col-md-3 col-sm-6 col-xs-12">
	               	<div class="full services_blog">
	                    <img class="img-responsive" src="images/g1.jpeg" alt="#" />
	                    <h4>Grocery products</h4>
	                </div>
	            </div>
	            <div class="col-md-3 col-sm-6 col-xs-12">
	                <div class="full services_blog">
	                    <img class="img-responsive" src="images/g2.jpeg" alt="#" />
	                    <h4>Personal Care</h4>
	                </div>
	            </div>
	            <div class="col-md-3 col-sm-6 col-xs-12">
	                <div class="full services_blog">
	                    <img class="img-responsive" src="images/g3.jpeg" alt="#" />
	                    <h4>Food Items</h4>
	                </div>
	            </div>
	            <div class="col-md-3 col-sm-6 col-xs-12">
	                <div class="full services_blog">
	                   	<img class="img-responsive" src="images/g4.jpeg" alt="#" />
	                   	<h4>Health Care</h4>
	                </div>
	            </div>
	        </div>
	        <div class="row margin-top_30">
	            <div class="col-sm-12">
	                <div class="full">
	                    <div class="center">
	                        <a class="main_bt" href="#">About more ></a>
	                    </div>
	                </div>
	            </div>
	       	</div>
	    </div>
	</div>
	<div class="section layout_padding">
	    <div class="container-fluid">
	        <div class="row">
	            <div class="col-md-12">
	                <div class="full">
	                    <div class="heading_main text_align_center">
	                        <h2><span class="theme_color">Latest Products</span></h2>    
	                    </div>
	                </div>
	            </div>
	        </div>
	        <div class="row">
	            <div class="col-md-3 col-sm-6 col-xs-12">
	               	<div class="full services_blog">
	                    <img class="img-responsive" src="images/g1.jpeg" alt="#" />
	                    <h4>Grocery products</h4>
	                </div>
	            </div>
	            <div class="col-md-3 col-sm-6 col-xs-12">
	                <div class="full services_blog">
	                    <img class="img-responsive" src="images/g2.jpeg" alt="#" />
	                    <h4>Personal Care</h4>
	                </div>
	            </div>
	            <div class="col-md-3 col-sm-6 col-xs-12">
	                <div class="full services_blog">
	                    <img class="img-responsive" src="images/g3.jpeg" alt="#" />
	                    <h4>Food Items</h4>
	                </div>
	            </div>
	            <div class="col-md-3 col-sm-6 col-xs-12">
	                <div class="full services_blog">
	                   	<img class="img-responsive" src="images/g4.jpeg" alt="#" />
	                   	<h4>Health Care</h4>
	                </div>
	            </div>
	        </div>
	        <div class="row margin-top_30">
	            <div class="col-sm-12">
	                <div class="full">
	                    <div class="center">
	                        <a class="main_bt" href="#">About more ></a>
	                    </div>
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
	                    	<h2>About Offers</h2>    
	                    </div>
	                </div>
	                <div class="full paddding_left_15">
	                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
	                    </p>
	                </div>
	                <div class="full paddding_left_15">
	                    <a class="main_bt" href="#">Read More ></a>
	                </div>
	            </div>
	            <div class="col-md-6">
	                <div class="full text_align_right_img">
	                    <img src="images/g5.jpeg" alt="#" height="50" width="50" />
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
	<div class="section layout_padding padding_top_0">
	    <div class="container">
	        <div class="row">
	            <div class="col-md-12">
	                <div class="full">
	                    <div class="heading_main text_align_center">
	                        <h2><span class="theme_color"></span>New Arrivals</h2>    
	                    </div>
	                </div>
	            </div>
	        </div>
	        <div class="row">
	            <div class="col-md-4 col-sm-6 col-xs-12">
	                <div class="full news_blog">
	                    <img class="img-responsive" src="images/g1.jpeg" alt="#" />
	                    <div class="overlay">
	                    	<a class="main_bt transparent" href="#">View</a>
	                    </div>
	                    <div class="blog_details">
	                        <h3>Kitchen Needs</h3>
	                        <p>Kitchen Needs</p>
	                    </div>
	                </div>
	            </div>
	            <div class="col-md-4 col-sm-6 col-xs-12">
	                <div class="full news_blog">
	                    <img class="img-responsive" src="images/images1.jpeg" alt="#" />
	                   	<div class="overlay">
	                    	<a class="main_bt transparent" href="#">View</a>
	                    </div>
	                    <div class="blog_details">
	                        <h3>Kitchen Jam</h3>
	                        <p>pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
	                        </p>
	                    </div>
	                </div>
	            </div>
	            <div class="col-md-4 col-sm-6 col-xs-12">
	                <div class="full news_blog">
	                    <img class="img-responsive" src="images/images1.jpeg" alt="#"/>
	                    <div class="overlay">
	                    	<a class="main_bt transparent" href="#">View</a>
	                    </div>
	                    <div class="blog_details">
	                        <h3>Kithen Jam</h3>
	                        <p>pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
	                        </p>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
	<div class="section layout_padding padding_top_0">
	    <div class="container">
	        <div class="row">
	            <div class="col-md-12">
	                <div class="full">
	                    <div class="heading_main text_align_center">
	                        <h2><span class="theme_color"></span>Contact</h2>    
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
	<div class="section contact_form">
	    <div class="container">
	        <div class="row">
	            <div class="col-lg-6 col-sm-12 offset-lg-3">
	                <div class="full">
	                    <form class="contact_form_inner" action="#">
	                        <fieldset>
	                            <div class="field">
	                                <input type="text" name="name" placeholder="Your name" />
	                            </div>
	                            <div class="field">
	                               	<input type="email" name="email" placeholder="Email" />
	                            </div>
	                            <div class="field">
	                                <input type="text" name="phone_no" placeholder="Phone number" />
	                            </div>
	                            <div class="field">
	                                <textarea placeholder="Message"></textarea>
	                            </div>
	                            <div class="field center">
	                                <button>SEND</button>
	                            </div>
	                        </fieldset>
	                    </form>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
</div>`;

export class Silder extends Component{
	  static template = SILDER_TEMPLATE;
}