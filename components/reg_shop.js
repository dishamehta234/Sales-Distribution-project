const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { whenReady } = owl.utils;
const { useRef, useState, useDispatch, useStore } = owl.hooks;


const SIGNUP_TEMPLATE =xml /* xml */`
<div>
	<!-- signup form -->
	<div class="form-group">
		<label for="email">Email ID</label>
			<input type="text" class="form-control" id="email" />
	</div>

</div>`;