const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { whenReady } = owl.utils;
const { useRef, useState, useDispatch, useStore } = owl.hooks;

const ORDER_LIST_TEMPLATE = xml/* xml */ `
<div class="container">  
    <div class="mt-5 mb-5">
        <h1>List of New Order </h1> 
    </div>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th>order id</th>
                    <th>partner id</th>
                    <th>shop id</th>
                    <th>partner id</th>
                    <th>date of order</th>
                    <th>order status</th>
                    <th>payment status</th>
                </tr>
            </thead>
            <tbody>
                <t t-foreach="state.data" t-as="i">
                    <tr>
                        <td><t t-esc="i.ord_id"/></td>
                        <td><t t-esc="i.id"/></td>
                        <td><t t-esc="i.shop_id"/></td>
                        <td><t t-esc="i.p_id"/></td>
                        <td>
                            <t t-esc="i.date_order_day" />/
                            <t t-esc="i.date_order_month" />/
                            <t t-esc="i.date_order_year" />
                            <t t-esc="i.date_order_hour" />:
                            <t t-esc="i.date_order_minute" />
                        </td>
                        <td><t t-esc="i.ord_status"/></td>
                        <td><t t-esc="i.payment_status"/></td>
                    </tr>
                </t>
            </tbody>
        </table>
    </div>
    <div align="right">
        <button class="btn btn-primary mr-2" href="#" t-on-click="loginhome()">Back</button>
    </div>
</div>`;

export class  order_list extends Component{
    static template = ORDER_LIST_TEMPLATE;

    constructor() {
        super(...arguments);
        this.env.bus.on('order_list', this, this.order_list);
        this.state = useState({
            data: [],
        });
    }

    order_list (ev) {debugger
        this.state.data = this.valid
    }
    loginhome(){
        this.env.router.navigate({ to: 'loginhome'});
    }
}
