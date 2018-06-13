function _bracketedTax(income, brackets) {
  var tax = 0;
  var bracket = 0;
  while (true) {
    var c = brackets.pop();
    // incremental bracket
    bracket = c[0] - bracket;
    if (income < bracket) {
      // this is our top bracket, return acc tax + portion of this bracket
      return tax + (income * c[1]);
    } else {
      // we're beyond this bracket, use it's full amt
      tax += bracket * c[1];
      income -= bracket;
    }
  }
}

function federalTax(income) {
  // married filing jointly 2018
  var brackets = [
    [Number.POSITIVE_INFINITY, 0.37],
    [400000, 0.35],
    [315000, 0.24],
    [165000, 0.22],
    [77400, 0.12],
    [19050, 0.1]
  ];
  return _bracketedTax(income, brackets);
}

function ficaTax(income) {
  var socialSecurity = Math.min(income, 128400) * 0.062;
  var medicare = (Math.min(income, 200000) * 0.0145) + (Math.max(income - 200000, 0) * 0.0235);
  return socialSecurity + medicare;
}

function stateTax(income, state) {
  var brackets = {
    'ca': [
      [Number.POSITIVE_INFINITY, 0.133],
      [1000000, 0.123],
      [537498, 0.113],
      [322499, 0.103],
      [268750, 0.093],
      [52612, 0.08],
      [41629, 0.06],
      [29989, 0.04],
      [19001, 0.02],
      [8015, 0.01],
    ],
    'or': [
      [Number.POSITIVE_INFINITY, 0.099],
      [125000, 0.09],
      [8450, 0.07],
      [3350, 0.05],
    ],
  }[state];
  
  return _bracketedTax(income, brackets);
}

function tax(income, state) {
  return federalTax(income) + ficaTax(income) + stateTax(income, state);
}
