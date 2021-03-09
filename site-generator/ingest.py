from gsheets import Sheets
from iterfzf import iterfzf
from pprint import pprint
import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))
with open("portfolio_id.txt", "r") as f:
    PORTFOLIO_ID = f.readlines()[0].strip()
sheets = Sheets.from_files("client_secrets.json")

row_cache = None


def get_rows():
    "get all rows as array of project_dicts"
    global row_cache
    ans = None
    if row_cache:
        ans = row_cache
    else:
        port = sheets.get(PORTFOLIO_ID)[0]
        rows = port.values()
        fields = rows[0]
        ans = []
        for idx, row in enumerate(rows[1:]):
            d = dict({"_id": idx + 1})
            for idx, field in enumerate(fields):
                if len(row) > idx and row[idx] != "":
                    d[field] = row[idx]
            ans.append(d)
        row_cache = ans
    return ans


def header_idxs(rows):
    "parse first row of cells as name for each idx of other rows"
    field_to_idx = dict()
    for idx, val in enumerate(rows[0]):
        field_to_idx[val] = idx
    return field_to_idx


def gen_direct_message(with_source=False):
    "single project text to send to a buddy in a DM"
    projs = get_rows()
    # skip over first row as it is just the column names
    proj_idx = choose_idx([r["title"] for r in projs])
    proj = projs[proj_idx]
    title = proj.get("title", "__title__")
    demo_url = proj.get("demo_url", "")
    message = f"Hey check out {title} at {demo_url}"
    if with_source:
        message += f"  | source code: {proj.get('repo_url', '')}"
    return message


def choose_idx(iterable, multi=False):
    options = [f"{idx} {row}" for (idx, row) in enumerate(iterable)]
    if multi:
        choices = iterfzf(options, multi=True)
        if not choices:
            return []
        return [int(i.split(" ")[0]) for i in choices]
    else:
        choice = iterfzf(options)
        if choice:
            return int(choice.split(" ")[0])


def get_omissions():
    "what to include and not include on a json resume"
    pass


def build_json(rows, ommisions=dict()):
    "turn rows into resume.json, with omissions"
    pass


if __name__ == "__main__":
    while True:
        inp = input("[s]howall | [d]irect msg | [j]son | [q]uit" + " >").lower()
        if "q" in inp:
            exit(0)
        if "d" in inp:
            print(gen_direct_message())
        if "s" in inp:
            pprint(get_rows(), sort_dicts=False)
        if "j" in inp:
            build_json(rows)
        if "i" in inp:
            print(get_info())
