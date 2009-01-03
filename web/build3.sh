#!/bin/bash

cd $(dirname ${0})

echo "Building webrepl3.js"
time ../bin/cljsc ../src/cljs/webrepl3.cljs > webrepl3.js
