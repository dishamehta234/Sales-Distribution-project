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
                    <input type="radio" name="role" id="shrole" value="Shopper" />Shopper
                    <input type="radio" name="role" id="sprole" value="Sales Person" />Sales Person
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
}
