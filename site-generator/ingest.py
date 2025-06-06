from typing import Callable
from iterfzf import iterfzf
from pprint import pprint
import requests
import os
from io import StringIO
import csv

os.chdir(os.path.dirname(os.path.abspath(__file__)))
PORTFOLIO_CSV_URL = "https://docs.google.com/spreadsheets/d/1MVghM465zjbMGB89CwvH-GwfwyLXqHqfY1emM7Mp-uA/export?format=csv"


def get_csv() -> list:
    resp = requests.get(PORTFOLIO_CSV_URL)
    scsv = resp.text

    f = StringIO(scsv)
    reader = csv.reader(f, delimiter=",")
    rows = []
    for row in reader:
        rows.append(row)
        print("\t".join(row))
    return rows


row_cache = None


def parse_or_fallback(field: str, value: str, parse_fn: Callable, fallback: any):
    try:
        return parse_fn(value)
    except:
        return fallback


def comma_separated(val: str) -> list[str]:
    output = []
    for item in val.split(","):
        item = item.strip()
        if item != "":
            output.append(item)
    return output


def get_rows() -> list[dict]:
    "get all rows as array of project_dicts"
    global row_cache
    ans = None
    if row_cache:
        ans = row_cache
    else:
        rows = get_csv()
        fields = rows[0]
        ans = []
        for idx, row in enumerate(rows[1:]):
            d = dict({"_id": idx})
            for idx, field in enumerate(fields):
                if len(row) > idx and row[idx] != "":
                    val = row[idx]
                    if field in ["star_rating", "shine_rating"]:
                        val = parse_or_fallback(field, val, int, -1)
                    # fmt: off
                    if field in ["identifiers", "technologies", "tags", "i_learned", "omit_from"]:
                        val = parse_or_fallback(field, val, comma_separated, [])
                    # fmt: on

                    d[field] = val
                    "now dats"
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
