const loadPhone = async (searchText = 'iphone',isShowAll) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  let value = await response.json();
  let phoneList = value.data;
  let checkValid = phoneList.length;
  
  if(checkValid > 0){
    setTimeout(() => {
      displayPhones(phoneList, isShowAll);
    }, 2000);
}
  
};

const displayPhones = (phones,isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = ''

  if(phones.length > 12 && !isShowAll){
    const showButton = document.getElementById('show-all');
    showButton.classList.remove('hidden')
  }
  else{
    const showButton = document.getElementById('show-all');
    showButton.classList.add('hidden')
  }
  // Display 12 phones if not showAll
  if(!isShowAll){
    phones = phones.slice(0,12);
  }
  phones.forEach((phone) => {
    // console.log(phone);
    const phoneDiv = document.createElement("div");
    phoneDiv.innerHTML = `
        <div class="gap-4 bg-white-100  border-2 border-grey-200 m-4 p-5 rounded-lg">
                <figure class="bg-gray-200 p-5 flex justify-center mix-blend-multiply"><img src="${phone.image}" alt="Phones"/></figure>
                <div class="card-body items-center">
                  <h2 class="card-title">${phone.phone_name}</h2>
                  <p>There are many variations of passages of available, but the majority have suffered</p>
                  <span class="text-md font-serif text-black font-bold">$999</span>
                  <div class="card-actions justify-center">
                    <button onclick = "showDetails('${phone.slug}')" class="btn btn-primary">See Details</button>
                  </div>
                </div>
              </div>
        `;
    phoneContainer.appendChild(phoneDiv);
  });
  loadingSpinner(false);
};



const searchButton = (isShowAll) => {
  loadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText,isShowAll);
};

const loadingSpinner = (loading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if(loading){
    loadingSpinner.classList.remove('hidden')
  }
  else{
    loadingSpinner.classList.add('hidden')
  }
  
}

const handleShowAll = () => {
  searchButton(true)
}

// Show Details Section

const showDetails = async (id) => {
  // console.log(id);
  const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const value = await response.json()
  const phone = value.data
  showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById('phone-name');
  phoneName.innerText = phone.name
  const detailsImage = document.getElementById('image-details');
  detailsImage.innerHTML = `
  <img src = '${phone.image}'/>
  `
  const showStorage = document.getElementById('show-storage');
  showStorage.innerHTML = `<span class = 'text-md font-serif font-bold'> Storage: </span> ${phone.mainFeatures.storage} <br>
  `

  const displaySize = document.getElementById('show-display');
  displaySize.innerHTML = `<span class = 'text-md font-serif font-bold'> Display Size: </span> ${phone.mainFeatures.displaySize} <br>`

  const showMemory = document.getElementById('show-memory');
  showMemory.innerHTML = `<span class = 'text-md font-serif font-bold'> Memory: </span> ${phone.mainFeatures.memory} <br>`

  const showChipset = document.getElementById('show-chipset');
  showChipset.innerHTML = `<span class = 'text-md font-serif font-bold'> ChipSet: </span> ${phone.mainFeatures.chipSet} <br>`

  const showSlug = document.getElementById('show-slug');
  showSlug.innerHTML = `<span class = 'text-md font-serif font-bold'> Slug: </span> ${phone.slug} <br>`

  const showReleaseDate = document.getElementById('show-date');
  showReleaseDate.innerHTML = `<span class = 'text-md font-serif font-bold'> ReleaseDate: </span> ${phone?.releaseDate || 'No specific Release Date'} <br>`

  const showGPS = document.getElementById('show-gps');
  showGPS.innerHTML = `<span class = 'text-md font-serif font-bold'> GPS: </span> ${phone.others?.GPS || 'Not Tracked'} <br>`


  show_details_modal.showModal()
}


const invalidSearch = () => {
 const invalid = document.getElementById('invalid-search');
  const p = document.createElement('p');
  p.innerText = 'Your ID is Invalid'
  invalid.appendChild(p)
}