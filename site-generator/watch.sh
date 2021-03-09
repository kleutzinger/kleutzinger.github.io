#!/bin/env sh
cd /home/kevin/gits/kleutzinger.github.io/site-generator
ls *.py *.scss | entr ../.venv/bin/python generate.py
