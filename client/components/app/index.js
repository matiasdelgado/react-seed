import { inject, observer } from "mobx-react";
import App from './App';

export default inject('app')(observer(App));
