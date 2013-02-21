#!/bin/bash

cd $(dirname ${0})

echo "Building webrepl2.js"
time ../bin/cljsc ../src/cljs/webrepl2.cljs > webrepl2.js
