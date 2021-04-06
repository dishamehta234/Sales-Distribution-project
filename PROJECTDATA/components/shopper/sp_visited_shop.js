const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { whenReady } = owl.utils;
const { useRef, useState, useDispatch, useStore } = owl.hooks;

const SP_VISITED_TEMPLATE = xml/* xml */`
<div class="container">  
    <div class="mt-5 mb-5">
        <h1>List of Visited Shop</h1> 
    </div>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th>Sales Person ID</th>
                    <th>Sales Person Name</th>
                    <th>Shop Name</th>
                    <th>Shop Address</th>
                    <th>Day</th>
                </tr>
            </thead>
            <tbody>
                <t t-foreach="state.data" t-as="i">
                    <tr>
                        <td><t t-esc="i.id"/></td>
                        <td><t t-esc="i.name"/></td>
                        <td><t t-esc="i.s_name"/></td>
                        <td><t t-esc="i.s_address"/></td>
                        <td><t t-esc="i.day"/></td>
                    </tr>
                </t>
            </tbody>
        </table>
    </div>
    <div align="right">
        <button class="btn btn-primary mr-2" href="#" t-on-click="loginhome()">Back</button>
    </div>
</div>`;

export class sp_visited extends Component{
    static template = SP_VISITED_TEMPLATE;

    constructor() {
        super(...arguments);
        this.env.bus.on('sp_shop_visited', this, this.sp_shop_visited);
        this.state = useState({
            data: [],
        });

    }

    sp_shop_visited (ev) {
        this.valid=ev.valid
        this.state.data = this.valid

    }

    loginhome(){
        this.env.router.navigate({ to: 'home'});
    }
}