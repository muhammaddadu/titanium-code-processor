/**
 * <p>Copyright (c) 2012 by Appcelerator, Inc. All Rights Reserved.
 * Please see the LICENSE file for information about licensing.</p>
 * 
 * @author Bryan Hughes &lt;<a href="mailto:bhughes@appcelerator.com">bhughes@appcelerator.com</a>&gt;
 */

var path = require("path"),
	RuleProcessor = require("../RuleProcessor"),
	Base = require("../Base"),
	Exceptions = require("../Exceptions"),
	Runtime = require("../Runtime");

exports.processRule = function(ast) {
	RuleProcessor.fireRuleEvent(ast, {}, false);
	
	// Make sure we are in a function
	if (Runtime.contextStack.length < 3) {
		throw new Exceptions.SyntaxError();
	}
	
	var result = ["return", new Base.UndefinedType(), undefined];
	if (ast[1]) {
		result[1] = Base.getValue(RuleProcessor.processRule(ast[1]));
	}
	
	RuleProcessor.fireRuleEvent(ast, {}, true);
	return result;
};
RuleProcessor.registerRuleProcessor(path.basename(__filename, ".js"), exports);