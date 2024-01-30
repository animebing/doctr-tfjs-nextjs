# doctr-tfjs-nextjs

nextjs reimplementation of [doctr-tfjs-demo](https://github.com/mindee/doctr-tfjs-demo)


## Quick Start

1. clone the project
```shell
git clone https://github.com/animebing/doctr-tfjs-nextjs.git
```

2. install dependencies
```shell
cd doctr-tfjs-nextjs
npm install
```

3. get model files
```shell
cd ../ && git clone https://github.com/mindee/doctr-tfjs-demo.git
cd doctr-tfjs-demo.git && cp -r public/models ../doctr-tfjs-nextjs/public
cd ../doctr-tfjs-nextjs

```

4. local development
```shell
npm run dev
```

## What I want to mention

1. use `headers` instead of `react-device-detect` to determine the device of the request

2. use `tailwindcss` to make the UI

3. in model loading stage, do warmup inference to make later inference much smoother

## TODO
- [ ] do inference usinng paddleocr model
- [ ] do inference using web worker

## Credit to
- [doctr-tfjs-demo](https://github.com/mindee/doctr-tfjs-demo/tree/master)