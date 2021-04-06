const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { whenReady } = owl.utils;
const { useRef, useState, useDispatch, useStore } = owl.hooks;

const SHOP_PROFILE_TEMPLATE = xml/* xml */ `
<div class="d-flex justify-content-center mt-5">
	<div class="card text-center" style="width:35em;">
		<div class="card-header">
			Shop  Profile
		</div>
		<div class="card-body">
			<table style="width:100%">
			<tr>
						<th>Id:</th>
						<th>User ID:</th>
						<th>Name:</th>
						<th>Address:</th>
						<th>Monthly Target:</th>
						<th>Zone :</th>
						
					</tr>
				<t t-foreach="state.data" t-as="i">
					
					<tr>
						<td><t t-esc="i.shop_id"/></td>
						<td><t t-esc="i.id"/></td>
						<td><t t-esc="i.s_name"/></td>
						<td><t t-esc="i.s_address"/></td>
						<td><t t-esc="i.s_target_mthly"/></td>
						<td><t t-esc="i.zone_name"/></td>
					</tr>
				</t>
			</table>
		</div>
		<div align="right">
        	<button class="btn btn-primary mr-2" href="#" t-on-click="loginhome()">Back</button>
    	</div>
		<div class="card-footer text-muted">
		</div>
	</div>
</div>`;

export class shop_profile extends Component{
    static template = SHOP_PROFILE_TEMPLATE;

    constructor() {
        super(...arguments);
        this.env.bus.on('shop', this, this.shop);
        this.state = useState({
            data: [],
        });

    }

    shop (ev) {
        this.state.data = ev.valid
    }
    loginhome(){
        this.env.router.navigate({ to: 'loginhome'});
    }
}