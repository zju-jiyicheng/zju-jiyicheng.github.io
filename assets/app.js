(function () {
  var siteData = window.SITE_DATA;

  if (!siteData) {
    return;
  }

  function setText(id, value) {
    var element = document.getElementById(id);
    if (element) {
      element.textContent = value || "";
    }
  }

  function clear(element) {
    if (element) {
      element.textContent = "";
    }
  }

  function externalize(link, href) {
    if (href && href !== "#" && !href.startsWith("mailto:")) {
      link.target = "_blank";
      link.rel = "noreferrer";
    }
  }

  function iconFor(label) {
    var key = (label || "").toLowerCase();

    if (key.indexOf("mail") !== -1) {
      return '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1.1v11.8A1 1 0 0 1 21 19H3a1 1 0 0 1-1-1.1V6.1A1 1 0 0 1 3 5Zm9 7.2L4.5 7H4v.4l8 5.6 8-5.6V7h-.5L12 12.2Z"></path></svg>';
    }

    if (key.indexOf("github") !== -1) {
      return '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.2.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.2 11.2 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6A12 12 0 0 0 12 .5Z"></path></svg>';
    }

    if (key.indexOf("linkedin") !== -1) {
      return '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9.5h4v11H3v-11Zm6.2 0h3.8v1.5h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6v5.4h-4v-4.8c0-1.1 0-2.6-1.6-2.6s-1.9 1.2-1.9 2.5v4.9h-4v-11Z"></path></svg>';
    }

    if (key.indexOf("scholar") !== -1) {
      return '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M12 3 1.8 7.7 12 12.4l8-3.7V15h2V7.7L12 3Z"></path><path d="M5 11.4v3.3c0 1.8 3.1 3.3 7 3.3s7-1.5 7-3.3v-3.3l-7 3.2-7-3.2Z"></path></svg>';
    }

    if (key.indexOf("xiaohongshu") !== -1 || key.indexOf("rednote") !== -1) {
      return '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm3 5h8V7H8v2Zm0 4h6v-2H8v2Zm0 4h8v-2H8v2Z"></path></svg>';
    }

    return '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.1 0l2.1-2.1a5 5 0 0 0-7.1-7.1L11 4.9l1.4 1.4 1.1-1.1a3 3 0 0 1 4.2 4.2l-2.1 2.1a3 3 0 0 1-4.2 0L10 8.8 8.6 10.2 10 13Z"></path><path d="M14 11a5 5 0 0 0-7.1 0l-2.1 2.1a5 5 0 0 0 7.1 7.1l1.1-1.1-1.4-1.4-1.1 1.1a3 3 0 1 1-4.2-4.2l2.1-2.1a3 3 0 0 1 4.2 0l1.4 1.4 1.4-1.4L14 11Z"></path></svg>';
  }

  function createTextLink(linkData, className) {
    var link = document.createElement("a");
    var rawHref = linkData.href || "#";
    link.className = className;
    link.href = rawHref;
    link.textContent = "[ " + (linkData.label || linkData.text || "link") + " ]";
    externalize(link, rawHref);
    return link;
  }

  function createContactRow(label, href, ariaLabel, isLink) {
    var row = document.createElement(isLink ? "a" : "div");
    row.className = "link-row";

    if (isLink) {
      row.href = href || "#";
      row.setAttribute("aria-label", ariaLabel || label);
      externalize(row, row.href);
    } else {
      row.classList.add("contact-location");
    }

    var icon = document.createElement("span");
    icon.className = "link-icon";
    icon.innerHTML = iconFor(label);

    var value = document.createElement("span");
    value.className = "val";
    value.textContent = label;

    row.appendChild(icon);
    row.appendChild(value);
    return row;
  }

  function renderProfile(profile) {
    setText("profile-name", profile.name);
    setText("profile-name-native", profile.nativeName);
    setText("profile-headline", profile.headline);
    setText("profile-status", profile.status);
    setText("last-updated", profile.lastUpdated);

    var avatar = document.getElementById("profile-avatar");
    if (avatar && profile.avatar) {
      avatar.src = profile.avatar;
      avatar.alt = profile.name + " portrait";
    }

    document.title = profile.name + " | Academic Homepage";

    var introContainer = document.getElementById("profile-intro");
    clear(introContainer);
    (profile.intro || []).forEach(function (paragraph, index) {
      var item = document.createElement("p");
      if (index === 0) {
        item.className = "lead";
      }

      if (typeof paragraph === "string") {
        item.textContent = paragraph;
      } else if (paragraph && paragraph.html) {
        item.innerHTML = paragraph.html;
      }

      introContainer.appendChild(item);
    });

    var interestList = document.getElementById("interest-list");
    clear(interestList);
    (profile.interests || []).forEach(function (interest) {
      var item = document.createElement("span");
      item.className = "chip";
      item.textContent = interest;
      interestList.appendChild(item);
    });

    var contactList = document.getElementById("contact-list");
    clear(contactList);

    (profile.contacts || []).forEach(function (contact) {
      contactList.appendChild(createContactRow(contact.label || contact.text, contact.href, contact.text, true));
    });
  }

  function renderOverview(overview) {
    if (!overview) {
      return;
    }

    setText("overview-title", overview.title);

    var overviewImage = document.getElementById("overview-image");
    if (overviewImage && overview.image) {
      overviewImage.src = overview.image;
      overviewImage.alt = overview.title + " teaser";
    }
  }

  function renderMoreAbout(moreAbout) {
    var section = document.getElementById("more-about-me");
    var copy = document.getElementById("more-about-copy");
    var gallery = document.getElementById("more-about-gallery");

    if (!section || !gallery || !moreAbout || !moreAbout.images || !moreAbout.images.length) {
      return;
    }

    section.hidden = false;
    setText("more-about-copy", moreAbout.intro);
    clear(gallery);

    (moreAbout.images || []).forEach(function (item, index) {
      var figure = document.createElement("figure");
      figure.className = "more-photo";

      var image = document.createElement("img");
      image.src = item.src;
      image.alt = item.alt || "More About Me photo " + (index + 1);
      image.loading = "lazy";
      image.decoding = "async";

      figure.appendChild(image);
      gallery.appendChild(figure);
    });

    if (!moreAbout.intro && copy) {
      copy.hidden = true;
    }
  }

  function renderExperience(groups) {
    var list = document.getElementById("experience-list");
    clear(list);

    if (!list || !groups || !groups.length) {
      return;
    }

    groups.forEach(function (group) {
      var block = document.createElement("section");
      block.className = "tl-group";

      var heading = document.createElement("h3");
      heading.textContent = group.group;
      block.appendChild(heading);

      var timeline = document.createElement("div");
      timeline.className = "tl";

      (group.items || []).forEach(function (item) {
        var entry = document.createElement("article");
        entry.className = "tl-item";

        var role = document.createElement("div");
        role.className = "role";
        role.textContent = item.role;

        var when = document.createElement("span");
        when.className = "when";
        when.textContent = item.time;
        role.appendChild(when);

        entry.appendChild(role);

        if (item.detail) {
          var detail = document.createElement("div");
          detail.className = "detail";
          detail.textContent = item.detail;
          entry.appendChild(detail);
        }

        timeline.appendChild(entry);
      });

      block.appendChild(timeline);
      list.appendChild(block);
    });
  }

  function renderPublications(publications) {
    var list = document.getElementById("publication-list");
    clear(list);

    if (!publications || !publications.length) {
      var emptyState = document.createElement("article");
      emptyState.className = "publication-card publication-card-empty";
      emptyState.innerHTML =
        '<div class="publication-content"><div class="publication-title">Publications will be updated soon.</div><p class="publication-description">This section is reserved for selected papers and research outputs.</p></div>';
      list.appendChild(emptyState);
      return;
    }

    publications.forEach(function (publication) {
      var article = document.createElement("article");
      article.className = "publication-card";

      var media = document.createElement("div");
      media.className = "publication-media";

      var image = document.createElement("img");
      image.src = publication.image;
      image.alt = publication.title + " figure";
      media.appendChild(image);

      var content = document.createElement("div");
      content.className = "publication-content";

      var title = document.createElement("div");
      title.className = "publication-title";
      title.textContent = publication.title;

      var authors = document.createElement("div");
      authors.className = "publication-authors";
      if (publication.authorsHtml) {
        authors.innerHTML = publication.authorsHtml;
      } else if (publication.authors) {
        authors.innerHTML = publication.authors;
      }

      var description = document.createElement("p");
      description.className = "publication-description";
      if (publication.description) {
        description.textContent = publication.description;
      }

      var meta = document.createElement("div");
      meta.className = "publication-meta";

      var venue = document.createElement("span");
      venue.className = "venue";
      venue.textContent = [publication.venue, publication.year].filter(Boolean).join(" ");
      meta.appendChild(venue);

      (publication.links || []).forEach(function (linkData) {
        meta.appendChild(createTextLink(linkData, "text-link"));
      });

      content.appendChild(title);
      content.appendChild(authors);
      if (publication.description) {
        content.appendChild(description);
      }
      content.appendChild(meta);

      article.appendChild(media);
      article.appendChild(content);
      list.appendChild(article);
    });
  }

  function initTabs() {
    var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));
    var views = Array.prototype.slice.call(document.querySelectorAll(".view"));

    function activate(name, shouldScroll) {
      tabs.forEach(function (tab) {
        var active = tab.dataset.view === name;
        tab.classList.toggle("active", active);
        tab.setAttribute("aria-selected", active ? "true" : "false");
      });

      views.forEach(function (view) {
        var active = view.id === "view-" + name;
        view.classList.toggle("active", active);
        view.hidden = !active;
      });

      document.body.classList.toggle("hide-news", name !== "home");

      if (shouldScroll) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        activate(tab.dataset.view, true);
      });
    });

    activate("home", false);
  }

  renderProfile(siteData.profile);
  renderOverview(siteData.overview);
  renderMoreAbout(siteData.moreAbout);
  renderExperience(siteData.experience);
  renderPublications(siteData.publications);
  setText("footer-text", siteData.footerText);
  initTabs();
})();
