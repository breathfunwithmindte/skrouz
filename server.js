const app = require("express")();
const path = require("path");
const cnfg = require("dotenv").config().parsed;

const clientConfig = {domain: cnfg.domain}
console.log('server running');

const themeConfig = require("./config/theme.json")["light-theme"];
const filterConfig = require("./config/filterConfig.json");
const current_filters = new Map();
for (let i = 0; i < filterConfig.length; i++) { current_filters.set(filterConfig[i].category, filterConfig[i].filters) }
const categories = require("./config/categories.json");
console.log(categories);

app.listen(5000)

app.use("/public", require("express").static(path.resolve() + "/static"))
app.set("view engine", 'ejs');

const test = require("./test")

console.time("start");
const products = test(1000000);
console.timeEnd("start");
console.log(products.length)


app.get('/:category', (req, res) => {
  if(!["mobile-phones"].some(r => r === req.params.category)) return res.send("404 | not found");
  const queries = [];
  for (const key in req.query) {
    const initialvalue = req.query[key];
    const check = initialvalue.split("::").length === 2 ? true : false;
    const m = check ? initialvalue.split("::")[0] : "";
    const v = check ? initialvalue.split("::")[1] : initialvalue;
    queries.push({ filtername: key, filtermethod: m, filtervalue: v });
  }
  const sendproducts = products.filter(doc => queriesValidation(queries, doc, req.params.category))
  res.render('index', { 
    config: clientConfig, 
    theme: themeConfig,
    queries: queries,
    filters: current_filters.get(req.params.category) || [], 
    category: {name: categories[0].name, label: categories[0].label},
    products_total: sendproducts.length,
    products: sendproducts.slice(0,100)
  });
})

function queriesValidation (queries, product, category) {
  for (let i = 0; i < queries.length; i++) {
    const currentquery = queries[i];
    const isValidQuery = current_filters.get(category).some(doc => doc.filtername === currentquery.filtername);
    if(!isValidQuery) console.log("continue not valid query");
    if(!isValidQuery) continue;
    switch (currentquery.filtermethod) {
      case "":
        if(product[currentquery.filtername] != currentquery.filtervalue) return false;
        break;
      case ">":
        if(Number(product[currentquery.filtername]) > Number(currentquery.filtervalue)) return false;
        //console.log(">>> case passed", product[currentquery.filtername], currentquery.filtervalue)
        break;
      case "<":
        if(Number(product[currentquery.filtername]) < Number(currentquery.filtervalue)) return false;
        //console.log("<<< case passed", product[currentquery.filtername], currentquery.filtervalue)
        break;
      default:
        if(product[currentquery.filtername] != currentquery.filtervalue) return false;
        //console.log("first case passed", product[currentquery.filtername], currentquery.filtervalue)
        break;
    }
  }
  return true;
}