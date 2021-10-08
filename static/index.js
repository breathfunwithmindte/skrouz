console.log("%c ToExoume.gr Welcome", "padding: 15px; color: lightgreen");
console.log("%c Προσοχή !! Το συγκεκριμένο περιβάλλον είναι σχεδιασμένο για προγραμματιστές, αν κάποιος σας ζήτησε να κάνε αντιγραφή-επικόλληση για να πάρετε κάποιο προϊόν δωρέαν είτε για κάποια άλλη λειτουργία (hack), είναι ψευδής πληροφορία και θα πάρει πρόσβαση στον λογαριασμό σας.  ", "padding: 1.5px; color: red");

var queries = new Array();

window.addEventListener('load', (e) => {
  if(document.location.search){
    const qs = document.location.search.substring(1);
    const queries_pre = decodeURIComponent(qs);
    queries_pre.split("&").map(doc => {
      const fn = doc.split("=")[0];
      const check = doc.split("=")[1] ? doc.split("=")[1].split("::") : [null];
      const fm = check.length === 2 ? check[0] : "" ;
      const fv = check.length === 2 ? check[1] : check[0];
      queries.push({
        filtername: fn,
        filtermethod: fm,
        filtervalue: fv
      });
    });
    console.table(queries)
  }
})


function handlechangefilter(e, filtermethod) {
  console.log(queries.map(doc => doc))
  const current = queries.find(doc => doc.filtername === e.target.name);
  if(!current){
    queries.push({
      filtername: e.target.name,
      filtermethod: filtermethod,
      filtervalue: e.target.value
    })
    window.location.href = window.location.pathname + DecodeQueries();
  }else{
    if(current.filtervalue === e.target.value){
      queries = queries.filter(doc => doc.filtername != current.filtername);
      window.location.href = window.location.pathname + DecodeQueries();
    }else{
      queries = queries.filter(doc => doc.filtername != current.filtername);
      queries.push({...current, filtervalue: e.target.value});
      window.location.href = window.location.pathname + DecodeQueries();
    }
  }
}

function DecodeQueries () {
  let qs = "?";
  let qs_pre = "";
  for (let i = 0; i < queries.length; i++) {
    const start = i === 0 ? "" : "&";
    qs_pre = 
    qs_pre + start + queries[i].filtername + "=" + queries[i].filtermethod + 
    (queries[i].filtermethod && queries[i].filtermethod.length > 0 ? "::" : "") + 
   ( queries[i].filtervalue ? queries[i].filtervalue : "");
    
  }
  return qs = qs + qs_pre;
}