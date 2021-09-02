# $YAY token smart contract

- Language: Solidity v0.6.12

- Project framework: hardhat + truffle / web3

- Nodejs: v14.17.0

## Overview

### Deployed

[Binance Smart Chain](https://bscscan.com/token/0x524dF384BFFB18C0C8f3f43d012011F8F9795579)

## Installation & Usage

1. Install packages
```
npm i --save-dev
```

2. Build project
```
npm run build
```

### Testing

```
npm test
```

### Run linter

```
npm run lint
```

### Deploy

1. Edit network in ```hardhat.config.js``` ([docs](https://hardhat.org/config/))

2. Setup environment variables:
```
cp .env.example .env
// then edit .env
```

3. Run command:
```
npx hardhat run scripts/deploy-script.js --network <network name>
```

## License

[MIT License](./LICENSE)
