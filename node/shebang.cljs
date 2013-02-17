#!./run.js nodecljs.js

(ns shebang-test)

(def dbl (fn* [x] (* 2 x)))

(println "Hello World UNIX World.")
(println "(dbl 16) is:" (dbl 16))

8
