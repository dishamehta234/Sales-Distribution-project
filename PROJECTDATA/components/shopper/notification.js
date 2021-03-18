const { Component, Store, mount } = owl;
const { xml } = owl.tags;

const NOTIFICATION_TEMPLATE = xml/* xml */ `
<div>
    
</div>`;

export class Notification extends Component{
	static template = NOTIFICATION_TEMPLATE;
}
