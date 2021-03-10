## Files

`generate.py` --> Main entrypoint for generating new `index.html`. Run it any time you make a change to your spreadsheet  
`ingest.py` --> Pulls data from google sheet specified in `./portfolio_id.txt`  
`watch.sh` --> Watches for changes in .py and .scss files and regenerates ../index.html

## Fields

title star_rating presentation tags repo_url demo_url date_created screenshot_url omit_from youtube icon technologies web_description resume_description Friend descriptin special_story readme collaborators

# TODO

- [x] pull from google sheets
- [x] add site-generator/ into kleutzinger.io repo
- [x] re-order / sort projects by star_rating then shine_rating
- [ ] Add floating badge to page
- [x] add image of me / sidebar banner
      [x] with github
- [x] add header / explain this is portfolio
- [x] set as homepage for kevinleutzinger.com
- [ ] deploy script (send to github pages)
- - [ ] show confirmation / diff?
- [ ] build https://blog.kevbot.xyz markdown
- [x] prettify html output
- [ ] move screenshots off imgur
