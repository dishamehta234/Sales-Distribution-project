const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { whenReady } = owl.utils;
const { useRef, useState, useDispatch, useStore } = owl.hooks;

const ORDER_LIST_TEMPLATE = xml/* xml */ `
<div class="container">  
    <div class="mt-5 mb-5">
        <h1>List of Available products </h1> 
    </div>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th>product id</th>
                    <th>product name</th>
                    <th>price</th>
                </tr>
            </thead>
            <tbody>
                <t t-foreach="state.data" t-as="i">
                    <tr>
                        <td><t t-esc="i.p_id"/></td>
                        <td><t t-esc="i.p_name"/></td>
                        <td><t t-esc="i.p_price"/></td>
                        <td><button type="submit" class="btn btn-primary" t-att-id="i.p_id" t-on-click="order">Order</button></td>
                    </tr>
                </t>
            </tbody>
        </table>
    </div>
    <div align="right">
        <button class="btn btn-primary mr-2" href="#" t-on-click="loginhome()">Back</button>
    </div>
</div>`;

export class  product_list extends Component{
    static template = ORDER_LIST_TEMPLATE;

    constructor() {
        super(...arguments);
        this.env.bus.on('product_list', this, this.product_list);
        this.state = useState({
            data: [],
        });
    }

    product_list (ev) {
        this.valid=ev.valid
        this.state.data = this.valid
    }

    view_product_detail(ev){
        const product_id = ev.target.id;
        console.log(product_id);
        const xhr = new window.XMLHttpRequest();
            xhr.open('POST', '/view_product_detail');
            xhr.send(JSON.stringify({'p_id': product_id}));
            xhr.onload = async () => {
                const response = JSON.parse(xhr.response);
                this.env.bus.trigger('view_product_detail', {valid: response.view_product_detail});
            }
        this.env.router.navigate({ to: 'view_product_detail' });

    }

    async order(ev) {
        const product_id = ev.target.id;
        const xhr = new window.XMLHttpRequest();
    
    }


    loginhome(){
        this.env.router.navigate({ to: 'loginhome'});
    }
}
