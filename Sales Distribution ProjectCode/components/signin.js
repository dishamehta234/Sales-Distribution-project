const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { RouteComponent } = owl.router;
const { whenReady } = owl.utils;
const { useRef, useDispatch, useState, useStore } = owl.hooks;
const {qweb} = owl;
const { EventBus } = owl.core;

const SIGNIN_TEMPLATE =xml /* xml */
  `<div>
    <div class="container">
      <div class="d-flex justify-content-center h-100">
        <div class="card">
          <div class="card-header">
            <h3 align="center">Sign In</h3>
          </div>
        <div class="card-body">
        <form action="#" t-on-submit.prevent="OnLoginsubmit">
          <div class="input-group form-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fas fa-user"></i>
              </span>
            </div>
            <input type="text" class="form-control" placeholder="username" name="unm" />
          </div>
          <div class="input-group form-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fas fa-key"></i>
              </span>
            </div>
            <input type="password" class="form-control" placeholder="password" name="pass" />
          </div>
          <div class="row align-items-center remember">
            <input type="checkbox" />Remember Me
          </div>
          <div class="form-group">
            <input type="submit" value="Login" class="btn float-right login_btn" />
          </div>
        </form>
        </div>
          <div class="card-footer">
            <div class="d-flex justify-content-center links">
              Don't have an account?<a href="#">Sign Up</a>
            </div>
            <div class="d-flex justify-content-center">
              <a href="#">Forgot your password?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

export class Sign_In extends Component {
  static template = SIGNIN_TEMPLATE;
    constructor() {
        super(...arguments);
        this.state = useState({
            invalid: undefined,
        });
    }

    OnLoginsubmit(ev){
        const xhr = new window.XMLHttpRequest();
        xhr.open('POST', '/do_login');
        const formData = new FormData(ev.currentTarget);
        xhr.send(JSON.stringify(Object.fromEntries(formData.entries())));
        xhr.onload = async () => {

            const response = JSON.parse(xhr.response);
            if (response.email === false)
            {
                this.state.invalid = "email is wrong";
            }
            else if(response.pass === false) 
            {
                this.state.invalid = "password is wrong";
            }
            else(response.session_id) 
            {
                localStorage.setItem('session_id', response.session_id);
                this.env.bus.trigger('login_changed', {valid: true});
                this.env.router.navigate({to:'User_Form'});
            }
        };
    }
}
