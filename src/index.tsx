import * as React from "react";
import { render } from "react-dom";

import App from "./App";
import AppOld from "./AppOld";

var app = document.createElement("div");
app.id = "app";
document.body.appendChild(app);

var appOld = document.createElement("div");
appOld.id = "appOld";
document.body.appendChild(appOld);

render(<App />, app);

// render(<AppOld />, appOld);
