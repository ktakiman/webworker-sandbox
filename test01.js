const worker = new Worker('test01-worker.js');

window.onload = () => {
  const elemInput = document.getElementById('input');
  const elemOutput = document.getElementById('output');
  const elemVerify = document.getElementById('verify');

  worker.onerror = ev => console.log({ _: 'error!', ev });
  worker.onmessage = ev => {
    // console.log({ _: 'msg!', ev });
    elemOutput.innerText = ev.data.join(', ');
    elemVerify.innerText = '' + ev.data.reduce((ag, v) => ag * v, 1n);
  };

  elemInput.oninput = ev => {
    const bi = BigInt(ev.target.value);
    if (bi > 1n) {
      elemOutput.innerText = 'computing...';
      worker.postMessage(bi);
    }
  };

};

