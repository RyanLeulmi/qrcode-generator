import React from "react";
import { hydrate } from "react-dom";
import Router from "./router";

console.log("Hydrating");
hydrate(<Router />, document.getElementById("app"));
