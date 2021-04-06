const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { whenReady } = owl.utils;
const { useRef, useState, useDispatch, useStore } = owl.hooks;


const SIGNUP_TEMPLATE = xml/* xml */ `
    <div>
    
	</div>`;

export class Home extends Component{
	static template = SIGNUP_TEMPLATE;

	
}