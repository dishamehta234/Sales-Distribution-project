const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { whenReady } = owl.utils;
const { useRef, useState, useDispatch, useStore } = owl.hooks;


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
function setup() {
		const app = new signup();
		 app.mount(document.body);
	}

	whenReady(setup);