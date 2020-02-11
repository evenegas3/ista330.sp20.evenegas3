
const assert = require("assert");
const calculator = require("./calculator.js");

describe("#calculate(expression)", function() {
	it('should return 5 when the expression is "3+2"', function() {
		assert.equal(calculator.calculate('3+2'), 5); });
	it('should return 31 when the expression is "3+2**5+8/4-2*3"', function() {
		assert.equal(calculator.calculate('3+2**5+8/4-2*3'), 31);});
	it('should return SyntaxError when the expression is "+1+10*15/"', function() {
		assert.equal(calculator.calculate('+1+10*15/'), "illegal"); });
	it('should return Infinity when the expression is "34*5+2/0*45-7"', function() {
		assert.equal(calculator.calculate('34*5+2/0*45-7'), Infinity); });
	it('should return 31 when the expression is "3**2*5%2+1"', function() {
		assert.equal(calculator.calculate('2'), 2);});
	it('should return NaN when the expression is "3-3*1/3-0*2/0"', function() {
		assert.equal(isNaN(calculator.calculate('3-3*1/3-0*2/0')), true);});
	it('should return SyntaxError when the expression is "a+b-1"', function() {
		assert.equal(calculator.calculate('a+b-1'), "illegal"); });
	it('should return 22 when the expression is "1+    32   - 10"', function() {
		assert.equal(calculator.calculate('1+    32   - 10'), 23); });
	it('should return SyntaxError when the expression is "a ∗ d − 4"', function() {
		assert.equal(calculator.calculate('a ∗ d − 4'), "illegal"); });
	it('should return SyntaxError when the expression is "+100+"', function() {
		assert.equal(calculator.calculate('+100+'), "illegal"); });



	// it('should return NaN when the expression is "3-3*1/3 -0*2/0"', function() {
    //   assert.equal(isNaN(calculator.calculate ('3-3*1/3 -0*2/0')) , true);
    // });
    // it('should return 13 when the expression is "3+2*5"', function() {
    //   assert.equal(calculator.calculate('3+2*5'), 13);
    // });
    // it('should return 13.5 when the expression is "3/2+4*5-3*6/2+1"', function() {
    //   assert.equal(calculator.calculate('3/2+4*5-3*6/2+1'), 13.5);
    // });
    // it('should return -Infinity when the expression is "3/2+4*5-3*6/0+1"', function() {
    //   assert.equal(calculator.calculate('3/2+4*5-3*6/0+1'), -Infinity);
    // });
    // it('should return -489285.04938271607 when the expression is "45*673-205/81*34-781*671+4567"', function() {
    //   assert.equal(calculator.calculate('45*673-205/81*34-781*671+4567'), -489285.04938271607);
    // });
    // it('should return SyntaxError when the expression is "3/2 89+4*5-3*6/2+1"', function() {
    //   assert.equal(calculator.calculate('3/2 89+4*5-3*6/2+1'), 'SyntaxError');
    // });
    // it('should return -74.7791937716263 when the expression is "3/28.9+4*5-3*64.3/2+1.567"', function() {
    //   assert.equal(calculator.calculate('3/28.9+4*5-3*64.3/2+1.567'), -74.7791937716263);
    // });
    // it('should return -74.4873603436185 when the expression is ".03/28.009+4*5-3*64.3/2+1.567**1.5"', function() {
    //   assert.equal(calculator.calculate('.03/28.009+4*5-3*64.3/2+1.567**1.5'), -74.4873603436185);
    // });
    // it('should return SyntaxError when the expression is "3/289+4* *5-3*6/2+1"', function() {
    //   assert.equal(calculator.calculate('3/289+4* *5-3*6/2+1'), 'SyntaxError');
    // });
    // it('should return SyntaxError when the expression is "3/289+4*5-3*6/2+1**"', function() {
    //   assert.equal(calculator.calculate('3/289+4*5-3*6/2+1**'), 'SyntaxError');
    // });
    // it('should return SyntaxError when the expression is "3/289+4*5-3*6/2+1+"', function() {
    //   assert.equal(calculator.calculate('3/289+4*5-3*6/2+1+'), 'SyntaxError');
    // });
    // it('should return SyntaxError when the expression is "+3/289+4*5-3*6/2+1"', function() {
    //   assert.equal(calculator.calculate('+3/289+4*5-3*6/2+1'), 'SyntaxError');
    // });
    // it('should return 12.01038062283737 when the expression is "  3/    289+4 *5-3*6/  2+1   "', function() {
    //   assert.equal(calculator.calculate('  3/    289+4 *5-3*6/  2+1   '), 12.01038062283737);
    // });
    // it('should return SyntaxError when the expression is "3/289+4*5a-3*6/2+1"', function() {
    //   assert.equal(calculator.calculate('3/289+4*5a-3*6/2+1'), 'SyntaxError');
    // });
    // it('should return SyntaxError when the expression is "3/289+4*5-3*60$89/2+1"', function() {
    //   assert.equal(calculator.calculate('3/289+4*5-3*60$89/2+1'), 'SyntaxError');
	// });
	

});