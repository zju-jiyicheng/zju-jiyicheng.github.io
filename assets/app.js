(function () {
  var siteData = window.SITE_DATA;

  if (!siteData) {
    return;
  }

  function setText(id, value) {
    var element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    }
  }

  function createLink(linkData, className) {
    var link = document.createElement("a");
    var rawHref = linkData.href || "#";
    link.className = className;
    link.href = rawHref;
    link.textContent = linkData.label ? linkData.label : linkData.text;

    if (rawHref !== "#" && !rawHref.startsWith("mailto:")) {
      link.target = "_blank";
      link.rel = "noreferrer";
    }

    return link;
  }

  function renderProfile(profile) {
    setText("brand-name", profile.name);
    setText("profile-name", profile.name);
    setText("profile-name-native", profile.nativeName);
    setText("profile-headline", profile.headline);
    setText("profile-status", profile.status);
    setText("last-updated", profile.lastUpdated);

    var avatar = document.getElementById("profile-avatar");
    if (avatar && profile.avatar) {
      avatar.src = profile.avatar;
    }

    document.title = profile.name + " | Academic Resume";

    var introContainer = document.getElementById("profile-intro");
    profile.intro.forEach(function (paragraph) {
      var item = document.createElement("p");
      if (typeof paragraph === "string") {
        item.textContent = paragraph;
      } else if (paragraph && paragraph.html) {
        item.innerHTML = paragraph.html;
      }
      introContainer.appendChild(item);
    });

    var interestList = document.getElementById("interest-list");
    profile.interests.forEach(function (interest) {
      var item = document.createElement("li");
      item.textContent = interest;
      interestList.appendChild(item);
    });

    var contactList = document.getElementById("contact-list");
    profile.contacts.forEach(function (contact) {
      var rawHref = contact.href || "#";
      var wrapper = document.createElement("a");
      wrapper.className = "contact-pill";
      wrapper.href = rawHref;
      wrapper.innerHTML =
        "<span>" + contact.label + "</span><strong>" + contact.text + "</strong>";

      if (rawHref !== "#" && !rawHref.startsWith("mailto:")) {
        wrapper.target = "_blank";
        wrapper.rel = "noreferrer";
      }

      contactList.appendChild(wrapper);
    });
  }

  function renderPublications(publications) {
    var list = document.getElementById("publication-list");

    if (!publications.length) {
      var emptyState = document.createElement("article");
      emptyState.className = "publication-card publication-card-empty";
      emptyState.innerHTML =
        '<div class="publication-content"><div class="publication-badges"><span class="badge badge-muted">Soon</span></div><h3>Publications will be updated soon.</h3><p class="publication-description">This section is reserved for papers and selected research outputs. I will add detailed entries, figures, and links later.</p></div>';
      list.appendChild(emptyState);
      return;
    }

    publications.forEach(function (publication, index) {
      var article = document.createElement("article");
      article.className = "publication-card";

      var media = document.createElement("div");
      media.className = "publication-media";

      var image = document.createElement("img");
      image.src = publication.image;
      image.alt = publication.title + " cover";
      media.appendChild(image);

      var content = document.createElement("div");
      content.className = "publication-content";

      var badgeRow = document.createElement("div");
      badgeRow.className = "publication-badges";

      var order = document.createElement("span");
      order.className = "badge badge-muted";
      order.textContent = String(index + 1).padStart(2, "0");

      var venue = document.createElement("span");
      venue.className = "badge";
      venue.textContent = publication.venue;

      var year = document.createElement("span");
      year.className = "badge badge-outline";
      year.textContent = publication.year;

      badgeRow.appendChild(order);
      badgeRow.appendChild(venue);
      badgeRow.appendChild(year);

      var title = document.createElement("h3");
      title.textContent = publication.title;

      var authors = document.createElement("p");
      authors.className = "publication-authors";
      authors.textContent = publication.authors;

      var description = document.createElement("p");
      description.className = "publication-description";
      description.textContent = publication.description;

      var linkRow = document.createElement("div");
      linkRow.className = "publication-links";
      publication.links.forEach(function (linkData) {
        linkRow.appendChild(createLink(linkData, "text-link"));
      });

      content.appendChild(badgeRow);
      content.appendChild(title);
      content.appendChild(authors);
      content.appendChild(description);
      content.appendChild(linkRow);

      article.appendChild(media);
      article.appendChild(content);
      list.appendChild(article);
    });
  }

  renderProfile(siteData.profile);
  renderPublications(siteData.publications);
  setText("footer-text", siteData.footerText);
})();
