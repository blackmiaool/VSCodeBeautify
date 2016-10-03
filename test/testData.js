'use strict';

const fs = require('fs'),
	path = require('path');

const inputFiles = {
	js: "var a=1;\n\nfunction b(){a=      5}",
	json: '{"a":           true}',
	html: "<div>\n<article     id='my_id'>Article Content         </article></div>",
	css: "a\n,b>c{border:\n1px;color:blue}",
	scss: "@mixin first(){\n&:before,&:after{content:\n\"|\"} border: 1px    solid green} .a {@include first();\nmargin:1px}"
};

const outputFiles = {
	lf: {
		js: 'var a = 1;\n\nfunction b() {\n    a = 5\n}',
		json: '{\n    "a": true\n}',
		html: '<div>\n    <article id=\'my_id\'>Article Content </article>\n</div>',
		css: 'a,\nb>c {\n    border: 1px;\n    color: blue\n}',
		scss: '@mixin first() {\n    &:before,\n    &:after {\n        content: "|"\n    }\n    border: 1px solid green\n}\n\n.a {\n    @include first();\n    margin: 1px\n}'
	},
	crlf: {},
	tab: {
		js: 'var a = 1;\n\nfunction b() {\n\ta = 5\n}',
		json: '{\n\t"a": true\n}',
		html: '<div>\n\t<article id=\'my_id\'>Article Content </article>\n</div>',
		css: 'a,\nb>c {\n\tborder: 1px;\n\tcolor: blue\n}',
		scss: '@mixin first() {\n\t&:before,\n\t&:after {\n\t\tcontent: "|"\n\t}\n\tborder: 1px solid green\n}\n\n.a {\n\t@include first();\n\tmargin: 1px\n}'
	},
	nested: {
		js: 'var a = 1;\r\n\r\nfunction b() {\r\n     a = 5\r\n}',
		json: '{\r\n     "a": true\r\n}',
		html: '<div>\r\n   <article id=\'my_id\'>Article Content </article>\r\n</div>',
		css: 'a,\r\nb>c {\r\n    border: 1px;\r\n    color: blue\r\n}',
		scss: '@mixin first() {\r\n    &:before,\r\n    &:after {\r\n        content: "|"\r\n    }\r\n    border: 1px solid green\r\n}\r\n\r\n.a {\r\n    @include first();\r\n    margin: 1px\r\n}'
	}
};

for (let n in outputFiles.lf) {
	outputFiles.crlf[n] = outputFiles.lf[n].replace(/\n/g, "\r\n");
}

exports.clean = base => {
	for (let ext in inputFiles) {
		fs.writeFileSync(path.join(base, `test.${ext}`), inputFiles[ext]);
	}
};

exports.expected = (mod, ext) => {
	return outputFiles[mod][ext];
};

exports.types = ['js', 'json', 'html', 'css', 'scss'];
