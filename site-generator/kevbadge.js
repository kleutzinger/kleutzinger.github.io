(function () {
  // "version": "0.0.8",
  const location = new URL(window.location);
  const IS_LOCAL_DEV = ["0.0.0.0", "localhost", "127.0.0.1"].includes(
    location.hostname
  );
  const IS_DEBUG = location.search.includes("debug");
  const IS_KEVINLEUTINGER_HOMEPAGE =
    location.hostname === "kevinleutzinger.com" && location.pathname === "/";
  const IS_KEVINLEUTINGER_SOMEWHERE =
    location.hostname === "kevinleutzinger.com";
  async function get_json() {
    console.time("getting sheet");
    let json_url =
      "https://kevinleutzinger.com/site-generator/generated/projects.json";
    // "https://cdn.jsdelivr.net/gh/kleutzinger/kleutzinger.github.io/site-generator/generated/projects.json";
    if (IS_LOCAL_DEV) {
      // working on a different local project would require using the cdn instead
      // but for now, just use the local file
      json_url = "/site-generator/generated/projects.json";
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
  <p class="kevbadge-button-text">page</p><p class="kevbadge-button-text">info </p>
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
.kevbadge-button-text {
  font-family: monospace;
  margin: 0;
  font-size: 30px;
}
.kevbadge-button {
  height: 6em;
  width: 6em;
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
  font-size: 2em;
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
  background: #fff;
}
.kevbadge-list li {
  margin-bottom: 1em;
  list-style-type: none;
  text-decoration: none;
}

.kevbadge-list a {
  margin-bottom: 1em;
  list-style-type: none;
  text-decoration: none;
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
    /*
    > new URL("https://www.kevbot.xyz/a/b/page.html")
    URL {
      href: 'https://www.kevbot.xyz/a/b/page.html',
      origin: 'https://www.kevbot.xyz',
      protocol: 'https:',
      username: '',
      password: '',
      host: 'www.kevbot.xyz',
      hostname: 'www.kevbot.xyz',
      port: '',
      pathname: '/a/b/page.html',
      search: '',
      searchParams: URLSearchParams {},
      hash: ''
}
    */
    // check for full url match against project.identifiers

    let { hostname, pathname, href } = url;
    // remove trailing slash from pathname
    if (pathname.endsWith("/")) {
      pathname = pathname.slice(0, -1);
    }

    if (hostname === "localhost") {
      // TODO: make this return the correct project on localhost
      hostname = "kevinleutzinger.com";
    }
    // need a override

    // check for hostname + pathname match against project.identifiers
    // e.g. kevinleutzinger.com/hearth
    for (const project of projects) {
      const identifiers = project.identifiers || [];
      if (identifiers.includes(hostname + pathname)) {
        return project;
      }
    }
    // check for hostname match against project.identifiers
    for (const project of projects) {
      // stuff defined by project
      const identifiers = project.identifiers || [];
      if (identifiers.includes(hostname)) {
        return project;
      }
    }
    return {};
  }

  function find_random_valid_project_link(projects) {
    function project_is_valid(project) {
      // return a valid urlstring to redirect to, or return "" if none found
      const tags = project.tags || [];
      const demo_url = project.demo_url || "";
      const omit_from = projects.omit_from || [];
      // list of banned tags
      const banned_tags = ["private", "protected", "personal"];
      if (omit_from.includes("random")) {
        return "";
      }
      if (tags.some((tag) => banned_tags.includes(tag))) {
        return "";
      }
      if (project.broken) {
        return "";
      }
      if (project.demo_url) {
        return demo_url;
      }
      if (project.youtube) {
        return youtube;
      }
      return "";
    }
    let valid_links = projects.map(project_is_valid).filter((x) => x !== "");
    if (IS_DEBUG) {
      console.log(valid_links);
    }
    if (Math.random() < 0.005) {
      // i didn't make this website
      return "https://aaron.work?ref=kevbadge";
    }
    return valid_links[Math.floor(Math.random() * valid_links.length)];
  }

  function handle_js_response(projects) {
    // populate kevbadge-list

    const kevbadge_list = document.querySelector(".kevbadge-list");
    const project = locate_relevant_project(projects);
    if (IS_DEBUG) {
      console.log(project);
    }
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
    // permanent links
    links.push(
      make_link(
        `javascript:var%20KICKASSVERSION='2.0';var%20s%20=%20document.createElement('script');s.type='text/javascript';document.body.appendChild(s);s.src='//hi.kickassapp.com/kickass.js';void(0);`,
        "minigame 🚀"
      )
    );
    links.push(
      make_link(
        `https://github.com/kleutzinger/kleutzinger.github.io/blob/master/site-generator/kevbadge.js`,
        "open source code for this button 🟩"
      )
    );
    links.push(make_link(`https://kevinleutzinger.com`, "Homepage 🏠"));
    links.push(make_link(`https://kevbot.xyz`, "kevbot.xyz 🏠"));
    links.push(
      make_link(
        `${find_random_valid_project_link(projects)}`,
        "go to another random project by kevin 🔀"
      )
    );
    // dynamic links
    if (project.readme_url) {
      links.push(make_link(project.readme_url, "readme for this page 📖"));
    }
    if (project.repo_url) {
      const year = project?.date_created?.split("-")[0];
      links.push(
        make_link(
          project.repo_url,
          "open source code for this page " + (year ? ` (${year})` : "") + " ℹ️"
        )
      );
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
    if (IS_DEBUG) {
      console.log(projects);
    }
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
  }, 10);
})();
