# SeedCrypt

This is a simple application to encrypt and decrypt a BIP39 seed phrase using a key.
It uses the BIP39 wordlist for autocompletion during input.

## TODO:
- domains: seedcrypt.app and https://seedcrypt.io
- extract `encrypt` and `decrypt` functions to npm library
- add docs
- github actions for `sls deploy`
- add pages with information to the app + SEO
- styles?

## Proof of transparency

- **Network** tab in browser: there are **no requests to server after** the initial load
- `src/utils/crypto.ts` - `encrypt` and `decrypt` functions: simple algorithm based on modified **Caesar cipher**. `passwordToBIP` - be careful with encoding
- `src/App.tsx` - 2 input fields for seed phrase and key with `SeedPhraseInput` component, 2 buttons for encryption and decryption, 1 output field for result
- `src/components/SeedPhraseInput.tsx` - input field with autocomplete based on BIP39 wordlist

## Usage

### Run locally

```bash
git clone https://github.com/seedcrypt/seedcrypt.git
cd seedcrypt
```
**NPM**
```bash
npm install
npm run start
```

**Yarn**
```bash
yarn
yarn start
```

## Deployment to AWS Serverless:

### Without API Gateway/Custom domains/...
`cp .env.example .env` - sets `PUBLIC_URL=/prod` for default AWS adresses
`yarn build && npx sls deploy`

### With API Gateway/ACM/Custom domains/Hosted zones/...
1. `yarn build && npx sls deploy`
2. Create domain at Route 53 -> Hosted zones
3. Set DNS for domain
4. Create certificate at ACM
5. Add records
6. API Gateway -> Custom domains -> Create -> Regional ->...
7. Hosted zones -> domain -> Wizard -> alias for API Gateway -> Domain
