//= require rails-ujs
import "bootstrap/scss/bootstrap.scss"
import 'semantic-ui-css/semantic.min.css'

// Support component names relative to this directory:
var componentRequireContext = require.context("components", true);
var ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);
