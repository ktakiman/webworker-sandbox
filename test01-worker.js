console.log("from worker");

function check(arg) {
  console.log({ _: "check", arg });
}

function FuzzySqrt(n, h, m, l) {
  const sq = m * m;
  if (sq === n) {
    return m;
  } else if (sq < n) {
    const span = h - m;
    if (span <= 1n) {
      return h;
    } else {
      return FuzzySqrt(n, h, span / 2n + (span % 2n) + m, m);
    }
  }

  const span = m - l;
  if (span <= 1n) {
    return m;
  } else {
    return FuzzySqrt(n, m, span / 2n + (span % 2n) + l, l);
  }
}

function Factor(n) {
  const sqrt = FuzzySqrt(n, n, 2n + (n - 2n) / 2n, 2n);
  console.log({ _: 'sqrt', n, sqrt });
  for (let i = 2n; i <= sqrt; i++) {
    if (n % i === 0n) {
      return i;
    }
  }

  return 1n;
}

function PF(n) {
  const factors = new Array();
  while (true) {
    const f = Factor(n);
    if (f === 1n || f === n) {
      break;
    }

    factors.push(f);
    n /= f;
  }

  factors.push(n);

  return factors;
}

onmessage = function (e) {
  // console.log({ _: "worker - onmessage", e });

  const factors = PF(e.data);

  postMessage(factors);
};
