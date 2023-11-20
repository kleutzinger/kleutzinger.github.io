#!/bin/env sh
cd /home/kevin/gits/kleutzinger.github.io/site-generator
ls *.py *.scss | entr python generate.py
