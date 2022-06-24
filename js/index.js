const form = document.querySelector("#takevalue");
function validationform() {
  const firstName = document.querySelector("#firstname")?.value;
  const otherName = document.querySelector("#othernames")?.value;
  const nationId = document.querySelector("#nationid")?.value;
  const phoneNumber = document.querySelector("#phonenumber")?.value;
  const visitorEmail = document.querySelector("#visitoremail")?.value;
  const districtName = document.querySelector("#districtname")?.value;
  const visitorMessage = document.querySelector("#visitormessage")?.value;

  const ferror = document.querySelector("#error-fname");
  const lerror = document.querySelector("#error-othername");
  const iderror = document.querySelector("#error-nationid");
  const phonerror = document.querySelector("#error-phonenumber");
  const emailerror = document.querySelector("#error-visitoremail");
  const districterror = document.querySelector("#error-district");
  const messageerror = document.querySelector("#error-message");

  let isValid = true;

  if (!firstName || firstName.trim() === "") {
    ferror.innerHTML = "Uzuzamo izina ribanza";
    isValid = false;
  } else {
    ferror.innerHTML = "";
  }
  if (!otherName || otherName.trim() === "") {
    lerror.innerHTML = "Uzuzamo irindi zina";
    isValid = false;
  } else {
    lerror.innerHTML = "";
  }
  if (!nationId || nationId.trim() === "") {
    iderror.innerHTML = "Uzuzamo indangamuntu";
    isValid = false;
  } else {
    iderror.innerHTML = "";
  }
  if (!phoneNumber || phoneNumber.trim() === "") {
    phonerror.innerHTML = "Uzuzamo telefone";
    isValid = false;
  } else {
    phonerror.innerHTML = "";
  }
  if (!visitorEmail || visitorEmail.trim() === "") {
    emailerror.innerHTML = "Uzuzamo imeri";
    isValid = false;
  } else {
    emailerror.innerHTML = "";
  }
  if (!districtName || districtName.trim() === "") {
    districterror.innerHTML = "Uzuzamo akarere";
    isValid = false;
  } else {
    districterror.innerHTML = "";
  }
  if (!visitorMessage || visitorMessage.trim() === "") {
    messageerror.innerHTML = "Uzuzamo ubutumwa";
    isValid = false;
  } else {
    messageerror.innerHTML = "";
  }

  if (isValid) {
    const signinUrl = "https://crm.mbaza.dev.cndp.org.rw/api/v1/husers";
    const params = {
      firstname: firstName,
      lastname: otherName,
      email: `${phoneNumber}@nchrcustomer.org.rw`,
      password: phoneNumber,
      login: "jdoe",
      roles: ["Customer"],
      group_ids: {
        2: ["create"],
      },
    };

    (async () => {
      const loaderEl = document.querySelector("#loading");
      loaderEl.innerHTML = "Mutegereze...";
      const rawResponse = await fetch(signinUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: params,
      });
      loaderEl.innerHTML="";
      const signinResponse = rawResponse.json();
      console.log(signinResponse);
    })();

    const ticketUrl = "https://crm.mbaza.dev.cndp.org.rw/api/v1/tickets";
    const ticketParams = {
      title: `${firstName} ${otherName}-${phoneNumber}`,
      group_id: "Users_id",
      customer: `${phoneNumber}@email.com`,
      article: {
        subject: "Website form ticket",
        body: `${firstName} ${otherName}\n${nationId}\n${phoneNumber}\nDistrict:${districtName}\nSector:sectorname\n\nMessage: ${visitorMessage}`,
        type: "note",
        internal: false,
      },
    };
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  validationform();
});
