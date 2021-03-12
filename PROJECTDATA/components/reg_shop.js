const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { whenReady } = owl.utils;
const { useRef, useState, useDispatch, useStore } = owl.hooks;


const Reg_shop_TEMPLATE = xml /* xml */
`<div class="container">
	
</div>`;
	
export class Reg_shop extends Component{
	static template = Reg_shop_TEMPLATE;
}
