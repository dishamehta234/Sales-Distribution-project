const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { whenReady } = owl.utils;
const { useRef, useState, useDispatch, useStore } = owl.hooks;

const ORDER_TEMPLATE = xml/* xml */ `
<div class="container">
    <div class="d-flex justify-content-center h-100">
        <div class="card">
            <div class="card-header">
                <h3 align="center">Order Form</h3>
            </div>
            <div class="card-body">
                <form action="/signup" t-on-submit.prevent="_onSubmitOrder">
                    <h3 align="center">Product Information</h3> 
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-envelope-square"></i></span>
                        </div>
                        <input type="text" class="form-control" name="pid" placeholder="Product Id" id="proid"/>
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-envelope-square"></i></span>
                        </div>
                        <input type="text" class="form-control" name="qty" placeholder="Quantity" id="qty"/>
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-mobile-alt"></i></span>
                        </div>
                        <input type="text" class="form-control" name="price" placeholder="Price" id="price"/>
                    </div>
                    <div class="form-group">
                        <input type="submit" value="Submit" class="btn float-right login_btn" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>`;

export class Order_sales extends Component{
    static template = ORDER_TEMPLATE;

    constructor() {
        super(...arguments);
        this.state = useState({
            invalid: undefined,
        });
    }

    _onSubmitOrder(ev){
        debugger
        const xhr = new window.XMLHttpRequest();
        xhr.open('POST', '/do_order');
        const formData = new FormData(ev.currentTarget);
        xhr.send(JSON.stringify(Object.fromEntries(formData.entries())));
        xhr.onload = async () => {
            if (xhr.status === 200) {
                alert('Products inserted.......');            }
        };
    }
}