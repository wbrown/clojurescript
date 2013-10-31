## ClojureScript Compiler Compiled with ClojureScript? ##

This is a **patched version of the ClojureScript compiler** that
compiles to ClojureScript. Normally, the ClojureScript compiler is
a pure Clojure program that runs on the JVM. This patched version runs
from the compiled JavaScript. This project was kicked off by
[kanaka](https://github.com/kanaka) and
[chouser](https://github.com/chouser) during some intense hacking at
Clojure/conj 2012. Kanaka continues to develop the fork towards the
goal of being fully self-hosting (i.e. ClojureScript-in-ClojureScript).

### Why?

* Why not?
* Compilers are only cool once they are self-hosting (can compile
  their own code). This fork is not self-hosting yet, but that is the
  goal.
* You can use ClojureScript without a JVM.
* You can have a [ClojureScript REPL web
  app](http://kanaka.github.com/clojurescript/web/jsrepl.html) that
  runs locally in your browser (no server involved after loading the
  page).

### Current Caveats

* JavaScript output is not optimized by the Google Closure Compiler
  (which is a Java program).
* The code changes are not all compatible with the normal Clojure
  ClojureScript (JVM based) compiler. To make it compatible we really
  need [Feature Expressions in Clojure](http://dev.clojure.org/display/design/Feature+Expressions)
* The :nodejs compilation target is currently broken. However, the
  `node/run.js` bootstrap script enables compiled CLJS code to be
  invoked that was not compiled with a :target.
* Other miscellaneous broken things that have not been tracked down
  yet.

### Bugs

- numeric keywords (:2) are broken
- anonymous functions do not warn about arity
- Unicode symbol breakage
- hex numbers "0x7e7"
- warnings during compile about *unchecked-if*


### TODOs

- update to upstream ClojureScript
- file I/O (at least on the node.js side)
- misc functionality: require, use, var metadata, :private def check
- self-hosting (compile ClojureScript compiler using node.js hosted ClojureScript compiler)
- optional optimizations (single JS file output, etc)
- tagged reader literals
- get test/cljs/cljs/core_test.cljs to load/run successfully
- line numbered errors
- single file output and performance optimizations (without unused code removal)
- better long line/multiline editing in web REPL

### Build

The ClojureScript-in-ClojureScript compiler is compiled using Clojure (i.e. on the JVM).

First, run `./script/bootstrap` which downloads the necessary dependencies: Clojure, Google Closure Library, Google Closure Compiler, and Rhino. This must be run from the root project directory.

Next, run `./script/compile` to build the compiler. This might give off some warnings, but that's okay.

You should now have a functioning ClojureScript compiler at `./bin/cljs`.


### Usage

The `./bin/cljsc` script takes a file or project directory containing .cljs files. It creates an `out` folder with your compiled JavaScript.  It optionally accepts a second argument with Google Closure Compiler options, although it currently won't work with any optimization mode other than `{:optimizations :none}` (the default).

After building a cljs project, you will need to copy `./src/cljs/goog.js` into the `out` directory created by compilation if it doesn't already exist there.

### Examples

#### Web REPL
There is a sample project (a web-based REPL) you can build and play with inside the `web` directory.

It comes with a build script:

```
cd web
./build2.sh
```

Now open the `web/repl.html` file in a browser.

#### Node.js REPL

For a REPL in Node.js, build the `src/cljs/noderepl.cljs` code:

```
cd node
../bin/cljsc ../noderepl.cljs > noderepl.js
cp ../src/cljs/goog.js out/
```

Now use the `run.js` bootstrap code to launch the repl:

```
./run.js noderepl.js
```

#### Node.js compilation/evaluation
For direct *.cljs file compilation/evaluation, build the nodecljs.cljs compiler:

```
cd node
../bin/cljsc ../src/cljs/nodecljs.cljs > nodecljs.js
cp ../src/cljs/goog.js out/
```

You can now use a combination of the `run.js` bootstrap code and
`nodecljs.js` to compile/evaluate the `hello.cljs` file:

```
./run.js nodecljs.js hello.cljs
```



--------

## What is ClojureScript? ##

ClojureScript is a new compiler for [Clojure](http://clojure.org) that targets JavaScript. It is designed to emit JavaScript code which is compatible with the advanced compilation mode of the [Google Closure](http://code.google.com/closure/) optimizing compiler.

## Getting Started ##

* [Compare with JavaScript](http://himera.herokuapp.com/synonym.html)
* [Try it online](http://himera.herokuapp.com/index.html)
* Read the [Quick Start](https://github.com/clojure/clojurescript/wiki/Quick-Start) guide.
* Read the [Documentation](https://github.com/clojure/clojurescript/wiki).
* Look at the [Sample Applications](https://github.com/clojure/clojurescript/tree/master/samples).

## Questions, Feedback? ##

Please point all of your questions and feedback [here](http://groups.google.com/group/clojure).

## Developers Welcome ##

ClojureScript operates under the same license as Clojure. All contributors must have a signed CA (Contributor's Agreement) and submit their patch via the appropriate channels. If you're interested in contributing to the project, please see the [contributing](http://clojure.org/contributing) page on [clojure.org](http://clojure.org).

## License ##

    Copyright (c) Rich Hickey. All rights reserved. The use and
    distribution terms for this software are covered by the Eclipse
    Public License 1.0 (http://opensource.org/licenses/eclipse-1.0.php)
    which can be found in the file epl-v10.html at the root of this
    distribution. By using this software in any fashion, you are
    agreeing to be bound by the terms of this license. You must
    not remove this notice, or any other, from this software.
