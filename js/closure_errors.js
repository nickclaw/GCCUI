var error_codes = {
	"2" : {
		"error":"Unknown output mode.",
		"description":"The value of the output_format parameter is something other than xml, json, or text."
	},
	"4" : {
		"error":"Unknown compression level.",
		"description":"The value of the compilation_level parameter is something other than WHITESPACE_ONLY, SIMPLE_OPTIMIZATIONS, or ADVANCED_OPTIMIZATIONS."
	},
	"8" : {
		"error":"POST data too large.",
		"description":" The size of the data you sent to the Closure Compiler service exceeds 200,000 bytes. Both the Compiler Service UI and your API calls use an HTTP POST request to communicate with the service, and the total amount of data sent in this request cannot exceed 200,000 bytes. For API calls, this limit applies to the total amount of text in all request parameters. For the Closure Compiler UI, this limit applies to the total amount of text in both the source code and the compiler options like @code_url. If your request is too big, either move source code into separate files and reference them using @code_url, or use the Closure Compiler application on your local machine."
	},
	"9" : {
		"error":"File too large.",
		"description":"The total amount of code from all code_url files, all externs_url files, all js_code code and all js_externs code exceeds 1024000 bytes."
	},
	"10" : {
		"error":"Cannot retrieve content from URL.",
		"description":"An error occurred when the Closure Compiler service tried to retrieve either a JavaScript file indicated in the code_url parameter or an externs file indicated in the externs_url parameter. Check that the URL is correct and that the permissions of the file allow it to be viewed."
	},
	"12" : {
		"error":"URL is not formed properly.",
		"description":"The value of either the code_url parameter or the externs_url parameter is not a well-formed URL."
	},
	"13" : {
		"error":"No output information to produce, yet compilation was requested.",
		"description":"No output_info parameter has been specified."
	},
	"14" : {
		"error":"Unknown output_info value",
		"description":"The value of an output_info parameter is something other than compiled_code, warnings, or statistics."
	},
	"16" : {
		"error":"Unknown warning level",
		"description":"The value of the warning_level parameter is something other than QUIET, DEFAULT, or VERBOSE."
	},
	"17" : {
		"error":"Unknown formatting option.",
		"description":"The value of the formatting parameter is something other than pretty_print."
	},
	"18" : {
		"error":"Unknown parameter in HTTP request",
		"description":"The HTTP request contains a parameter other than one of the ones listed in this document."
	},
	"19" : {
		"error":"Illegal value for output_file_name",
		"description":"The output file name contains a character a number, letter, dot, underscore, or dash, or it contains two consecutive dots (..)"
	},
	"22" : {
		"error":"Too many compiles performed recently. Try again later.",
		"description":"You have submitted too many compiles from your machine. After an hour, you should be able to perform compiles again."
	},
	"23" : {
		"error":"Compiler exception (with backtrace)",
		"description":"The compiler crashed. The text of the error will contain information to help Google debug the problem."
	},
	"24" : {
		"error":"Unsupported input resource type",
		"description":"The resource type is not http:, and so the input file will not be retrieved."
	}
}
