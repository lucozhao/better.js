/**
 * parse the stacktrace of an Error
 * @param  {Error|undefined} error optional error to parse. if not provided, generate one.
 * @return {Array.<Object>}	parsed stacktrace
 */
function parseStacktrace(error){
	// call the proper parser depending on the usage 
	if( typeof(window) === 'undefined' ){
		var stacktrace	= parserV8(error)
	}else if( navigator.userAgent.match('Chrome/') ){
		var stacktrace	= parserV8(error)		
	}else if( navigator.userAgent.match('Firefox/') ){
		var stacktrace	= parserFirefox(error)				
	}else{
		console.assert(false, 'parseStacktrace() not yet implemented for', navigator.userAgent)
		return [];
	}
	return stacktrace.slice(2);

	//////////////////////////////////////////////////////////////////////////
	//									//
	//////////////////////////////////////////////////////////////////////////

	/**
	 * parse stacktrace for v8 - works in node.js and chrome
	 */
	function parserV8(error){
		// handle polymorphism
		error		= error	|| new Error();
		// sanity check
		console.assert(error instanceof Error);
		// start parse the error stack string
		var lines	= error.stack.split("\n").slice(1);
		var stacktrace	= [];
		lines.forEach(function(line){
			if( line.match(/\)$/) ){
				var matches	= line.match(/^\s*at ([^\s]+) \((.+):(\d+):(\d+)\)/);
				var result	= {
					fct	: matches[1],
					url	: matches[2],
					line	: parseInt(matches[3], 10),
					column	: parseInt(matches[4], 10)
				};
				stacktrace.push(result);
			}else{
				var matches	= line.match(/^\s*at (.+):(\d+):(\d+)/);
				var result	= {
					url	: matches[1],
					fct	: '<anonymous>',
					line	: parseInt(matches[2], 10),
					column	: parseInt(matches[3], 10)
				};
				stacktrace.push(result);
			}
		});
		return stacktrace;
	};

	/**
	 * parse the stacktrace from firefox
	 */
	function parserFirefox(error){
		// handle polymorphism
		error		= error	|| new Error();
		// sanity check
		console.assert(error instanceof Error);
		// start parse the error stack string
		var lines	= error.stack.split("\n").slice(0, -1);
		var stacktrace	= [];
		lines.forEach(function(line){
			var matches	= line.match(/^(.*)@(.+):(\d+)$/);
			stacktrace.push({
				fct	: matches[1] === '' ? '<anonymous>' : matches[1],
				url	: matches[2],
				line	: parseInt(matches[3], 10),
				column	: 1
			});
		});
		return stacktrace;
	};
}


// export the class in node.js - if running in node.js
if( typeof(window) === 'undefined' )	module.exports	= parseStacktrace;

