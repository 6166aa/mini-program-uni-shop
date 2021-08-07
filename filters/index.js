const path = require('path');
const files=require.context(
	'.',
	false,
	/.js/
);
let filters={};

files.keys().forEach((item)=>{
	if(item=='./index.js')
	{
		return;
	}
  console.log(item);
  var key =/(\w+)\.js$/.exec(item)[1];
  filters[key] = files(item).default;
});
console.log(filters);
export default filters;
