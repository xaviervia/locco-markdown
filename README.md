Locco Markdown adapter
======================

Creates Markdown files side by side with the original files. Optionally
uses one of them as the general README.

[Locco](https://github.com/xaviervia/locco) plugin.

Usage
-----

```sh
locco --source=src/**/*.js --adapter=markdown \
      --comment=// --escape=! --adapter-readme=locco.js
```

Methods
-------

### comment

Receives a comment string and a file path and emits a `post` event with the
new path and

#### Arguments

- `Object` options
  - `String` comment
  - `Object` file
    - `String` path

#### Events

- `post`
  - `String` targetFile
  - `String` line

License
-------

Copyright 2014 Xavier Via

ISC license.

See [LICENSE](LICENSE) attached
