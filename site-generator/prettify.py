import sys
from subprocess import Popen, PIPE, STDOUT
import shutil


def html_prettify(html_string):
    "must have `tidy` installed"
    if not shutil.which("tidy"):
        print("tidy not installed")
        print("not prettifying html")
        return html_string
    try:
        html_string = str.encode(html_string)
        p = Popen(
            ["tidy", "-q", "--wrap", "0", "-i", "--"],
            stdout=PIPE,
            stdin=PIPE,
            stderr=STDOUT,
        )
        tidy_stout = p.communicate(input=html_string)[0]
        return tidy_stout.decode("utf-8")
    except Exception as err:
        print(err)
        print("prettifying failed")
        exit(1)
        return html_string


if __name__ == "__main__":
    pass
