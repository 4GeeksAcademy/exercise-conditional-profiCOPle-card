import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should show the cover image
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "right", // social media bar position (left or right)
        
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastName: null,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables);

  // Validate and set cover image
  let cover = `<div class="cover"><img src="${variables.background ||
    ""}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";

  // Validate social media links
  const getSocialMediaLink = (platform, username) => {
    const platforms = {
      twitter: "https://twitter.com/",
      github: "https://github.com/",
      linkedin: "https://linkedin.com/in/",
      instagram: "https://instagram.com/"
    };

    return username
      ? `<li><a href="${platforms[platform]}${username}" target="_blank"><i class="fab fa-${platform}"></i></a></li>`
      : `<li class="hidden"><a href="#"><i class="fab fa-${platform}"></i></a></li>`;
  };

  // Format name display
  const formatName = (name, lastName) => {
    if (!name && !lastName) return "Your name here";
    return `${name || ""} ${lastName || ""}`.trim();
  };

  // Format location display
  const formatLocation = (city, country) => {
    if (!city && !country) return "";
    return `${city || ""}, ${country || ""}`
      .replace(/, $/, "")
      .replace(/^, /, "");
  };

  // Reset the website body with the new html output
  document.querySelector("#widget_content").innerHTML = `
        <div class="widget">
          ${cover}
          <img src="${variables.avatarURL ||
            "https://randomuser.me/api/portraits/lego/1.jpg"}" class="photo" />
          <h1>${formatName(variables.name, variables.lastName)}</h1>
          <h2>${variables.role || "Your role here"}</h2>
          <h3>${formatLocation(variables.city, variables.country)}</h3>
          <ul class="${variables.socialMediaPosition || "position-left"}">
            ${getSocialMediaLink("twitter", variables.twitter)}
            ${getSocialMediaLink("github", variables.github)}
            ${getSocialMediaLink("linkedin", variables.linkedin)}
            ${getSocialMediaLink("instagram", variables.instagram)}
          </ul>
        </div>
      `;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    includeCover: true,
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    socialMediaPosition: "position-left",
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables);

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      const attribute = e.target.getAttribute("for");
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values));
    });
  });
};
