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
  var key =/(\w+)\.js$/.exec(item)[1];
  filters[key] = files(item).default;
});
export default filters;
