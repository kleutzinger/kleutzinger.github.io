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
    used_fields = ["date_created", "title"]
    piped = "|".join(used_fields)
    headers = f"|{piped}|"
    spacer = f"|{'---|'*len(used_fields)}"
    output_string = f"{headers}\n{spacer}\n"

    def modify_project(project):
        if "demo_url" not in project:
            return project
        title = project.get('title', 'title')
        project["title"] = f"[{title}]({project['demo_url']})"
        return project

    for project in map(modify_project, projects):
        if "kb" in project.get("omit_from", []):
            continue
        piped = "|".join([project.get(f, "") for f in used_fields])
        vals = f"|{piped}|\n"
        output_string += vals

    with open(CONTENTS_LR, "w") as f:
        f.write(TEMPLATE.replace("MARKDOWN", output_string))


if __name__ == "__main__":
    main()
