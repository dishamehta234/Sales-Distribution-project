const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { whenReady } = owl.utils;
const { useRef, useState, useDispatch, useStore } = owl.hooks;

const ORDER_LIST_TEMPLATE = xml/* xml */ `
<div class="container">  
    <div class="mt-5 mb-5">
        <h1>Shop's Total Order </h1> 
    </div>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th>Order id</th>
                    <th>User id</th>
                    <th>Shop id</th>
                    <th>Product id</th>
                    <th>Order Date</th>
                    <th>Order Status</th>
                    <th>Payment Status</th>
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

export class  shop_order_list extends Component{
    static template = ORDER_LIST_TEMPLATE;

    constructor() {
        super(...arguments);
        this.env.bus.on('s_order_list', this, this.s_order_list);
        this.state = useState({
            data: [],
        });
    }

    s_order_list (ev) {
        this.valid=ev.valid
        this.state.data = this.valid
    }
    loginhome(){
        this.env.router.navigate({ to: 'loginhome'});
    }
}
