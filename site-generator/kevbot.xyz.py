"""generator logic for https://kevbot.xyz

this page is mostly markdown

#__PUBLISH_TO_XYZ__# /home/kevin/gits/kleutzinger.github.io/.venv/bin/python #__file__# && cd /home/kevin/lektor/kev-project-lektor && source ../.venv/bin/activate && lektor build && lektor deploy
"""


import ingest

CONTENTS_LR = "/home/kevin/lektor/kev-project-lektor/content/contents.lr"
TEMPLATE = """
title: Home
---
body:
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
        if "demo_url" in project:
            project["title/link"] = f"[{title}]({project['demo_url']})"
        else:
            project["title/link"] = title
        if "repo_url" in project:
            project["source code"] = f"[source]({project['repo_url']})"
        if "star_rating" in project:
            full_star = "★"
            star_rating = project["star_rating"]
            project["stars"] = full_star * int(star_rating)

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
