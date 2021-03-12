const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { RouteComponent } = owl.router;
const { whenReady } = owl.utils;
const { useRef, useDispatch, useState, useStore } = owl.hooks;
const {qweb} = owl;

const FOOTER_TEMPLATE = xml/* xml */ `
<footer class="footer-box">
    <div class="container">
        <div class="row">
            <div class="col-md-12 white_fonts">
                <div class="row">
                    <div class="col-sm-6 col-md-6 col-lg-3">
                        <div class="full">
                           	<img class="img-responsive" src="images/logo1.png" alt="#" />
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-6 col-lg-3">
                        <div class="full">
                            <h3>Quick Links</h3>
                        </div>
                        <div class="full">
                            <ul class="menu_footer">
                                <li><a href="home.html"> Home</a></li>
                                <li><a href="aboutus.html"> About</a></li>
                                <li><a href="exchange.html"> Exchange</a></li>
                                <li><a href="services.html"> Services</a></li>
                                <li><a href="new.html"> New</a></li>
                                <li><a href="contact.html"> Contact</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-6 col-lg-3">
                        <div class="full">
                            <div class="footer_blog full white_fonts">
                            	<h3>Newsletter</h3>
                             	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                             	</p>
                             	<div class="newsletter_form">
                                	<form action="index.html">
                                   		<input type="email" placeholder="Your Email" name="#" required="" />
                                   		<button>Submit</button>
                                	</form>
                             	</div>
                       		</div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-6 col-lg-3">
                        <div class="full">
                            <div class="footer_blog full white_fonts">
                             	<h3>Contact us</h3>
                             	<ul class="full">
                               		<li><img src="images/i5.png" /><span>London 145<br/>United Kingdom</span></li>
                               		<li><img src="images/i6.png" /><span>demo@gmail.com</span></li>
                               		<li><img src="images/i7.png" /><span>+12586954775</span></li>
                             	</ul>
                         	</div>
                        </div>
                    </div>
				</div>
            </div>
		</div>
    </div>
    <div class="footer_bottom">
    	<div class="container">
        	<div class="row">
            	<div class="col-12">
                	<p class="crp">Copyrights 2021 Odoo India</p>
            	</div>
        	</div>
    	</div>
	</div>
	<a href="#" id="scroll-to-top" class="hvr-radial-out"><i class="fa fa-angle-up"></i>
	</a>
</footer>`;
export class Footer extends Component{
  static template = FOOTER_TEMPLATE;
}