const { Component, mount, useState } = owl;
const { xml } = owl.tags;

const Order_Template = xml`<div class="container">  
                    <div class="mt-5 mb-5">
                       <h1>Our Order list </h1> 
                    </div>
                    <div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Product Id</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                    <t t-foreach="state.data" t-as="i">
                                        <tr>
                                            <td><t t-esc="i.engineer_id"/></td>
                                            <td><t t-esc="i.email"/></td>
                                            <td><t t-esc="i.mobile_no"/></td>
                                            <td><t t-esc="i.specialist"/></td>
                                            <td><t t-esc="i.experience"/></td>
                                            <td><button type="submit" class="btn btn-danger" t-att-id="i.engineer_id" t-on-click="book_engineer">Book</button></td>
                                            <td><button type="submit" class="btn btn-success" t-att-id="i.engineer_id" t-on-click="view_engineer_detail">View</button></td>
                                        </tr>
                                    </t>
                            </tbody>
                        
                        </table>
                    </div>
                    
        </div>`;
export class order_List extends Component{
	 constructor() {
        super(...arguments);
        this.env.bus.on('client_Engineer_list', this, this.client_Engineer_list);
        this.state = useState({
            data: [],
        });

    }

    client_Engineer_list (ev) {
        this.valid=ev.valid
        this.state.data = this.valid

    }
}