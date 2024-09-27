let myImage = document.querySelector("img");

myImage.onclick = function () {
  let mySrc = myImage.getAttribute("src");
  if (mySrc === "images/castang.jpeg") {
    myImage.setAttribute("src", "images/castang.jpeg");
  } else {
    myImage.setAttribute("src", "images/cloud.jpeg");
  }
};
