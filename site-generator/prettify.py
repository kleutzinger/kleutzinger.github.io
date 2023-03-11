import sys
from subprocess import Popen, PIPE, STDOUT
import shutil
import prettierfier
from bs4 import BeautifulSoup

# format html string using beautiful soup


def html_prettify(html_string: str) -> str:
    "returns html back as formatted string. must have `tidy` installed"

    try:
        soup = BeautifulSoup(html_string, "html.parser")
        html_string = soup.prettify()
        return prettierfier.prettify_html(html_string)
    except Exception as err:
        print(err)
        print("prettifying failed")
        exit(1)
        return html_string


if __name__ == "__main__":
    pass
