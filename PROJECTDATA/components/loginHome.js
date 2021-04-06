const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { RouteComponent } = owl.router;
const { whenReady } = owl.utils;
const { useRef, useDispatch, useState, useStore } = owl.hooks;
const {qweb} = owl;
const { EventBus } = owl.core;

const LOGINHOME_TEMPLATE =xml /* xml */
  `<div>
    <p><h1>Welcome to home page after Login</h1></p>
  </div>`;

export class Login_Home extends Component {
  static template = LOGINHOME_TEMPLATE;
    constructor() {
      super(...arguments);
      this.state = useState({
      invalid: undefined,
    });
  }
}
