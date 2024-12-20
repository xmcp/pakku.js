out = text => {};

err = text => {
    console.error(text);
    throw Error('wasm error: ' + text);
}