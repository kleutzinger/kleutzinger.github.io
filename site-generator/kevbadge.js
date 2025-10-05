(function () {
  // "version": "0.0.19",
  const location = new URL(window.location);
  const IS_LOCAL_DEV = ["0.0.0.0", "localhost", "127.0.0.1"].includes(
    location.hostname,
  );
  const IS_DEBUG = location.search.includes("debug");
  async function get_json() {
    let json_url =
      "https://kevinleutzinger.com/site-generator/generated/projects.json";
    try {
      const response = await fetch(json_url);
      const data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  const htmlstr = `
<div class="kevbadge-button-wrapper">
  <ul class="kevbadge-list expanded">
    <!-- list will go here--!>
  </ul>
  <button class="kevbadge-button">
  <p class="kevbadge-button-text">info</p>
  </button>
</div>`;

  const styles = `
.kevbadge-button-wrapper {
  position: fixed;
  bottom: 8px;
  right: 8px;
  text-align: right;
  z-index: 999;
}
.kevbadge-button-text {
  font-family: monospace;
  margin: 0;
  font-size: 14px;
  line-height: 1;
  display: inline-block;
  font-weight: 600;
}
.kevbadge-button {
  height: 2em;
  width: 4em;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: ${IS_LOCAL_DEV ? "red" : "#72ab59"};
  color: #fff;
  cursor: pointer;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.15);
  transform: rotate(0deg);
  transition: all 200ms ease;
  padding: 0;
  border-radius: 1em;
  backdrop-filter: blur(4px);
}
.kevbadge-button:hover,
.kevbadge-button:focus,
.kevbadge-button:active {
  background: ${IS_LOCAL_DEV ? "red" : "#72ab59"};
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.25);
  outline: 0;
}
.kevbadge-button span {
  display: block;
  font-size: 2em;
  transform: scale(1);
  transition: transform 100ms ease;
}
.kevbadge-button:hover span {
  transform: scale(1.1);
}
.expanded .kevbadge-button {
  transform: scale(0.8);
  background: rgba(255, 170, 0, 0.85);
}
.kevbadge-list {
  padding: 0;
  margin: 0;
  transition: all 200ms ease;
  transform: translate(0, 60px) scale(0.5);
  transform-origin: bottom right;
  opacity: 0;
  display: none;
}
.expanded .kevbadge-list {
  transform: translate(0px, -10px) scale(1);
  opacity: 1;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  max-height: 80vh;
  overflow-y: auto;
}
.kevbadge-list li {
  margin-bottom: 1em;
  list-style-type: none;
  text-decoration: none;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 300px;
}

.kevbadge-list a {
  margin-bottom: 1em;
  list-style-type: none;
  text-decoration: none;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
.kevbadge-list a {
  color: #212121;
}
.kevbadge-list h3 {
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 300px;
  margin: 0 0 0.5em 0;
}

`;

  function strToElement(
    s = "",
    c,
    t = document.createElement("template"),
    l = "length",
  ) {
    t.innerHTML = s.trim();
    c = [...t.content.childNodes];
    return c[l] > 1 ? c : c[0] || "";
  }

  const toSimpleChars = (str) => str.replace(/[^a-zA-Z0-9\s.]/g, "");

  const make_h3 = (text) => {
    const h3 = document.createElement("h3");
    h3.innerText = text;
    return h3;
  };

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
      const youtube = projects.youtube || "";
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
      // send them to aaron santiago's website
      return "https://aaron.work?ref=kevbadge";
    }
    return valid_links[Math.floor(Math.random() * valid_links.length)];
  }

  function handle_js_response(projects) {
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
        "minigame 🚀",
      ),
    );
    links.push(
      make_link(
        `https://github.com/kleutzinger/kleutzinger.github.io/blob/master/site-generator/kevbadge.js`,
        "open source code for this button 🟩",
      ),
    );
    links.push(make_link(`https://kevinleutzinger.com`, "Homepage 🏠"));
    links.push(make_link(`https://kevbot.xyz`, "kevbot.xyz 🏠"));
    links.push(make_link(`https://status.kevbot.xyz/`, "Status Page ✅"));
    links.push(
      make_link(
        `${find_random_valid_project_link(projects)}`,
        "go to another random project by kevin 🔀",
      ),
    );
    // dynamic links
    if (project.readme_url) {
      links.push(make_link(project.readme_url, "readme for this page 📖"));
    }
    if (project.repo_url) {
      const year = project?.date_created?.split("-")[0];
      links.unshift(
        make_link(
          project.repo_url,
          "open source code for this page " +
            (year ? ` [${year}]` : "") +
            " ℹ️",
        ),
      );
    }
    if (project.web_description) {
      const simpleDescription = toSimpleChars(project.web_description);
      links.unshift(make_h3(simpleDescription));
      // also set title property of kevbadge-button to this text
      document.querySelector(".kevbadge-button").title =
        `${simpleDescription}\n\n Click for more info`;
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
      .addEventListener("click", (e) => {
        e.stopPropagation();
        // toggle display of kevbadge-list
        // todo: make the animation work again
        const kevbadge_list = document.querySelector("ul.kevbadge-list");
        if (kevbadge_list.style.display === "block") {
          kevbadge_list.style.display = "none";
        } else {
          kevbadge_list.style.display = "block";
        }
        // toggle expanded class on kevbadge-button-wrapper
        document
          .querySelector(".kevbadge-button-wrapper")
          .classList.toggle("expanded");
      });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      const wrapper = document.querySelector(".kevbadge-button-wrapper");
      const kevbadge_list = document.querySelector("ul.kevbadge-list");
      if (wrapper && !wrapper.contains(e.target) && kevbadge_list.style.display === "block") {
        kevbadge_list.style.display = "none";
        wrapper.classList.remove("expanded");
      }
    });

    const projects = await get_json();
    if (IS_DEBUG) {
      console.log(projects);
    }
    handle_js_response(projects);
  }

  document.addEventListener("DOMContentLoaded", async function () {
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
