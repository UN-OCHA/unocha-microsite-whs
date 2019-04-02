# ⚠️ Archived ⚠️

This repository no longer receives updates of any kind. If you clone the repository and use the code, be advised that it may contain security vulnerabilities.

# World Humanitarian Summit microsite

A Jekyll site running on GitHub pages.

## Running locally

# Requirements

* [Ruby](https://www.ruby-lang.org/en/)
* [Bundler](http://bundler.io/)
* [Node](https://nodejs.org/)
* [Jekyll](https://jekyllrb.com)

### Installing

Clone the repo

```
git@github.com:UN-OCHA/unocha-microsite-whs.git
```

Install the required gems

```
cd unocha-microsite-whs
bundle
```

Install the front end dependencies

```
npm install
```

### Running

To run the Jekyll site and watch for changes to sass and js:

```
grunt serve
```

Go to http://localhost:4000/

### Deploying

1. Compile the front end resources (Grunt is used for this instead of the standard Jekyll way).
```
grunt
```

2. Commit your changes, including the minified css and js files.

3. Push to the master branch.
