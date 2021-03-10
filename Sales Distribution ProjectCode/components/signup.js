const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { whenReady } = owl.utils;
const { useRef, useState, useDispatch, useStore } = owl.hooks;


const SIGNUP_TEMPLATE = xml/* xml */ `
<div class="container">
    <div class="d-flex justify-content-center h-100">
        <div class="card">
            <div class="card-header">
                <h3 align="center">Sign Up</h3>
            </div>
            <div class="card-body">
                <form action="/signup" t-on-submit.prevent="_onSubmitForm">
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-envelope-square"></i></span>
                        </div>
                        <input type="text" class="form-control"  name="email" placeholder="Email" id="email"/>
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-mobile-alt"></i></span>
                        </div>
                        <input type="text" class="form-control" name="mobilenum" placeholder="Mobile Number" id="mobileno"/>
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-key"></i></span>
                        </div>
                        <input type="password" t-model="state.pwd" t-on-keyup="_onKeyUpPwd" class="form-control" name="password" placeholder="password" id="pass"/>
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-key"></i></span>
                        </div>
                        <input type="password" t-model="state.repwd" t-on-keyup="_onKeyUpRePwd" class="form-control" name="confpassword" placeholder="Confirm password" id="confpass"/>
                    </div>
                    <div>
                        <h4>Password Does not match</h4>
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

    constructor() {
        super(...arguments);
        this.state = useState({
            pwd: "",
            repwd: "",
            pwmatch: undefined,
        });
    }
    _onSubmitForm(ev){
        debugger
        const xhr = new window.XMLHttpRequest();
        xhr.open('POST', '/do_signup');
        const formData = new FormData(ev.currentTarget);
        xhr.send(JSON.stringify(Object.fromEntries(formData.entries())));
        xhr.onload = async () => {
            if (xhr.status === 200) {
                this.env.router.navigate({to: 'signin'});
            }
        };
    }
    _checkPwd() {
            if (!this.state.pwd || !this.state.repwd) {
                return;
            }
            if (this.state.pwd === this.state.repwd) {
                this.state.pwmatch = true;
            } else {
                this.state.pwmatch = false;
            }
        }

        _onKeyUpRePwd(ev) {
            this._checkPwd();
        }

        _onKeyUpPwd(ev) {
            this._checkPwd();
        }

    sign_up_function(){
        var email ,m_no,pswd,crfpswd;
        email = document.getElementById("email").value;
        m_no = document.getElementById("mobile").value;
        pswd = document.getElementById("pass").value;
        crfpswd = document.getElementById("confpass").value;

        if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(formdata.email.value) && /^\d{10}$/)
        {
                document.getElementById("error").value="Valid details";
        }   
        else{
                document.getElementById("error").value="InValid details";
        }       
    }
}