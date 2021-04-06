const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { whenReady } = owl.utils;
const { useRef, useState, useDispatch, useStore } = owl.hooks;

const PAYMENT_LIST_TEMPLATE = xml/* xml */ `
<div class="container">  
    <div class="mt-5 mb-5">
        <h1>payment list </h1> 
    </div>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th>payment id</th>
                    <th>shop id</th>
                    <th>date</th>
                    <th>Time</th>
                    <th>amount</th>
                    <th>payment method</th>
                    <th>remark</th>
                    </tr>
            </thead>
            <tbody>
                <t t-foreach="state.data" t-as="i">
                    <tr>
                        <td><t t-esc="i.p_id"/></td>
                        <td><t t-esc="i.shop_id"/></td>
                        <td>
                            <t t-esc="i.date_pymt_day" />/
                            <t t-esc="i.date_pymt_month" />/
                            <t t-esc="i.date_pymt_year" />
                        </td>
                        <td>
                                <t t-esc="i.date_pymt_hour" />:
                                <t t-esc="i.date_pymt_minute" />
                        </td>
                        <td><t t-esc="i.amount"/></td>
                        <td><t t-esc="i.payment_mthd"/></td>
                        <td><t t-esc="i.remark"/></td>
                    </tr>
                </t>
            </tbody>
        </table>
    </div>
    <div align="right">
        <button class="btn btn-primary mr-2" href="#" t-on-click="payment()">Back</button>
    </div>
</div>`;

export class  payment_list extends Component{
    static template = PAYMENT_LIST_TEMPLATE;

    constructor() {
        super(...arguments);
        this.env.bus.on('payment_list', this, this.payment_list);
        this.state = useState({
            data: [],
        });
    }

    payment_list (ev) {debugger
        this.valid=ev.valid
        this.state.data = this.valid
    }
    payment(){
        this.env.router.navigate({ to: 'payment'});
    }
}