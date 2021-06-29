"use strict";
// Array on guardarem tots els cotxes creats
var cotxesBBDD = [];
// La zona del formulari del cotxe
var createACarArea = document.getElementById('formulariEntrarCotxe');
// El form del cotxe
var createACar = document.getElementById("createACar");
// La zona del formulari de les rodes 
var createTheWheelsArea = document.getElementById('formulariEntrarWheels');
// El form de les wheels
var createTheWheels = document.getElementById("createWheels");
// Expressions regulars per a la validació
var exp = {
    plate: /^[\d]{4}[a-zA-Z]{3}$/gi,
    word: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,'-]+$/u,
};
// Per evitar que es refresqui la pàgina quan es clica al boto de crear cotxe del form
var crearCotxeBoto = document.getElementById("crearCotxeBoto");
crearCotxeBoto.addEventListener("click", function (event) {
    event.preventDefault();
});
// Per evitar que es refresqui la pàgina quan es clica al boto de mostrar exemple
var mostrarExempleCotxeBoto = document.getElementById("mostrarExempleCotxeBoto");
mostrarExempleCotxeBoto.addEventListener("click", function (event) {
    event.preventDefault();
});
// Per evitar que es refresqui la pàgina quan es clica al boto  crear wheels del form
var crearwheelsBoto = document.getElementById("crearWheelsBoto");
crearwheelsBoto.addEventListener("click", function (event) {
    event.preventDefault();
});
function showExampleCar() {
    var car = new Car('1212SDS', 'VERMELL', 'SEAT');
    car.addWheel(new Wheel(2, "SEAT"));
    car.addWheel(new Wheel(0.6, "FIAT"));
    car.addWheel(new Wheel(1.5, "TESLA"));
    car.addWheel(new Wheel(1.8, "PORSCHE"));
    // Afegim el car d'exemple a l'array de cotxes
    cotxesBBDD.push(car);
    //Mostrem la info del car d'exemple
    mostrarInfoCotxeCreat(car);
}
// Creem un cotxe amb les dades del form
function createCar() {
    // Agafar els valors dels inputs del cotxe
    var carPlate = document.getElementById("carPlate").value.toUpperCase();
    var carColour = document.getElementById("carColour").value.toUpperCase();
    var carBrand = document.getElementById("carBrand").value.toUpperCase();
    // Comprovar si la info del cotxe és correcta (validació)
    var infoCotxeCorrecte = checkInfoCar(carPlate, carColour, carBrand);
    // Si la info del cotxe és correcta: 
    if (infoCotxeCorrecte == true) {
        // Crear objecte amb la info del form si es correcte       
        var car = new Car(carPlate, carColour, carBrand);
        //Guardar-lo a l'array
        cotxesBBDD.push(car);
        // Posar formulari en blanc
        clearForm(createACar);
        // Treure la class de format dels inputs del form
        var carPlateInput = document.getElementById("carPlate");
        carPlateInput.classList.remove('is-valid');
        var carColourInput = document.getElementById("carColour");
        carColourInput.classList.remove('is-valid');
        var carBrandInput = document.getElementById("carBrand");
        carBrandInput.classList.remove('is-valid');
        // Mostrar el formulari de wheels i ocultar el formulari de cotxe
        canviDeForms();
    }
}
;
//Comprovar que els inputs no estiguin en blanc, o siguin incorrectes
function checkInfoCar(inputPlate, inputColour, inputBrand) {
    // Comptador d'errors per si falta info
    var acumErrores = 0;
    // Treure la class is-invalid de moment
    createACar.classList.remove('is-invalid');
    //missatges d'error i d'ok per cada field
    //plate
    var errorPlate = document.getElementById("errorCarPlate");
    var okPlate = document.getElementById("okCarPlate");
    //colour
    var errorColour = document.getElementById("errorCarColour");
    var okColour = document.getElementById("okCarColour");
    //brand
    var errorBrand = document.getElementById("errorCarBrand");
    var okBrand = document.getElementById("okCarBrand");
    //correcte
    var okFeedback = "Looks good!";
    //Què passa si es deixa en blanc algun input, o si és incorrecte:
    //PLATE
    if (inputPlate === '') {
        var inputCarPlate = document.getElementById("carPlate");
        inputCarPlate.classList.add("is-invalid");
        errorPlate.innerHTML = "Plate missing.";
        okPlate.innerHTML = "";
        acumErrores++;
    }
    else if (parametreValidacio(exp.plate, inputPlate) == false) {
        var inputCarPlate = document.getElementById("carPlate");
        inputCarPlate.classList.add("is-invalid");
        errorPlate.innerHTML = "Please enter a valid plate (4 numbers and 3 letters).";
        okPlate.innerHTML = "";
        acumErrores++;
    }
    else {
        var inputCarPlate = document.getElementById("carPlate");
        inputCarPlate.classList.remove('is-invalid');
        inputCarPlate.classList.add("is-valid");
        errorPlate.innerHTML = "";
        okPlate.innerHTML = okFeedback;
    }
    //COLOUR
    if (inputColour === "") {
        var inputColour_1 = document.getElementById("carColour");
        inputColour_1.classList.add("is-invalid");
        errorColour.innerHTML = "Colour missing.";
        okColour.innerHTML = "";
        acumErrores++;
    }
    else if (parametreValidacio(exp.word, inputColour) == false) {
        var inputColour_2 = document.getElementById("carColour");
        inputColour_2.classList.add("is-invalid");
        errorColour.innerHTML = "Please enter a valid colour name (only letters).";
        okColour.innerHTML = "";
        acumErrores++;
    }
    else {
        var inputColour_3 = document.getElementById("carColour");
        inputColour_3.classList.remove('is-invalid');
        inputColour_3.classList.add("is-valid");
        errorColour.innerHTML = "";
        okColour.innerHTML = okFeedback;
    }
    //BRAND
    if (inputBrand === "") {
        var inputBrand_1 = document.getElementById("carBrand");
        inputBrand_1.classList.add("is-invalid");
        errorBrand.innerHTML = "Brand missing.";
        okBrand.innerHTML = "";
        acumErrores++;
    }
    else if (parametreValidacio(exp.word, inputBrand) == false) {
        var inputBrand_2 = document.getElementById("carBrand");
        inputBrand_2.classList.add("is-invalid");
        errorBrand.innerHTML = "Please enter a valid brand name (only letters).";
        okBrand.innerHTML = "";
        acumErrores++;
    }
    else {
        var inputBrand_3 = document.getElementById("carBrand");
        inputBrand_3.classList.remove('is-invalid');
        inputBrand_3.classList.add("is-valid");
        errorBrand.innerHTML = "";
        okBrand.innerHTML = okFeedback;
    }
    //Acumulació errors 
    if (acumErrores > 0) {
        return false;
    }
    else {
        return true;
    }
}
//He d'activar aquesta funció quan es cliqui el botó crear wheels.
function createWheels() {
    //Agafar l'últim cotxe creat per afegir-li les wheels
    var car = cotxesBBDD[cotxesBBDD.length - 1];
    //Agafar els valors dels inputs de les wheels
    var wheel01Brand = document.getElementById("wheel01Brand").value.toUpperCase();
    var wheel01Diameter = parseFloat(document.getElementById("wheel01Diameter").value);
    var wheel02Brand = document.getElementById("wheel02Brand").value.toUpperCase();
    var wheel02Diameter = parseFloat(document.getElementById("wheel02Diameter").value);
    var wheel03Brand = document.getElementById("wheel03Brand").value.toUpperCase();
    var wheel03Diameter = parseFloat(document.getElementById("wheel03Diameter").value);
    var wheel04Brand = document.getElementById("wheel04Brand").value.toUpperCase();
    var wheel04Diameter = parseFloat(document.getElementById("wheel04Diameter").value);
    //Validem la informació
    // Comprovar si la info del cotxe és correcta (validació)
    var infoWheelsCorrecte = checkInfoWheels(wheel01Brand, wheel01Diameter, wheel02Brand, wheel02Diameter, wheel03Brand, wheel03Diameter, wheel04Brand, wheel04Diameter);
    // Si la info del cotxe és correcta: 
    if (infoWheelsCorrecte == true) {
        // Crear les 4 wheels del car que acabem de crear
        car.addWheel(new Wheel(wheel01Diameter, wheel01Brand));
        car.addWheel(new Wheel(wheel02Diameter, wheel02Brand));
        car.addWheel(new Wheel(wheel03Diameter, wheel03Brand));
        car.addWheel(new Wheel(wheel04Diameter, wheel04Brand));
        // Mostrar el formulari de cotxe un altre cop i ocultar el formulari de wheels
        canviDeForms();
        // Posar formulari en blanc
        clearForm(createTheWheels);
        // Treure la class de format dels inputs del form
        var wheel01BrandInput = document.getElementById("wheel01Brand");
        wheel01BrandInput.classList.remove('is-valid');
        var wheel01DiameterInput = document.getElementById("wheel01Diameter");
        wheel01DiameterInput.classList.remove('is-valid');
        var wheel02BrandInput = document.getElementById("wheel02Brand");
        wheel02BrandInput.classList.remove('is-valid');
        var wheel02DiameterInput = document.getElementById("wheel02Diameter");
        wheel02DiameterInput.classList.remove('is-valid');
        var wheel03BrandInput = document.getElementById("wheel03Brand");
        wheel03BrandInput.classList.remove('is-valid');
        var wheel03DiameterInput = document.getElementById("wheel03Diameter");
        wheel03DiameterInput.classList.remove('is-valid');
        var wheel04BrandInput = document.getElementById("wheel04Brand");
        wheel04BrandInput.classList.remove('is-valid');
        var wheel04DiameterInput = document.getElementById("wheel04Diameter");
        wheel04DiameterInput.classList.remove('is-valid');
        // Mostrar info si tot correcte
        mostrarInfoCotxeCreat(car);
    }
}
function checkInfoWheels(w1brand, w1Diameter, w2brand, w2Diameter, w3brand, w3Diameter, w4brand, w4Diameter) {
    // Comptador d'errors per si falta info
    var acumErrores = 0;
    // Treure la class is-invalid de moment
    createTheWheels.classList.remove('is-invalid');
    //missatges d'error i d'ok per cada field
    //wheel 01
    var errorWheelBrand01 = document.getElementById("errorWheelBrand01");
    var errorWheelDiameter01 = document.getElementById("errorWheelDiameter01");
    var okWheelBrand01 = document.getElementById("okWheelBrand01");
    var okWheelDiameter01 = document.getElementById("okWheelDiameter01");
    //wheel 02
    var errorWheelBrand02 = document.getElementById("errorWheelBrand02");
    var errorWheelDiameter02 = document.getElementById("errorWheelDiameter02");
    var okWheelBrand02 = document.getElementById("okWheelBrand02");
    var okWheelDiameter02 = document.getElementById("okWheelDiameter02");
    //wheel 03
    var errorWheelBrand03 = document.getElementById("errorWheelBrand03");
    var errorWheelDiameter03 = document.getElementById("errorWheelDiameter03");
    var okWheelBrand03 = document.getElementById("okWheelBrand03");
    var okWheelDiameter03 = document.getElementById("okWheelDiameter03");
    //wheel 03
    var errorWheelBrand04 = document.getElementById("errorWheelBrand04");
    var errorWheelDiameter04 = document.getElementById("errorWheelDiameter04");
    var okWheelBrand04 = document.getElementById("okWheelBrand04");
    var okWheelDiameter04 = document.getElementById("okWheelDiameter04");
    //correcte
    var okFeedback = "Looks good!";
    //Wheel 01 Brand
    if (w1brand === "") {
        var w1brand_1 = document.getElementById("wheel01Brand");
        w1brand_1.classList.add("is-invalid");
        errorWheelBrand01.innerHTML = "Brand missing.";
        okWheelBrand01.innerHTML = "";
        acumErrores++;
    }
    else if (parametreValidacio(exp.word, w1brand) == false) {
        var w1brand_2 = document.getElementById("wheel01Brand");
        w1brand_2.classList.add("is-invalid");
        errorWheelBrand01.innerHTML = "Please enter a valid brand name (only letters).";
        okWheelBrand01.innerHTML = "";
        acumErrores++;
    }
    else {
        var w1brand_3 = document.getElementById("wheel01Brand");
        w1brand_3.classList.remove('is-invalid');
        w1brand_3.classList.add("is-valid");
        errorWheelBrand01.innerHTML = "";
        okWheelBrand01.innerHTML = okFeedback;
    }
    //Wheel 01 Diameter
    if (!w1Diameter) {
        var w1Diameter_1 = document.getElementById("wheel01Diameter");
        w1Diameter_1.classList.add("is-invalid");
        errorWheelDiameter01.innerHTML = "Diameter missing.";
        okWheelDiameter01.innerHTML = "";
        acumErrores++;
    }
    else if (w1Diameter < 0.4 || w1Diameter > 2) {
        var w1Diameter_2 = document.getElementById("wheel01Diameter");
        w1Diameter_2.classList.add("is-invalid");
        errorWheelDiameter01.innerHTML = "Please enter a valid diameter (between 0.4 and 2).";
        okWheelDiameter01.innerHTML = "";
        acumErrores++;
    }
    else {
        var w1Diameter_3 = document.getElementById("wheel01Diameter");
        w1Diameter_3.classList.remove('is-invalid');
        w1Diameter_3.classList.add("is-valid");
        errorWheelDiameter01.innerHTML = "";
        okWheelDiameter01.innerHTML = okFeedback;
    }
    //Wheel 02 Brand
    if (w2brand === "") {
        var w2brand_1 = document.getElementById("wheel02Brand");
        w2brand_1.classList.add("is-invalid");
        errorWheelBrand02.innerHTML = "Brand missing.";
        okWheelBrand02.innerHTML = "";
        acumErrores++;
    }
    else if (parametreValidacio(exp.word, w2brand) == false) {
        var w2brand_2 = document.getElementById("wheel02Brand");
        w2brand_2.classList.add("is-invalid");
        errorWheelBrand02.innerHTML = "Please enter a valid brand name (only letters).";
        okWheelBrand02.innerHTML = "";
        acumErrores++;
    }
    else {
        var w2brand_3 = document.getElementById("wheel02Brand");
        w2brand_3.classList.remove('is-invalid');
        w2brand_3.classList.add("is-valid");
        errorWheelBrand02.innerHTML = "";
        okWheelBrand02.innerHTML = okFeedback;
    }
    //Wheel 02 Diameter
    if (!w2Diameter) {
        var w2Diameter_1 = document.getElementById("wheel02Diameter");
        w2Diameter_1.classList.add("is-invalid");
        errorWheelDiameter02.innerHTML = "Diameter missing.";
        okWheelDiameter02.innerHTML = "";
        acumErrores++;
    }
    else if (w2Diameter < 0.4 || w2Diameter > 2) {
        var w2Diameter_2 = document.getElementById("wheel02Diameter");
        w2Diameter_2.classList.add("is-invalid");
        errorWheelDiameter02.innerHTML = "Please enter a valid diameter (between 0.4 and 2).";
        okWheelDiameter02.innerHTML = "";
        acumErrores++;
    }
    else {
        var w2Diameter_3 = document.getElementById("wheel02Diameter");
        w2Diameter_3.classList.remove('is-invalid');
        w2Diameter_3.classList.add("is-valid");
        errorWheelDiameter02.innerHTML = "";
        okWheelDiameter02.innerHTML = okFeedback;
    }
    //Wheel 03 Brand
    if (w3brand === "") {
        var w3brand_1 = document.getElementById("wheel03Brand");
        w3brand_1.classList.add("is-invalid");
        errorWheelBrand03.innerHTML = "Brand missing.";
        okWheelBrand03.innerHTML = "";
        acumErrores++;
    }
    else if (parametreValidacio(exp.word, w3brand) == false) {
        var w3brand_2 = document.getElementById("wheel03Brand");
        w3brand_2.classList.add("is-invalid");
        errorWheelBrand03.innerHTML = "Please enter a valid brand name (only letters).";
        okWheelBrand03.innerHTML = "";
        acumErrores++;
    }
    else {
        var w3brand_3 = document.getElementById("wheel03Brand");
        w3brand_3.classList.remove('is-invalid');
        w3brand_3.classList.add("is-valid");
        errorWheelBrand03.innerHTML = "";
        okWheelBrand03.innerHTML = okFeedback;
    }
    //Wheel 03 Diameter
    if (!w3Diameter) {
        var w3Diameter_1 = document.getElementById("wheel03Diameter");
        w3Diameter_1.classList.add("is-invalid");
        errorWheelDiameter03.innerHTML = "Diameter missing.";
        okWheelDiameter03.innerHTML = "";
        acumErrores++;
    }
    else if (w3Diameter < 0.4 || w3Diameter > 2) {
        var w3Diameter_2 = document.getElementById("wheel03Diameter");
        w3Diameter_2.classList.add("is-invalid");
        errorWheelDiameter03.innerHTML = "Please enter a valid diameter (between 0.4 and 2).";
        okWheelDiameter03.innerHTML = "";
        acumErrores++;
    }
    else {
        var w3Diameter_3 = document.getElementById("wheel03Diameter");
        w3Diameter_3.classList.remove('is-invalid');
        w3Diameter_3.classList.add("is-valid");
        errorWheelDiameter03.innerHTML = "";
        okWheelDiameter03.innerHTML = okFeedback;
    }
    //Wheel 04 Brand
    if (w4brand === "") {
        var w4brand_1 = document.getElementById("wheel04Brand");
        w4brand_1.classList.add("is-invalid");
        errorWheelBrand04.innerHTML = "Brand missing.";
        okWheelBrand04.innerHTML = "";
        acumErrores++;
    }
    else if (parametreValidacio(exp.word, w4brand) == false) {
        var w4brand_2 = document.getElementById("wheel04Brand");
        w4brand_2.classList.add("is-invalid");
        errorWheelBrand04.innerHTML = "Please enter a valid brand name (only letters).";
        okWheelBrand04.innerHTML = "";
        acumErrores++;
    }
    else {
        var w4brand_3 = document.getElementById("wheel04Brand");
        w4brand_3.classList.remove('is-invalid');
        w4brand_3.classList.add("is-valid");
        errorWheelBrand04.innerHTML = "";
        okWheelBrand04.innerHTML = okFeedback;
    }
    //Wheel 04 Diameter
    if (!w4Diameter) {
        var w4Diameter_1 = document.getElementById("wheel04Diameter");
        w4Diameter_1.classList.add("is-invalid");
        errorWheelDiameter04.innerHTML = "Diameter missing.";
        okWheelDiameter04.innerHTML = "";
        acumErrores++;
    }
    else if (w4Diameter < 0.4 || w4Diameter > 2) {
        var w4Diameter_2 = document.getElementById("wheel04Diameter");
        w4Diameter_2.classList.add("is-invalid");
        errorWheelDiameter04.innerHTML = "Please enter a valid diameter (between 0.4 and 2).";
        okWheelDiameter04.innerHTML = "";
        acumErrores++;
    }
    else {
        var w4Diameter_3 = document.getElementById("wheel04Diameter");
        w4Diameter_3.classList.remove('is-invalid');
        w4Diameter_3.classList.add("is-valid");
        errorWheelDiameter04.innerHTML = "";
        okWheelDiameter04.innerHTML = okFeedback;
    }
    //Acumulació errors 
    if (acumErrores > 0) {
        return false;
    }
    else {
        return true;
    }
}
// MOSTRAR LA INFO DEL COTXE CREAT
function mostrarInfoCotxeCreat(car) {
    var mostrar = document.getElementById("carInfo");
    var element = document.createElement("div");
    element.innerHTML = "\n    <div class=\"card text-center mb-3 bg-light\">\n        <div class=\"card-header bg-dark text-light\">\n            <strong>CAR: </strong>" + cotxesBBDD.length + "\n        </div>\n        <div class=\"card-body\">\n            <div class=\"row\">\n                <div class=\"col\">\n                    <strong><i> PLATE: </i></strong>" + car.plate + "\n                </div>\n                <div class=\"col\">\n                    <strong><i>COLOUR: </i></strong>" + car.color + "\n                </div>\n                <div class=\"col\">\n                    <strong><i>BRAND: </i></strong>" + car.brand + "\n                </div>\n            </div>\n            <div class=\"row mt-3\">\n                <strong><i>WHEELS: </i></strong>\n            </div>\n            <div class=\"row row-cols-4\">\n                <div class=\"col\">\n                    <div class=\"row\">\n                        <strong><i>Wheel 01: </i></strong>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col\">\n                            <i>Diameter: </i>" + car.wheels[0].diameter + "\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col\">\n                            <i>Brand: </i> " + car.wheels[0].brand + "\n                        </div>\n                    </div>\n                </div>\n                <div class=\"col\">\n                    <div class=\"row\">\n                        <strong><i>Wheel 02: </i></strong>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col\">\n                            <i>Diameter: </i>" + car.wheels[1].diameter + "\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col\">\n                            <i>Brand: </i> " + car.wheels[1].brand + "\n                        </div>\n                    </div>\n                </div>\n                <div class=\"col\">\n                    <div class=\"row\">\n                        <strong><i>Wheel 03: </i></strong>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col\">\n                            <i>Diameter: </i>" + car.wheels[2].diameter + "\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col\">\n                            <i>Brand: </i> " + car.wheels[2].brand + "\n                        </div>\n                    </div>\n                </div>\n                <div class=\"col\">\n                    <div class=\"row\">\n                        <strong><i>Wheel 04: </i></strong>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col\">\n                            <i>Diameter: </i>" + car.wheels[3].diameter + "\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col\">\n                            <i>Brand: </i> " + car.wheels[3].brand + "\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    ";
    mostrar.appendChild(element);
}
// VALIDACIÓ
function parametreValidacio(expr, paraula) {
    return expr.test(paraula) ? true : false;
}
// RESETEJAR EL FORMULARIS
function clearForm(myForm) {
    myForm.reset();
}
// AMAGAR UN FORM I MOSTRAR-NE UN ALTRE
function canviDeForms() {
    //si cliquem a create car, apareix el de create wheels
    if (createTheWheelsArea.style.display == "none") {
        createTheWheelsArea.style.display = "block";
        createACarArea.style.display = "none";
    }
    //si cliquem a create wheels, apareix el de create car
    else if (createACarArea.style.display == "none") {
        createTheWheelsArea.style.display = "none";
        createACarArea.style.display = "block";
    }
}
/* CODI ORIGINAL DE L'IT ACADEMY
function createCar(plate: string, brand: string, color: string) {
    let car = new Car(plate, color, brand);
    car.addWheel(new Wheel(2, "SEAT"));
    document.body.innerText = "CAR: PLATE: " + car.plate
        + " COLOR: " + car.color + " BRAND: " + brand
        + " WHEELS: " + JSON.stringify(car.wheels);
}
*/ 
