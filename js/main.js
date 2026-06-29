(() => {
  // Theme switch
  const body = document.body;
  const lamp = document.getElementById("mode");

  let elem = document.querySelectorAll('figure.highlight')
  elem.forEach(function(item){
    let langName = item.getAttribute('class').split(' ')[1]
    if (langName === 'plain' || langName === undefined) langName = 'Code'
    item.setAttribute('data-lang',langName);
  })

  const toggleTheme = (state) => {
    if (state === "dark") {
      localStorage.setItem("theme", "light");
      body.removeAttribute("data-theme");
    } else if (state === "light") {
      localStorage.setItem("theme", "dark");
      body.setAttribute("data-theme", "dark");
    } else {
      initTheme(state);
    }
  };

  lamp.addEventListener("click", () =>
    toggleTheme(localStorage.getItem("theme"))
  );

  // Blur the content when the menu is open
  const cbox = document.getElementById("menu-trigger");

  cbox.addEventListener("change", function () {
    const area = document.querySelector(".wrapper");
    this.checked
      ? area.classList.add("blurry")
      : area.classList.remove("blurry");
  });

  // TOC generation
  const tocContainer = document.getElementById("toc");
  const postContent = document.querySelector(".wrapper.post .page-content");
  if (tocContainer && postContent) {
    const headings = postContent.querySelectorAll("h1, h2, h3, h4");
    if (headings.length > 0) {
      const list = document.createElement("ul");
      list.className = "toc-list";
      headings.forEach((heading, i) => {
        if (!heading.id) heading.id = "toc-" + i;
        const li = document.createElement("li");
        li.className = "toc-item";
        const a = document.createElement("a");
        a.className = "toc-link toc-" + heading.tagName.toLowerCase();
        a.href = "#" + heading.id;
        a.textContent = heading.textContent;
        a.addEventListener("click", (e) => {
          e.preventDefault();
          heading.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        li.appendChild(a);
        list.appendChild(li);
      });
      tocContainer.appendChild(list);

      // Scroll highlight
      const links = list.querySelectorAll(".toc-link");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const link = list.querySelector(
              'a[href="#' + entry.target.id + '"]'
            );
            if (link) {
              if (entry.isIntersecting) {
                links.forEach((l) => l.classList.remove("active"));
                link.classList.add("active");
              }
            }
          });
        },
        { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
      );
      headings.forEach((h) => observer.observe(h));
    }
  }
})();

