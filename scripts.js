/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
let engine = "duckduckgo"
const engineUrls = {
  google: "https://www.google.com/search?q=",
  duckduckgo: "https://duckduckgo.com/?q=",
  youtube: "https://www.youtube.com/results?q=",
  github: "https://github.com/search?q=",
  stackoverflow: "https://stackoverflow.com/search?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  deepl: "https://www.deepl.com/translator#-/-/",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [
  {
    id: "ybJrFH35FmdI0dOc",
    label: "Study",
    bookmarks: [
      {
        id: "vuljUCL4UQ9HuZ2J",
        label: "alura",
        url: "https://cursos.alura.com.br/dashboard",
      },
      {
        id: "imShpXZboXqLF39K",
        label: "blackboard",
        url: "https://mymasonportal.gmu.edu",
      },
      {
        id: "eKPGRPmaTcyDzb6f",
        label: "piazza",
        url: "https://piazza.com/class/l6mwp0wb7b57eq",
      },
    ],
  },
  {
    id: "3HM2nYTbdZB1kMXp",
    label: "personal",
    bookmarks: [
      {
        id: "eKpfFbNAcXC8YEKJ",
        label: "calendar",
        url: "https://calendar.google.com/calendar",
      },
      {
        id: "uPORlgoCHNKJMoxk",
        label: "github",
        url: "https://github.com",
      },
      {
        id: "CaWzmdttITSGGR1C",
        label: "drive",
        url: "https://drive.google.com",
      },
    ],
  },
  {
    id: "GNOOfV8rRLmN6lPI",
    label: "media",
    bookmarks: [
      {
        id: "VPAowMC2dsqY0vQ3",
        label: "youtube",
        url: "https://www.youtube.com",
      },
      {
        id: "82TRQKHy9Uu3rUmh",
        label: "twitch",
        url: "https://twitch.com",
      },
      {
        id: "gMOT2wHDfyMzMzuy",
        label: "reddit",
        url: "https://reddit.com",
      },
    ],
  },
  {
    id: "mcVg4fL2hZja0yW7",
    label: "misc",
    bookmarks: [
      {
        id: "nD2swQlN9cR5TMhv",
        label: "studio",
        url: "https://studio.youtube.com",
      },
      {
        id: "5Gqj1OX6fMpsOXvN",
        label: "mail",
        url: "https://outlook.office.com/mail/?actSwt=true",
      },
    ],
  },
];

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

const injectEngines = () => {
  let enginesContainer = document.getElementById("engines");
  const engineTexts = createEngineTexts(enginesContainer);
  enginesContainer.append(...engineTexts);
  engineTexts[0].click();
}



const createEngineTexts = (enginesContainer) => {

  const engineTexts = [];
    Object.keys(engineUrls).forEach(key => {
    const engineText = document.createElement("span");
    engineText.innerHTML = `  ${key}  `;
    engineText.style.color = "#659835";
    engineText.style.display = "inline";
    engineText.style.margin = "0px 10px"; // Add 10px margin on sides
    engineText.style.cursor = "pointer"; // Add cursor pointer
    engineText.onmouseover = () => {
      engineText.innerHTML = `> ${key} <`; // Add ">" and "<" as hover effect
    };
    engineText.onmouseout = () => {
      engineText.innerHTML = `  ${key}  `; // Reset the text on mouseout
    };
    engineText.onclick = () => {
      engine = key;
      searchInput.placeholder = `Search on ${key}`;
      // Remove underline from all engine texts
        enginesContainer.querySelectorAll("span").forEach(text => {
        text.style.textDecoration = "none";
      });
      // Underline the selected engine text
      engineText.style.textDecoration = "underline";
    };
    engineTexts.push(engineText);
  });
  return engineTexts;
};

injectBookmarks()
injectEngines()
engine
