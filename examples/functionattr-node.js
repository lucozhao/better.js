var FunctionAttr	= FunctionAttr	|| require('../src/helpers/functionattr.js')

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

var cat	= FunctionAttr(function(name){
	console.log('im a cat called', name)
	return 3
}, {
	arguments	: [String],
	return		: Number,
})

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

cat('kitty')


