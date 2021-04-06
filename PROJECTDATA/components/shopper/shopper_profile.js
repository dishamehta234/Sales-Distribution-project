const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { whenReady } = owl.utils;
const { useRef, useState, useDispatch, useStore } = owl.hooks;

const SHOPPER_PROFILE_TEMPLATE = xml/* xml */ `
<div class="d-flex justify-content-center mt-5">
	<div class="card text-center" style="width:35em;">
		<div class="card-header">
			SHOPPER Profile
		</div>
		<div class="card-body">
			<table style="width:100%">
				<t t-foreach="state.data" t-as="i">
					<tr>
						<th>Id:</th>
						<td><t t-esc="i.id"/></td>
					</tr>
					<tr>
						<th>Name:</th>
						<td><t t-esc="i.name"/></td>
					</tr>
					<tr>
						<th>Mobile:</th>
						<td><t t-esc="i.mobile_no"/></td>
					</tr>
					
					<tr>
						<th>Email:</th>
						<td><t t-esc="i.email"/></td>
					</tr>
					<tr>
						<th>Address:</th>
						<td><t t-esc="i.address"/></td>
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

export class shopper_profile extends Component{
    static template = SHOPPER_PROFILE_TEMPLATE;

    constructor() {
        super(...arguments);
        this.env.bus.on('shopper_profile', this, this.shopper_profile);
        this.state = useState({
            data: [],
        });

    }

    shopper_profile (ev) {
        this.state.data = ev.valid
    }
    loginhome(){
        this.env.router.navigate({ to: 'loginhome'});
    }
}