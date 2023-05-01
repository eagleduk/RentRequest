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

function getDay(ii) {
  return ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"][ii];
}
function format(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, 0)}-${String(d).padStart(2, 0)}`;
}

function changeDate(e) {
  const date = new Date(e.target.value);
  console.log(date);
  document.querySelector("#day").textContent = getDay(date.getDay());
}

async function submitRent(date, time) {
  const form = document.createElement("form");
  // form.style.display = "none";
  form.action = "https://www.seongnam.go.kr/rent/rentParkDataWrite.do";
  form.method = "POST";

  const a1 = document.createElement("input");
  a1.name = "menuIdx";
  a1.value = "1001981";
  const a2 = document.createElement("input");
  a2.name = "rent_park_idx";
  a2.value = "12";
  const a3 = document.createElement("input");
  a3.name = "rent_faci_idx";
  a3.value = "7";
  const a4 = document.createElement("input");
  a4.name = "rent_dt";
  a4.value = date;
  const a5 = document.createElement("input");
  a5.name = "rent_time_gbn";
  a5.value = time;
  const a6 = document.createElement("input");
  a6.name = "is_holiday";
  a6.value = "false";
  const a7 = document.createElement("input");
  a7.name = "day_week";
  a7.value = "6";
  const a8 = document.createElement("button");
  a8.textContent = "submit";

  form.appendChild(a1);
  form.appendChild(a2);
  form.appendChild(a3);
  form.appendChild(a4);
  form.appendChild(a5);
  form.appendChild(a6);
  form.appendChild(a7);
  form.appendChild(a8);

  document.querySelector("body").appendChild(form);

  form.submit();
}

function insertValues(
  rent_club_nm,
  rent_mobile2,
  rent_mobile3,
  rent_amount,
  rent_ceo_nm,
  rent_ceo_mobile2,
  rent_ceo_mobile3
) {
  document.getElementById("rent_club_nm").value = rent_club_nm;
  document.getElementById("rent_mobile2").value = rent_mobile2;
  document.getElementById("rent_mobile3").value = rent_mobile3;
  document.getElementById("rent_amount").value = rent_amount;
  document.getElementById("rent_ceo_nm").value = rent_ceo_nm;
  document.getElementById("rent_ceo_mobile2").value = rent_ceo_mobile2;
  document.getElementById("rent_ceo_mobile3").value = rent_ceo_mobile3;

  document.getElementById("agree_yn").checked = true;
}

document.addEventListener("DOMContentLoaded", (e) => {
  const date = new Date();
  const min = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
  const max = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 30
  );

  document.querySelector("#date").addEventListener("change", changeDate);

  document.querySelector("#date").min = format(
    min.getFullYear(),
    min.getMonth(),
    min.getDate()
  );
  document.querySelector("#date").max = format(
    max.getFullYear(),
    max.getMonth(),
    max.getDate()
  );
  document.querySelector("#date").value = format(
    max.getFullYear(),
    max.getMonth(),
    max.getDate()
  );
  document.querySelector("#day").textContent = getDay(max.getDay());

  document.querySelector("a").addEventListener("click", (e) => {
    e.preventDefault();
    chrome.tabs.update({
      url: e.target.dataset.url,
    });
    return;
  });

  inputs.forEach((id) => {
    chrome.storage.sync.get(id, (v) => {
      if (v?.[id]) document.getElementById(id).value = v[id];
    });
  });
});

document.querySelector("button#rent").addEventListener("click", async (e) => {
  // 현재 탭 검색
  const tabs = await chrome.tabs.query({});

  chrome.tabs.query(
    {
      // selected: true,
      active: true,
      url: ["https://www.seongnam.go.kr/*"],
    },
    (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        args: [
          document.querySelector("#date").value,
          document.querySelector("#time").value,
        ],
        func: submitRent,
      });
    }
  );
});

document.querySelector("button#insert").addEventListener("click", (e) => {
  const args = [
    document.getElementById("rent_club_nm").value,
    document.getElementById("rent_mobile2").value,
    document.getElementById("rent_mobile3").value,
    document.getElementById("rent_amount").value,
    document.getElementById("rent_ceo_nm").value,
    document.getElementById("rent_ceo_mobile2").value,
    document.getElementById("rent_ceo_mobile3").value,
  ];
  chrome.tabs.query(
    {
      // selected: true,
      active: true,
      url: ["https://www.seongnam.go.kr/rent/rentParkDataWrite.do"],
    },
    (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        args,
        func: insertValues,
      });
    }
  );
});

// https://80000coding.oopy.io/b365ed79-fd40-4806-bf08-7589d007e7c7
