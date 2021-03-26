const { Component, useState, mount } = owl;
const { xml } = owl.tags;

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
              <t t-esc="state.invalid"/>
            </form>
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

    OnLoginsubmit(ev){alert("faf")
        const xhr = new window.XMLHttpRequest();
        xhr.open('POST', '/do_login');
        const formData = new FormData(ev.currentTarget);
        xhr.send(JSON.stringify(Object.fromEntries(formData.entries())));
        xhr.onload = async() => {
            const response = JSON.parse(xhr.response);
            console.log(response.role);
            if(response.role === "Shopper") 
            {
                document.cookie = `session_id = ${response.session_id}`;
                odoo.session_info={
                    user_id: response.user_id,
                    is_valid: response.is_valid,
                    session_id: response.session_id,
                    user_role: response.role
                }
                alert("Shopper Login")
                this.env.bus.trigger('login_changed');
                this.env.router.navigate({to:'loginhome'});
            }
            else if(response.role === "Sales Person") 
            {
                document.cookie = `session_id = ${response.session_id}`;
                odoo.session_info={
                    user_id: response.user_id,
                    is_valid: response.is_valid,
                    session_id: response.session_id,
                    user_role: response.role
                }
                alert("Sales Person Login")
                this.env.bus.trigger('login_changed');
                this.env.router.navigate({to:'loginhome'});
            }
        };
    }
}
