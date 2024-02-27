const loadPhone = async (searchText) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const value = await response.json();
  const phoneList = value.data;
  displayPhones(phoneList);
};

const displayPhones = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = ''

  if(phones.length >= 12){
    const showButton = document.getElementById('show-all');
    showButton.classList.remove('hidden')
  }
  else{
    const showButton = document.getElementById('show-all');
    showButton.classList.add('hidden')
  }

  phones = phones.slice(0,12);

  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    console.log(phone);
    phoneDiv.innerHTML = `
        <div class="gap-4 bg-white-100  border-2 border-grey-200 m-4 p-5 rounded-lg">
                <figure class="bg-gray-200 p-5 flex justify-center mix-blend-multiply"><img src="${phone.image}" alt="Shoes"/></figure>
                <div class="card-body items-center">
                  <h2 class="card-title">${phone.phone_name}</h2>
                  <p>There are many variations of passages of available, but the majority have suffered</p>
                  <span class="text-lg text-black font-bold">$999</span>
                  <div class="card-actions justify-center">
                    <button class="btn btn-primary">See Details</button>
                  </div>
                </div>
              </div>
        `;
    phoneContainer.appendChild(phoneDiv);
  });
};

const searchButton = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText);
};


