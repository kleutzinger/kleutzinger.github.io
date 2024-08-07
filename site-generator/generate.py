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
import json
import pandas as pd


# this is in the style of google analytics
# paste this somewhere in the head of the html
KEVBADGE_EMBED_SCRIPT = """
<script type="text/javascript">
    (function () {
        const cdn_script_url = 'https://cdn.jsdelivr.net/npm/kevbadge/kevbadge.js';
        let kevbadge = document.createElement('script'); kevbadge.type = 'text/javascript'; kevbadge.async = true;
        kevbadge.src = cdn_script_url;
        let s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(kevbadge, s);
    })();
</script>
"""

MATOMO_TRACKING = """
<script>
  var _paq = window._paq = window._paq || [];
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//matomo.kevbot.xyz/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '1']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();
</script>
"""


def generate_css():
    with open("card.scss") as f:
        uncompiled = f.read()
        compiled = sass.compile(string=uncompiled)
        with open(os.path.join("generated", "card.css"), "w+") as w:
            try:
                infile = w.read()
            except FileNotFoundError:
                infile = ""
            if infile != compiled:
                print("recompile card.scss")
                w.seek(0)
                w.write(compiled)
                w.truncate()


def gen_technologies(project):
    "display tags over picture when card is hovered"
    tag_list = project.get("technologies", [])
    if not tag_list:
        return ""
    return "<span>" + ", ".join(tag_list) + "</span>"

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
    technologies = gen_technologies(project)
    if technologies:
        technologies = "<br>" + technologies
    templ = f"<h2>{sub_text}{sub_date}{technologies}</h2>"
    return templ


def gen_card_html(project, is_alt_card=False):
    "return raw html of a project card"
    title = project.get("title", "_TITLE_")
    screenshot_url = project.get("screenshot_url", "")
    subtitle = gen_subtitle(project)
    description = gen_description(project)
    readme = youtube = demo_url = repo_url = ""
    if "demo_url" in project:
        demo_url = a("| Open", href=project["demo_url"])
    if "repo_url" in project and project["repo_url"] not in project.get("demo_url", ""):
        repo_url = a("| Source Code", href=project["repo_url"])
    if project.get("readme_url"):
        readme = a("| Readme", href=project["readme_url"])
    if "youtube" in project:
        youtube = a("| Video Demo", href=project["youtube"])
    main_url = next(
        (link for link in [project.get(p,"") for p in ["demo_url", "repo_url", "readme_url", "youtube"] if link != ""]), "#"
    )
    main_link = a(title, href=main_url)

    alt_class = "alt" * is_alt_card

    project_card = f"""\
    <div class="blog-card {alt_class}">
    <div class="meta">
      <div class="photo" style="background-image: url({screenshot_url})"></div>
      <ul class="details">
        <li class="author"><a href="https://github.com/kleutzinger">Kevin Leutzinger</a></li>
      </ul>
    </div>
    <div class="description">
      <h1>{main_link} </h1>
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


def generate_sitemap():
    # search from the root of the project for 'index.html' files
    # and generate a sitemap
    urls = []
    for root, dirs, files in os.walk(".."):
        for file in files:
            if file == "index.html":
                path = os.path.join(root, file)
                path = path.replace("../", "https://kevinleutzinger.com/")
                path = path.replace("/index.html", "")
                urls.append(path)
    urls.sort()
    df = pd.DataFrame(urls, columns=["loc"])
    xml_data = df.to_xml(root_name="urlset", row_name="url", xml_declaration=True)
    with open(os.path.join("..", "sitemap.xml"), "w") as f:
        f.write(xml_data)


if __name__ == "__main__":
    generate_css()
    doc = dominate.document(title="Portfolio - kevinleutzinger.com")
    doc["lang"] = "en"

    with doc.head:
        link(rel="stylesheet", href="site-generator/generated/card.css")
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width,initial-scale=1")
        # kevbadge
        raw(KEVBADGE_EMBED_SCRIPT)
        raw(MATOMO_TRACKING)
        # script(type='text/javascript', src='script.js')

    print("getting all rows")
    projects = ingest.get_rows()
    # write project json to file
    with open(os.path.join("generated", "projects.json"), "w") as f:
        json.dump(projects, f, indent=2)

    def order_proj(proj):
        star_rating = int(float(proj.get("star_rating", 0)))
        shine_rating = int(float(proj.get("shine_rating", 0)))
        return (shine_rating + star_rating) / 2

    projects.sort(reverse=True, key=order_proj)
    even_idx = True
    for proj in projects:
        if "kl" in proj.get("omit_from", []):
            continue
        htm = gen_card_html(proj, is_alt_card=even_idx)
        with doc:
            raw(htm)
        even_idx = not even_idx

    with open(os.path.join("..", "index.html"), "w") as f:
        pretty_html = html_prettify(str(doc))
        f.write(pretty_html)
    print("regenerated index at", time.asctime(time.localtime()))
    generate_sitemap()
