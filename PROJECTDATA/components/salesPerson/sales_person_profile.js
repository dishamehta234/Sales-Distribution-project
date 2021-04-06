const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { whenReady } = owl.utils;
const { useRef, useState, useDispatch, useStore } = owl.hooks;

const SALES_PERSON_PROFILE_TEMPLATE = xml/* xml */ `
<div class="d-flex justify-content-center mt-5">
	<div class="card text-center" style="width:35em;">
		<div class="card-header">
			Sales Person Profile
		</div>
		<div class="card-body">
			<table style="width:100%">
				<t t-foreach="state.data" t-as="i">
					<tr>
						<th>Id:</th>
						<td><t t-esc="i.id"/></td>
					</tr>
					<tr>
						<th>Mobile:</th>
						<td><t t-esc="i.mobile_no"/></td>
					</tr>
					<tr>
						<th>Email:</th>
						<td><t t-esc="i.email"/></td>
					</tr>
				</t>
			</table>
		</div>
		<div class="card-footer text-muted">
		</div>
	</div>
</div>`;

export class sales_person_profile extends Component{
    static template = SALES_PERSON_PROFILE_TEMPLATE;

    constructor() {
        super(...arguments);
        this.env.bus.on('sales_profile', this, this.sales_profile);
        this.state = useState({
            data: [],
        });

    }

    sales_profile (ev) {
        this.state.data = ev.valid
    }
}