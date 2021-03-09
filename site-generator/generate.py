import datetime
import time
import os

from markdown import markdown
import dominate
import sass
from dominate.tags import *
from dominate.util import raw

import ingest

with open("card.scss") as f:
    uncompiled = f.read()
    compiled = sass.compile(string=uncompiled)
    with open("card.css", "r+") as w:
        infile = w.read()
        if infile != compiled:
            print("recompile card.scss")
            w.seek(0)
            w.write(compiled)
            w.truncate()


doc = dominate.document(title="Portfolio - kevinleutzinger.com")

with doc.head:
    link(rel="stylesheet", href="site-generator/card.css")
    meta(charset="UTF-8")
    meta(name="viewport", content="width=device-width,initial-scale=1")
    # script(type='text/javascript', src='script.js')


def gen_card_html(project, alt=False):
    title = project.get("title", "_TITLE_")
    screenshot_url = project.get("screenshot_url", "")
    subtitle = project.get("technologies", "")
    subtitle = subtitle.replace(",", ", ")
    description_text = project.get("web_description", "")
    # description = p(project.get("web_description", ""))
    description = raw(markdown(description_text))
    if "demo_url" in project:
        demo_url = a("Open", href=project["demo_url"])
    else:
        demo_url = ""
    if "repo_url" in project and project["repo_url"] not in project.get("demo_url", ""):
        repo_url = a("Source Code", href=project["repo_url"])
    else:
        repo_url = ""
    if "youtube" in project:
        youtube = a("Video Demo", href=project["youtube"])
    else:
        youtube = ""
    if "date_created" in project:
        date_slashes = project["date_created"]
        month_year = datetime.datetime.strptime(date_slashes, "%Y-%m-%d").strftime(
            "%b %Y"
        )
        date_created = li(month_year, cls="date")
    else:
        date_created = ""
    if alt:
        alt_class = "alt"
    else:
        alt_class = ""

    project_card = f"""\
    <div class="blog-card {alt_class}">
    <div class="meta">
      <div class="photo" style="background-image: url({screenshot_url})"></div>
      <ul class="details">
        <li class="author"><a href="https://github.com/kleutzinger">Kevin Leutzinger</a></li>
        {date_created}
        <!--
        <li class="tags">
          <ul>
            <li><a href="#">Tag</a></li>
          </ul>
        </li>
         -->
      </ul>
    </div>
    <div class="description">
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      {description}
      <p class="read-more">{repo_url}{youtube}{demo_url}</p>
    </div>
    </div>
    """
    return project_card


if __name__ == "__main__":
    print("getting all rows")
    projects = ingest.get_rows()

    def order_proj(proj):
        star_rating = int(proj.get("star_rating", 0))
        shine_rating = int(proj.get("shine_rating", 0))
        return (shine_rating + star_rating) / 2

    projects.sort(reverse=True, key=order_proj)
    even_idx = True
    for proj in projects:
        if "kl" in proj.get("omit_from", ""):
            continue
        htm = gen_card_html(proj, alt=even_idx)
        with doc:
            raw(htm)
        even_idx = not even_idx

    with open(os.path.join("..", "index.html"), "w") as f:
        f.write(str(doc))
    print("regenerated index at", time.asctime(time.localtime()))
