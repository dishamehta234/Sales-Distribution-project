const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { whenReady } = owl.utils;
const { useRef, useState, useDispatch, useStore } = owl.hooks;

const DAY_LIST_TEMPLATE = xml/* xml */ `
<div class="container">  
    <div class="mt-5 mb-5">
        <h1>Day list </h1> 
    </div>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th>Visiting id</th>
                    <th>partner id</th>
                    <th>Zone Name</th>
                    <th>Day</th>
                </tr>
            </thead>
            <tbody>
                <t t-foreach="state.data" t-as="i">
                    <tr>
                        <td><t t-esc="i.v_id"/></td>
                        <td><t t-esc="i.id"/></td>
                        <td><t t-esc="i.zone_name"/></td>
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

export class Day_list extends Component{
    static template = DAY_LIST_TEMPLATE;

    constructor() {
        super(...arguments);
        this.env.bus.on('day_list', this, this.day_list);
        this.state = useState({
            data: [],
        });

    }

    day_list (ev) {debugger
        this.valid=ev.valid
        this.state.data = this.valid

    }
    loginhome(){
        this.env.router.navigate({ to: 'loginhome'});
    }
}