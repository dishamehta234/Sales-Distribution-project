const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { whenReady } = owl.utils;
const { useRef, useState, useDispatch, useStore } = owl.hooks;


const User_Form_Template =xml /* xml */`
<div>
	<!-- signup form -->
	<div class="form-group">
		<label for="email">Email ID</label>
			<input type="text" class="form-control" id="email" />
			<h1>Welcome to Login</h1>
	</div>

</div>`;
export class User_Form extends Component{
 	static template = User_Form_Template;
}