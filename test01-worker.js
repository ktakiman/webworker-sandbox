console.log('from worker');

function check(arg) {
  console.log({ _: 'check', arg });
}

function Factor(n) {
  for (let i = 2; i < Math.sqrt(n); i++) {
    if (n % i === 0) {
      return i;
    }
  }

  return 1;
}

function PF(n) {
  const factors = new Array();
  while (true) {
    const f = Factor(n);
    if (f === 1) {
      break;
    }

    factors.push(f);
    n /= f;
  }

  factors.push(n);

  return factors;
}

onmessage = function(e) {
  console.log({ _: 'worker - onmessage', e });

  const factors = PF(e.data);

  postMessage(factors);
}
