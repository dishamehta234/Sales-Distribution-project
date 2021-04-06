const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { whenReady } = owl.utils;
const { useRef, useState, useDispatch, useStore } = owl.hooks;

const PAYMENT_TEMPLATE = xml/* xml */ `
<div class="container">
    <div class="d-flex justify-content-center h-100">
        <div class="card">
            <div class="card-header">
                <h3 align="center">Payment</h3>
            </div>
            <div class="card-body">
                <form action="/payment">
                    <h3 align="center">Payment</h3>
                    <div class="d-flex justify-content-center links">
                        see previous payments <a href="#" t-on-click="payment_list">See List</a>
                    </div>
                    <p>Choose any Payment Method Either Cash or Cheque</p>
                    <div class="panel-group">
                        <input type="radio" id="cash" name="payment" value="ByCash" t-on-click="show1()"/>By Cash
                        <input type="radio" id="cheque" name="payment" value="ByCheque" t-on-click="show2()"/>By Cheque 
                    </div>
                    <div class="hideRadio" id="paycash">
                        <h4><b>Payment By Cash</b></h4>
                        <div class="form-group">
                            <label for="cars">Enter Amount :</label>
                            <input type="text" class="form-control" name="amount" placeholder="Enter Amount" id="Amount"/>  
                        </div>
                        <div class="form-group">
                            <input type="submit" value="Submit" class="btn float-right login_btn" />
                        </div>
                    </div>
                    <div class="hideRadio" id="paycheque">
                        <h4><b>Payment By Cheque</b></h4>
                        <div class="form-group">
                            <p><u>Fill Information</u></p>
                            <input type="text" name="cheque" placeholder="check Number" id="cqnum"/>
                        </div>
                        <div class="form-group">
                            <input type="text" name="bankname" placeholder="Bank Name" id="bank"/>
                        </div>
                        <div class="form-group">
                            <input type="text" name="amountcq" placeholder="Amount" id="amnt"/>  
                        </div>
                        <div class="form-group">
                            <input type="submit" value="Submit" class="btn float-right login_btn"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>`;

export class Payment extends Component{
    static template = PAYMENT_TEMPLATE;

    show1(){
        document.getElementById('paycash').style.display = 'block';
        document.getElementById('paycheque').style.display = 'none';
    }
    show2(){
        document.getElementById('paycheque').style.display = 'block';
        document.getElementById('paycash').style.display = 'none';

    }
    payment_list(ev){
                const xhr = new window.XMLHttpRequest();
                xhr.open('POST', '/previous_payment_list');
                xhr.send(JSON.stringify({'session_id': 'blank'}));
                xhr.onload = async () => {
                    const response = JSON.parse(xhr.response);
                    this.env.bus.trigger('payment_list', {valid: response.payment_list});
                }
                this.env.router.navigate({ to: 'payment_list' });
    }
}
