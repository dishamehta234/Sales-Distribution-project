const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { whenReady } = owl.utils;
const { useRef, useState, useDispatch, useStore } = owl.hooks;


const SIGNUP_TEMPLATE =xml /* xml */`
<div>
	<!-- signin form -->
	<form class="form-signin">
      <img class="mb-4" src="../logo.png" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="Email" class="sr-only">Email ID / Mobile Number</label>
      <input type="text" id="Email" class="form-control" placeholder="EmailId / MobileNumber" required="" autofocus="">
      
      <label for="Password" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
      
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>

</div>`;