"""generator logic for https://kevbot.xyz

this page is mostly markdown

#__PUBLISH_TO_XYZ__# /home/kevin/.virtualenvs/kleutzinger-github-io/bin/python #__file__# && blog.fish deploy
"""


import ingest

CONTENTS_LR = "/home/kevin/lektor-blog/content/contents.lr"
TEMPLATE = """
title: Kevin's Homepage
---
body:
# [back to my visual portfolio here](https://kevinleutzinger.com)
MARKDOWN
---
alt_note: alt note
"""

"""
| Syntax | Description |
| --- | ----------- |
| Header | Title |
| Paragraph | Text |
"""


def main():
    global TEMPLATE
    projects = ingest.get_rows()
    projects.sort(reverse=True, key=lambda x: x.get("date_created", "0"))
    used_fields = ["date_created", "title/link", "source code"]
    piped = "|".join(used_fields)
    headers = f"|{piped}|"
    spacer = f"|{'---|'*len(used_fields)}"
    output_string = f"{headers}\n{spacer}\n"

    def modify_project(project):
        title = project.get("title", "title")
        title_link = None
        if "demo_url" in project:
            title_link = project["demo_url"]
        if "repo_url" in project:
            project["source code"] = f"[source]({project['repo_url']})"
            title_link = title_link or project["repo_url"]
        if "readme_url" in project:
            title_link = title_link or project["readme_url"]
        if "star_rating" in project:
            full_star = "★"
            star_rating = project["star_rating"]
            project["stars"] = full_star * int(float(star_rating))
        title_link = title_link or "#"
        project["title/link"] = f"[{title}]({title_link})"

        return project

    for project in map(modify_project, projects):
        if "kb" in project.get("omit_from", []):
            continue
        piped = "|".join([str(project.get(f, "")) for f in used_fields])
        vals = f"|{piped}|\n"
        output_string += vals

    with open(CONTENTS_LR, "w") as f:
        f.write(TEMPLATE.replace("MARKDOWN", output_string))


if __name__ == "__main__":
    main()
