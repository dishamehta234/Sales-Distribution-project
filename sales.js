/*(function () {
  console.log("Sales Distribution System", owl.__info__.version);
})();*/

const { Component, mount } = owl;
const { xml } = owl.tags;
const { whenReady } = owl.utils;

// Owl Components
class App extends Component {
  static template = xml`<body>
  	<div class="mobile_overlay"></div>
  	<div class="mobile_menu">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="bar_open">
                        <a href="#"><i class="fas fa-bars"></i></a>
                    </div>
                    <div class="mobile_wrapper">
                        <div class="bar_close">
                            <a href="#"><i class="fas fa-times"></i></a>
                        </div>
                        <div class="freeshipping">
                            <p>You can get Free Delivery By Shopping More Than Free</p>
                        </div>

                        <div class="header_social_icon text-center">
                            <ul>
                                <li class="social-icon">
                                    <a target="_blank" href="https://www.facebook.com/">
                                    	<em class="fab fa-facebook"></em>
                                    </a>
                                </li>
                                <li class="social-icon">
                                    <a target="_blank" href="https://whatsapp.com/"><em class="fab fa-whatsapp"></em></a>
                                </li>
                                <li class="social-icon">
                                    <a target="_blank" href="https://www.instagram.com/"><em class="fab fa-instagram"></em></a>
                                </li>
                                <li class="social-icon">
                                        <a target="_blank" href="https://twitter.com/"><em class="fab fa-twitter"></em></a>
                                </li>
                                <li class="social-icon">
                                        <a target="_blank" href="https://www.skype.com/"><em class="fab fa-skype"></em></a>
                                </li>
                            </ul>
                        </div>
                        <div class="header_call-support">
                            <p><a href="#">+91 56498778233</a> Customer Support</p>
                        </div>
                        <div id="menu" class="text-left ">
                            <ul class="header_main_menu">
                                <li class="header_submenu_item active">
                                    <a href="#">Home</a>
                                </li>

                                <li class="header_submenu_item">
                                    <a href="#"> Contact Us</a>
                                </li>

                                <li class="header_submenu_item">
                                    <a href="#"> Shop</a>
                                </li>

                                <li class="header_submenu_item"><span class="menu-expand"><i class="fa fa-angle-down"></i></span>
                                    <a href="#"> More</a>
                                    <ul class="sub-menu" style="display: none;">
                                        <li><a href="#">About Us</a></li>
                                        <li><a href="#">FAQ</a></li>

                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div class="offcanvas_footer">
                            <span><a href="#"><i class="fa fa-envelope"></i> Tiny Erp Odoo India</a></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
 </body>`;
}

// Setup code
function setup() {	
		const app = new App();
		app.mount(document.body);
}

whenReady(setup);