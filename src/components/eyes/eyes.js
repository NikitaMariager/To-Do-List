import "./eyes.scss";

function Eyes() {
  document.querySelector("body").addEventListener("mousemove", (e) => {
    const eye = document.querySelectorAll(".eyes");
    eye.forEach(function (eye) {
      let x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
      let y = eye.getBoundingClientRect().top + eye.clientHeight / 2;
      let radian = Math.atan2(e.pageX - x, e.pageY - y);
      let rotate = radian * (180 / Math.PI) * -1 + 270;
      eye.style.transform = "rotate(" + rotate + "deg)";
    });
  });

  return (
    <div className="container">
      <div className="eyes"></div>
      <div className="eyes"></div>
    </div>
  );
}

export default Eyes;
