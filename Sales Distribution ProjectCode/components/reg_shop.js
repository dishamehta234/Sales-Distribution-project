const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { whenReady } = owl.utils;
const { useRef, useState, useDispatch, useStore } = owl.hooks;


const Reg_shop_TEMPLATE = xml /* xml */
`<div class="container">
	
</div>`;
	
export class Reg_shop extends Component{
	static template = Reg_shop_TEMPLATE
	sign_up_function(){
		var email ,m_no,pswd,crfpswd;
		email = document.getElementById("Email").value;
		m_no = document.getElementById("mno").value;
		pswd = document.getElementById("pass").value;
		crfpswd = document.getElementById("CnfPassword").value;

		if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(formdata.email.value) && /^\d{10}$/)
        {
        		document.getElementById("error").value="Valid details";
        }	
        else{
        		document.getElementById("error").value="InValid details";
        }		
	}
}