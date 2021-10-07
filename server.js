const app = require("express")();
const path = require("path");
const cnfg = require("dotenv").config().parsed;

const clientConfig = {domain: cnfg.domain}
console.log('server running');

const themeConfig = require("./config/theme.json")["light-theme"];
const filterConfig = require("./config/filterConfig.json");
const current_filters = new Map();
for (let i = 0; i < filterConfig.length; i++) { current_filters.set(filterConfig[i].category, filterConfig[i].filters) }

app.listen(5000)

app.use("/public", require("express").static(path.resolve() + "/static"))
app.set("view engine", 'ejs');

app.get('/:category', (req, res) => res.render('index', { config: clientConfig, theme: themeConfig, filters: current_filters.get(req.params.category) || [] }))