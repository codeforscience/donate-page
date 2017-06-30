# donate-css

donate page for code for science & society

Features:

* Donate via Stripe
* Simple express server to handle payments

## Development

* `npm run dev` to run server and watch client javascript files + rebuild automatically
* `npm start` to build and run server for production

### Config

Copy the config file to `config.yml`:

```
cp example.config.yml config.yml
```

And set your stripe keys. You can also set the stripe keys as environment variables:

```
process.env.SECRET_KEY
process.env.PUBLISHABLE_KEY
```

## License

[MIT](LICENSE.md)
