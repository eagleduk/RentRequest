const inputs = [
  "time",
  "rent_club_nm",
  "rent_mobile2",
  "rent_mobile3",
  "rent_amount",
  "rent_ceo_nm",
  "rent_ceo_mobile2",
  "rent_ceo_mobile3",
];

(() => {
  inputs.forEach((id) => {
    chrome.storage.sync.get(id, (v) => {
      console.log(v[id]);
      document.getElementById(id).value = v[id];
    });
  });
})();

document.querySelector("button#save").addEventListener("click", (e) => {
  inputs.forEach((id) => {
    const value = document.getElementById(id).value;
    chrome.storage.sync.set({ [id]: value }, () => {
      console.log(`${id} value = ${value}`);
    });
  });
});
