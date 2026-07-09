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
      return '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path></svg>';
    }

    if (key.indexOf("github") !== -1) {
      return '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1.3-3.7c4.3-.5 8.8-2.1 8.8-9.5A7.4 7.4 0 0 0 20.5 0c.2.5.8 2.4-.2 4.8a10.2 10.2 0 0 0-8.6 0C10.7 2.4 11.3.5 11.5 0a7.4 7.4 0 0 0-2 4.8c0 7.4 4.5 9 8.8 9.5A4.8 4.8 0 0 0 17 18v4"></path><path d="M9 18c-4.5 2-4.5-2-6-2"></path></svg>';
    }

    if (key.indexOf("scholar") !== -1) {
      return '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 2 8l10 5 10-5-10-5Z"></path><path d="M6 10.5V15c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5"></path></svg>';
    }

    return '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.1 0l2.1-2.1a5 5 0 0 0-7.1-7.1L11 4.9"></path><path d="M14 11a5 5 0 0 0-7.1 0l-2.1 2.1a5 5 0 0 0 7.1 7.1L13 19.1"></path></svg>';
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
      var rawHref = contact.href || "#";
      var wrapper = document.createElement("a");
      wrapper.className = "link-row";
      wrapper.href = rawHref;
      externalize(wrapper, rawHref);

      var icon = document.createElement("span");
      icon.className = "link-icon";
      icon.innerHTML = iconFor(contact.label);

      var value = document.createElement("span");
      value.className = "val";
      value.textContent = contact.text || contact.label;

      wrapper.appendChild(icon);
      wrapper.appendChild(value);
      contactList.appendChild(wrapper);
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

  renderProfile(siteData.profile);
  renderOverview(siteData.overview);
  renderMoreAbout(siteData.moreAbout);
  renderPublications(siteData.publications);
  setText("footer-text", siteData.footerText);
})();
