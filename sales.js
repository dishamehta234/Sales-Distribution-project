/*(function () {
  console.log("Sales Distribution System", owl.__info__.version);
})();*/
const { Component, Store, mount, qweb} = owl;
const { xml } = owl.tags;
const { whenReady } = owl.utils;
const { useRef, useDispatch, useState, useStore } = owl.hooks;

const SALES_TEMPLATE = xml/* xml */ `
    	<div>
			<header>
		  	<nav class="navbar navbar-dark bg-primary fixed-top">
		  			<p class="text-left text-uppercase font-italic text-white">
		  				<h2>Sales Distribution</h2>
		  			</p>
		  		<form class="form-inline">
		    		<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
		    		<button class="btn btn-outline-primary bg-light my-2 my-sm-0" type="submit">Search</button>
		  		</form>
			</nav>
		</header>
		<footer>

		</footer>
		</div>`;

// Owl Components
export class sales extends Component {
  static template = SALES_TEMPLATE;
}
const SIGNUP_TEMPLATE = xml/* xml */ `
    	<div>
			<!-- signup form -->
			<form class="form-signin">
		      <img class="mb-4" src="../logo.png" alt="logo" width="72" height="72" />
		      <h1 class="h3 mb-3 font-weight-normal">Sign Up</h1>
		      <label for="Email" class="sr-only">Email ID</label>
		      <input type="email" id="Email" class="form-control" placeholder="EmailId" required="" autofocus="" />

		      <label for="mno" class="sr-only">Mobile Number</label>
		      <input type="number" id="mno" class="form-control" placeholder="Mobile Number" required="" autofocus="" />

		      <label for="pass" class="sr-only">Password</label>
		      <input type="password" id="pass" class="form-control" placeholder="Password" required="" />

		      <label for="CnfPassword" class="sr-only">Conform Password</label>
		      <input type="password" id="CnfPassword" class="form-control" placeholder="Conform Password" required="" />

		      <div class="checkbox mb-3">
		        <label>
		          <input type="checkbox" value="remember-me" /> Remember me
		        </label>
		      </div>
		      <button class="btn btn-lg btn-primary btn-block" type="submit" t-on-click="sign_up_function">Sign Up</button>
		      <span>
				<t t-as="error"/>
			  </span>
		    </form>
		</div>`;

class signup extends Component{
	static template = SIGNUP_TEMPLATE;

	sign_up_function(){
		var email ,m_no,pswd,crfpswd;
		email = document.getElementById("Email").value;
		m_no = document.getElementById("mno").value;
		pswd = document.getElementById("pass").value;
		crfpswd = document.getElementById("CnfPassword").value;

		if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(formdata.email.value) && /^\d{10}$/)
        {
        		document.getElementById("error").value="Valid details";
        }	
        else{
        		document.getElementById("error").value="InValid details";
        }		
	}
}

const ROUTES = [
  { name: "signup", path: "/signup", component: signup }
];
async function protectRoute({ env, to }) {
  if (!env.session.authUser) {
    env.session.setNextRoute(to.name);
    return { to: "signup" };
  }
  return true;
}
async function makeEnvironment() {
    const env = { qweb };
    env.router = new owl.router.Router(env, ROUTES);
    await env.router.start();
    return env;
}

sales.env = makeEnvironment();
// Setup code
function setup() {	
		const app = new sales();
		app.mount(document.body);
}

whenReady(setup);