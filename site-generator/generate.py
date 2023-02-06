import datetime
import time
import os
from markdown import markdown
import dominate
import sass
from dominate.tags import *
from dominate.util import raw
from prettify import html_prettify
import ingest


def generate_css():
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


def gen_tags(project):
    "display tags over picture when card is hovered"
    tag_list = project.get("technologies", "")
    if tag_list == "":
        return ""
    tag_list = tag_list.split(",")
    LIS = "\n".join([f'<li><a href="#">{text}</a></li>' for text in tag_list])
    out = f"""
        <li class="tags">
          <ul>
            {LIS}
          </ul>
        </li>
    """
    return out


def get_date(project):
    if "date_created" in project:
        date_slashes = project["date_created"]
        month_year = datetime.datetime.strptime(date_slashes, "%Y-%m-%d").strftime(
            "%b %Y"
        )
        date_created = month_year
    else:
        date_created = ""
    return date_created


def gen_description(project):
    description_text = project.get("web_description", "")
    description = raw(markdown(description_text))
    return description


def gen_subtitle(project):
    sub_text = project.get("medium", "")
    sub_date = get_date(project)
    if sub_date:
        sub_date = "<br>" + sub_date
    templ = f"<h2>{sub_text}{sub_date}</h2>"
    return templ


def gen_card_html(project, is_alt_card=False):
    "return raw html of a project card"
    title = project.get("title", "_TITLE_")
    screenshot_url = project.get("screenshot_url", "")
    subtitle = gen_subtitle(project)
    description = gen_description(project)
    readme = youtube = demo_url = readme_url = repo_url = ""
    if "demo_url" in project:
        demo_url = a("< Open >", href=project["demo_url"])
    if "repo_url" in project and project["repo_url"] not in project.get("demo_url", ""):
        repo_url = a("Source Code", href=project["repo_url"])
    if project.get("readme_url"):
        readme = a("readme", href=project["readme_url"])
    if "youtube" in project:
        youtube = a("Video Demo", href=project["youtube"])
    alt_class = "alt" * is_alt_card
    hover_tags = gen_tags(project)

    project_card = f"""\
    <div class="blog-card {alt_class}">
    <div class="meta">
      <div class="photo" style="background-image: url({screenshot_url})"></div>
      <ul class="details">
        <li class="author"><a href="https://github.com/kleutzinger">Kevin Leutzinger</a></li>
        {hover_tags}
      </ul>
    </div>
    <div class="description">
      <h1>{title}</h1>
      {subtitle}
      {description}
      <p class="read-more">
      {repo_url}
      {youtube}
      {demo_url}
      {readme}
      </p>
    </div>
    </div>
    """
    return project_card


if __name__ == "__main__":
    generate_css()
    doc = dominate.document(title="Portfolio - kevinleutzinger.com")
    doc["lang"] = "en"

    with doc.head:
        link(rel="stylesheet", href="site-generator/card.css")
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width,initial-scale=1")
        # script(type='text/javascript', src='script.js')

    print("getting all rows")
    projects = ingest.get_rows()

    def order_proj(proj):
        star_rating = int(float(proj.get("star_rating", 0)))
        shine_rating = int(float(proj.get("shine_rating", 0)))
        return (shine_rating + star_rating) / 2

    projects.sort(reverse=True, key=order_proj)
    even_idx = True
    for proj in projects:
        if "kl" in proj.get("omit_from", ""):
            continue
        htm = gen_card_html(proj, is_alt_card=even_idx)
        with doc:
            raw(htm)
        even_idx = not even_idx

    with open(os.path.join("..", "index.html"), "w") as f:
        pretty_html = html_prettify(str(doc))
        f.write(pretty_html)
    print("regenerated index at", time.asctime(time.localtime()))
