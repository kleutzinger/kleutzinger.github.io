import os


os.system("pwd")
os.system("marked projects.md > test.txt")
with open('./test.txt', 'r') as content_file:
    content = content_file.read()
    html = """<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Projects by Kevin</title>
  <meta name="description" content="Davis Super Smash Bros Melee Club">
  <link rel="shortcut icon" href="./favicon.ico" />
  <link rel="stylesheet" href="./style.css?v=1.0">
  <base target="main">
  <!--[if lt IE 9]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
</head>
<body>
    <div id="mainBox">
    
    {0}
    
</div> <!-- end div mainBox -->
    <div id="bgimage"></div>
</body>
</html>""".format(content)
    with open("index.html", "w") as text_file:
        print(html, file=text_file)
