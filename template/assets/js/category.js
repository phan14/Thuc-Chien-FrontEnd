const API = axios.create({
  baseURL: "https://apiforlearning.zendvn.com/api/v2/",
});

dayjs.extend(window.dayjs_plugin_relativeTime);
dayjs.locale("vi");

const elMainMenu = document.getElementById("mainMenu");
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

// Categories_BAi VIet
API.get("categories_news/2/articles?limit=5&page=1").then((res) => {
  const articles = res.data;
  console.log(articles);
});
