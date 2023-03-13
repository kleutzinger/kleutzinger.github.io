(function () {
  const location = new URL(window.location);
  const IS_LOCAL_DEV = ["0.0.0.0", "localhost", "127.0.0.1"].includes(
    location.hostname
  );
  const IS_KEVINLEUTINGER_HOMEPAGE =
    location.hostname === "kevinleutzinger.com" && location.pathname === "/";
  const IS_KEVINLEUTINGER_SOMEWHERE =
    location.hostname === "kevinleutzinger.com";
  async function get_json() {
    console.time("getting sheet");
    let json_url =
      "https://cdn.jsdelivr.net/gh/kleutzinger/kleutzinger.github.io/site-generator/generated/projects.json";
    debugger;
    // if (IS_KEVINLEUTINGER_SOMEWHERE) {
    // }
    if (IS_LOCAL_DEV) {
      // working on a different local project would require using the cdn instaed
      // but for now, just use the local file
      // json_url = "/site-generator/generated/projects.json";
      document.body.style.background = "red";
    }
    const response = await fetch(json_url);
    const data = await response.json();
    console.timeEnd("getting sheet");
    return data;
  }

  const htmlstr = `
<div class="kevbadge-button-wrapper">
  <ul class="kevbadge-list expanded">
    <!-- list will go here--!>
  </ul>
  <button class="kevbadge-button">
    <span>👨‍💻</span>
  </button>
</div>`;

  const styles = `
.kevbadge-button-wrapper {
  position: fixed;
  bottom: 0px;
  right: 0px;
  text-align: right;
  z-index: 999;
}
.kevbadge-button {
  height: 6em;
  width: 6em;
  font-size: 14px;
  border: 0 none;
  background: #72ab59;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  transform: scale(1);
  transition: all 200ms ease;
}
.kevbadge-button:hover,
.kevbadge-button:focus,
.kevbadge-button:active {
  box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2);
  outline: 0;
}
.kevbadge-button span {
  display: block;
  font-size: 3em;
  transform: scale(1);
  transition: transform 100ms ease;
}
.kevbadge-button:hover span,
.expanded .kevbadge-button span,
.expanded .kevbadge-button span {
  transform: scale(1.25);
}
.expanded .kevbadge-button {
  transform: scale(0.5);
  color: rgba(255, 255, 255, 0.5);
  background: #ffaa00;
}
.kevbadge-list {
  list-style: none;
  padding: 0;
  margin: 0;
  transition: all 200ms ease;
  transform: translate(0, 90px) scale(0.5);
  transform-origin: bottom center;
  opacity: 0;
}
.expanded .kevbadge-list {
  transform: translate(0px, 20px) scale(1);
  opacity: 1;
}
.kevbadge-list li {
  margin-bottom: 1em;
}
.kevbadge-list a {
  color: #212121;
}

`;

  function strToElement(
    s = "",
    c,
    t = document.createElement("template"),
    l = "length"
  ) {
    t.innerHTML = s.trim();
    c = [...t.content.childNodes];
    return c[l] > 1 ? c : c[0] || "";
  }

  const make_link = (url, text) => {
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.innerText = text;
    return a;
  };

  function locate_relevant_project(projects) {
    // given we are on some webpage, find the relevant project, if it exists
    // stuff defined by page
    const url = new URL(window.location.href);
    let hostname = url.hostname;
    if (hostname === "localhost") {
      // TODO: make this return the correct project on localhost
      hostname = "kevinleutzinger.com";
    }
    // need a override

    for (const project of projects) {
      // stuff defined by project
      const identifiers = project.identifiers || [];
      if (identifiers.includes(hostname)) {
        return project;
      }
    }
    return {};
  }

  function handle_js_response(projects) {
    // populate kevbadge-list

    const kevbadge_list = document.querySelector(".kevbadge-list");
    const project = locate_relevant_project(projects);
    // function that makes links from a url and a text
    const make_list = (links) => {
      const ul = document.createElement("ul");
      links.forEach((link) => {
        const li = document.createElement("li");
        li.appendChild(link);
        ul.appendChild(li);
      });
      return ul;
    };
    const links = [];
    links.push(
      make_link(
        `javascript:var%20KICKASSVERSION='2.0';var%20s%20=%20document.createElement('script');s.type='text/javascript';document.body.appendChild(s);s.src='//hi.kickassapp.com/kickass.js';void(0);`,
        "Destroy This Page"
      )
    );
    if (project.repo_url) {
      links.push(make_link(project.repo_url, "Source Code"));
    }
    kevbadge_list.appendChild(make_list(links));
  }

  let loaded = false;
  async function main() {
    loaded = true;
    var styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    const full_badge_html = strToElement(htmlstr);
    document.body.appendChild(full_badge_html);
    full_badge_html
      .querySelector(".kevbadge-button")
      .addEventListener("click", () => {
        // toggle class on buttton
        document
          .querySelector(".kevbadge-button-wrapper")
          .classList.toggle("expanded");
      });

    const projects = await get_json();
    console.log(projects);
    handle_js_response(projects);
  }

  document.addEventListener("DOMContentLoaded", async function (event) {
    if (loaded) {
      return;
    }
    await main();
  });

  setTimeout(() => {
    if (!loaded) {
      main();
    }
  }, 1000);
})();
