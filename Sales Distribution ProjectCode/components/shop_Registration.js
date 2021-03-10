const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { whenReady } = owl.utils;
const { useRef, useState, useDispatch, useStore } = owl.hooks;


const SHOPREG_TEMPLATE = xml/* xml */ `
<div class="container">
    <div class="d-flex justify-content-center h-100">
        <div class="card">
            <div class="card-header">
                <h3 align="center">Sign Up</h3>
            </div>
            <div class="card-body">
                <form>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-envelope-square"></i></span>
                        </div>
                        <input type="text" class="form-control" placeholder="Email" />
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-mobile-alt"></i></span>
                        </div>
                        <input type="text" class="form-control" placeholder="Mobile Number" />
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-key"></i></span>
                        </div>
                        <input type="password" class="form-control" placeholder="password" />
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-key"></i></span>
                        </div>
                        <input type="password" class="form-control" placeholder="Confirm password" />
                    </div>
         			<div class="form-group">
                        <input type="submit" value="Register" class="btn float-right login_btn" />
                    </div>
                </form> 
            </div>
            <div class="card-footer">
                <div class="d-flex justify-content-center links">
                    Alrady have an account?<a href="#">Sign In</a>
                </div>
                <div class="d-flex justify-content-center">
                    <a href="#">Forgot your password?</a>
                </div>
            </div>
        </div>
    </div>
</div>`;

export class Sign_Up extends Component{
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