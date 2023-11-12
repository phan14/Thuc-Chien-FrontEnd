// const BASE_URL = "https://apiforlearning.zendvn.com/api/v2/";

const API = axios.create({
  baseURL: "https://apiforlearning.zendvn.com/api/v2/",
});

dayjs.extend(window.dayjs_plugin_relativeTime);
dayjs.locale("vi");

const elMainMenu = document.getElementById("mainMenu");
const elArticlesTrending = document.getElementById("articlesTrending");
const elArticlesNew = document.getElementById("articlesNew");
const elArticlesNewLarge = document.getElementById("articlesNewLarge");
const elCatagoriesFeaturedWithArticles = document.getElementById(
  "catagoriesFeaturedWithArticles"
);
const elCcategoriesFeaturedTab = document.getElementById(
  "categoriesFeaturedTab"
);

const elCategoriesFeaturedTabContent = document.getElementById(
  "categoriesFeaturedTabContent"
);

const elarticlesSlider = document.getElementById("articlesSlider");

// ///////////////////////////////////////

API.get("categories_news").then((response) => {
  const data = response.data;
  const categories = data.data;

  let htmlMenu = "";
  let htmlMenuOther = "";
  categories.forEach((item, index) => {
    if (index < 3) {
      htmlMenu += `<li><a href="category.html?id=${item.id}">${item.name}</a></li>`;
    } else {
      htmlMenuOther += `<li><a href="category.html?id=${item.id}">${item.name}</a></li>`;
    }
  });

  elMainMenu.innerHTML =
    htmlMenu +
    /*html*/ `
      <li class="dropdown">
        <a href="#"><span>Danh mục khác</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
        <ul>
          ${htmlMenuOther}
        </ul>
      </li>`;
});

// slide
API.get("articles/popular?limit=4").then((response) => {
  const articles = response.data.data;
  let html = " ";

  articles.forEach((item, index) => {
    html += /* html */ `
    <div class="swiper-slide">
    <a href="#" class="img-bg d-flex align-items-end"
      style="background-image: url('${item.thumb}')">
      <div class="img-bg-inner">
        <h2>${item.title}</h2>
        <p>
          ${item.description}
        </p>
      </div>
    </a>
  </div>
    `;
  });

  elarticlesSlider.innerHTML = html;
});

// RENDER ARTICLES TRENDING
// /articles/popular?limit=5
API.get("articles/popular?limit=5").then((response) => {
  const articles = response.data.data;
  let html = " ";
  articles.forEach((item, index) => {
    html += renderAricleTrendingItem(item, index);
  });

  elArticlesTrending.innerHTML = html;
});

// POSt
API.get("articles/popular?limit=7").then((res) => {
  const articles = res.data.data;

  let html = "";
  articles.forEach((item, index) => {
    if (index === 0) {
      elArticlesNewLarge.innerHTML = renderArticleNewLargeItem(item);
    } else {
      html += rendexArticleNewItem(item);
    }
  });

  elArticlesNew.innerHTML = html;
});

// Lifestyle
API.get("categories_news/articles?limit_cate=2&limit=9").then((res) => {
  const data = res.data.data;
  let html = "";
  data.forEach((item, index) => {
    const categoryName = item.name;
    const articles = item.articles;

    html += /* html */ `
    <section class="category-section">
        <div class="container" data-aos="fade-up">
          ${renderCategorySectionTitle(categoryName)}
          ${renderArticleByCategoryFeatured(articles, index)}
        
          </div>
          <!-- End .row -->
        </div>
      </section>`;
  });
  elCatagoriesFeaturedWithArticles.innerHTML = html;
});

// Category Featured
API.get("categories_news/articles?limit_cate=4&limit=4").then((res) => {
  const data = res.data.data;
  let htmlTable = "";
  let htmlContent = "";

  data.forEach((item, index) => {
    const categoryName = item.name;
    const articles = item.articles;
    const slug = item.slug;
    const active = index === 0 ? "active" : "";
    const activeShow = index === 0 ? "show active" : "";

    let htmlArticles = "";

    articles.forEach((articlesItem) => {
      const publishDate = dayjs(articlesItem.publish_date).fromNow(); // Add this line
      htmlArticles += /*html */ `
      <div class="col-md-6 col-lg-3">
      <div class="post-entry-1">
        <a href="#"><img src="${articlesItem.thumb}" alt="${articlesItem.title}" class="img-fluid" /></a>
        <div class="post-meta">
        <span class="publish-date">${publishDate}</span> <!-- Add publishDate here -->
        </div>
        <h2><a href="single-post.html">${articlesItem.title}</a></h2>
      </div>
    </div>
      `;
    });

    htmlTable += /*html*/ `
    <li class="nav-item " 
    role="presentation">
        <button class="nav-link ${active}"
        id="${slug}-tab" 
        data-bs-toggle="tab" 
        data-bs-target="#${slug}-tab-pane"
          type="button" 
          role="tab" 
          aria-controls="${slug}-tab-pane" 
          aria-selected="false"
          >
          ${categoryName}
        </button>
  </li>`;

    htmlContent += /*html */ `
      <div class="tab-pane fade ${activeShow}"
       id="${slug}-tab-pane" 
       role="tabpanel"
        aria-labelledby="${slug}-tab" 
        tabindex="0">
        <div class="row g-5">
        ${htmlArticles}
        </div>
      </div>`;
  });
  elCcategoriesFeaturedTab.innerHTML = htmlTable;
  elCategoriesFeaturedTabContent.innerHTML = htmlContent;
});

/////////////////////////////////////////////////////////////////////
// TAO FUNCTIon
function renderAricleTrendingItem(item, index) {
  return /*html*/ `<li>
  <a href="#">
    <span class="number">${index + 1}</span>
    <h3>${item.title}</h3>
    <span class="author">${item.author}</span>
  </a>
</li>`;
}

function renderArticleNewLargeItem(item) {
  const publishDate = dayjs(item.publish_date).fromNow();
  return /*html*/ `
  <div class="post-entry-1 lg">
    <a href="#">
    <img src="${item.thumb}" alt="${item.title}"
    class="img-fluid" /></a>
    <div class="post-meta">
    <span class="date">${item.category.name}</span>
     <span class="mx-1">&bullet;</span> 
     <span>${publishDate}</span>
  </div>
  <h2><a href="#">${item.title}</a></h2>
  <p class="mb-4 d-block">
    ${item.description}
  </p>

  <div class="d-flex align-items-center author">
    <div class="photo"><img src="assets/img/person-1.jpg" alt="" class="img-fluid" /></div>
    <div class="name">
      <h3 class="m-0 p-0">${item.author}</h3>
    </div>
  </div>
</div>
  
  `;
}

function rendexArticleNewItem(item) {
  const publishDate = dayjs(item.publish_date).fromNow();
  return /* html */ `
    <div class="col-lg-6">
      <div class="post-entry-1">
        <a href="#">
          <img src="${item.thumb}" alt="${item.title}" class="img-fluid" />
        </a>
        <div class="post-meta">
          <span class="date">${item.category.name}</span>
          <span class="mx-1">&bullet;</span>
          <span class="publish-date">${publishDate}</span>
        </div>
        <h2><a href="single-post.html">${item.title}</a></h2>
      </div>
    </div>`;
}

function renderCategorySectionTitle(categoryName) {
  return /*html*/ `
  <div class="section-header d-flex justify-content-between align-items-center mb-5">
  <h2>${categoryName}</h2>
  <div><a href="#" class="more">See All ${categoryName}</a></div>
</div>`;
}

function renderArticleByCategoryFeatured(articles, idx) {
  let htmlArticlesLeft = "";
  let htmlArticlesRight = "";

  articles.forEach(
    (articlesItem, index) => {
      const title = articlesItem.title;
      const thumb = articlesItem.thumb;
      const publishDate = dayjs(articlesItem.publish_date).fromNow();
      const authorName = articlesItem.author;

      if (index < 4) {
        htmlArticlesLeft += /* html */ `
        <div class="col-lg-6">
          <div class="post-entry-1">
            <a href="#">
              <img src="${thumb}" alt="${title}" class="img-fluid" />
            </a>
            <div class="post-meta">
              <span class="publish-date">${publishDate}</span>
            </div>
            <h2><a href="single-post.html">${title}</a></h2>
          </div>
        </div>`;
      } else {
        htmlArticlesRight += /*html*/ `
        <div class="post-entry-1 border-bottom">
          <div class="post-meta">
            <span class="publish-date">${publishDate}</span>
          </div>
          <h2 class="mb-2">
            <a href="single-post.html">${title}</a>
          </h2>
          <span class="author mb-3 d-block">${authorName}</span>
        </div>`;
      }
    }

    // ... rest of the function remains the same
  );
  let rowClass = "flex-row-reverse";
  let borderClass = "";

  if (idx % 2 === 0) {
    rowClass = "";
    borderClass = "border-start custom-border";
  }

  // const rowClass = idx % 2 === 0 ? "" : "flex-row-reverse";
  // const borderClass = idx % 2 === 0 ? "border-start custom-border" : "";

  return /*html */ `
<div class="row g-5 ${rowClass}">
<div class="col-lg-8">
  <div class="row g-5">
   ${htmlArticlesLeft}
   </div>
</div>
<div class="col-lg-4 ${borderClass}">
 ${htmlArticlesRight}
</div>`;
}
