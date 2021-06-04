const list = document.querySelector(".user-list");
const inputFilter = document.querySelector(".input-filter");
const userList = [];

getData();

inputFilter.addEventListener("input", (e) => {
  dataFilter(e.target.value);
});

async function getData() {
  const allUsers = await fetch("https://randomuser.me/api?results=50");

  const data = await allUsers.json();

  // Remove user list
  list.innerHTML = "";

  data.results.forEach((user) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <img src="${user.picture.large}" alt="${user.name.first}">
    <div class="user-info">
      <h3>${user.name.first} ${user.name.last}</h3>
      <p>${user.location.city}, ${user.location.country}</p>
    </div>
    `;

    list.appendChild(li);

    userList.push(li);
  });
}

function dataFilter(inputText) {
  userList.forEach((oneUser) => {
    if (oneUser.innerText.toLowerCase().includes(inputText.toLowerCase())) {
      oneUser.classList.remove("hide");
    } else {
      oneUser.classList.add("hide");
    }
  });
}
