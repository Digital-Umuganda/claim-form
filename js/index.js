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
    const signinUrl = "https://crm.mbaza.dev.cndp.org.rw/api/v1/users";
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

    const ticketUrl = "https://crm.mbaza.dev.cndp.org.rw/api/v1/tickets";

    (async () => {
      const loaderEl = document.querySelector("#loading");
      try {
        loaderEl.innerHTML = "Mutegereze...";
        const { data } = await axios.post(signinUrl, params, {
          headers: {
            Authorization:
              "Bearer Br1sd8BN024Nzt0_QR0WSG14fdXtUYDMVqmWvJe2Df5HIYZwHlPteDjY0ScwZA6z",
            "Content-Type": "application/json",
          },
        });
        console.log(data);

        const ticketParams = {
          title: `${firstName} ${otherName}-${phoneNumber}`,
          group_id: data.id,
          customer: `${phoneNumber}@email.com`,
          article: {
            subject: "Website form ticket",
            body: `${firstName} ${otherName}\n${nationId}\n${phoneNumber}\nDistrict:${districtName}\nSector:sectorname\n\nMessage: ${visitorMessage}`,
            type: "note",
            internal: false,
          },
        };

        const { data: res } = await axios.post(ticketUrl, ticketParams, {
          headers: {
            Authorization:
              "Bearer Br1sd8BN024Nzt0_QR0WSG14fdXtUYDMVqmWvJe2Df5HIYZwHlPteDjY0ScwZA6z",
            "Content-Type": "application/json",
          },
        });

        console.log(res);

        loaderEl.innerHTML = "";

        form.reset();

        if (res) {
          alert('Gutanga ikirego byagenze neza, Murakoze!')
        }
      } catch (error) {
        loaderEl.innerHTML = "";
        alert(error?.message);
      }
    })();
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  validationform();
});
