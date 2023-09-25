import prettierfier
from bs4 import BeautifulSoup



def html_prettify(html_string: str) -> str:
    "turns an ugly html string into a formatted html string"

    try:
        soup = BeautifulSoup(html_string, "html.parser")
        html_string = soup.prettify()
        return prettierfier.prettify_html(html_string)
    except Exception as err:
        print(err)
        print("prettifying failed")
        exit(1)


if __name__ == "__main__":
    pass
