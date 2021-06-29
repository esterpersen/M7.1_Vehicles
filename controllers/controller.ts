// Array on guardarem tots els cotxes creats
let cotxesBBDD: any[] = [];

// La zona del formulari del cotxe
let createACarArea = <HTMLFormElement>document.getElementById('formulariEntrarCotxe');

// El form del cotxe
let createACar = <HTMLFormElement>document.getElementById("createACar");

// La zona del formulari de les rodes 
let createTheWheelsArea = <HTMLFormElement>document.getElementById('formulariEntrarWheels');

// El form de les wheels
let createTheWheels = <HTMLFormElement>document.getElementById("createWheels");

// Expressions regulars per a la validació
const exp = {
    plate: /^[\d]{4}[a-zA-Z]{3}$/gi,
    word: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,'-]+$/u,
};

// Per evitar que es refresqui la pàgina quan es clica al boto de crear cotxe del form
const crearCotxeBoto = <HTMLButtonElement>document.getElementById("crearCotxeBoto");
crearCotxeBoto.addEventListener("click", function (event) {
    event.preventDefault();
});

// Per evitar que es refresqui la pàgina quan es clica al boto de mostrar exemple
const mostrarExempleCotxeBoto = <HTMLButtonElement>document.getElementById("mostrarExempleCotxeBoto");
mostrarExempleCotxeBoto.addEventListener("click", function (event) {
    event.preventDefault();
});

// Per evitar que es refresqui la pàgina quan es clica al boto  crear wheels del form
const crearwheelsBoto = <HTMLButtonElement>document.getElementById("crearWheelsBoto");
crearwheelsBoto.addEventListener("click", function (event) {
    event.preventDefault();
});

function showExampleCar() {
    let car: Car = new Car('1212SDS', 'VERMELL', 'SEAT');
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
    let carPlate: string = (<HTMLInputElement>document.getElementById("carPlate")).value.toUpperCase();
    let carColour: string = (<HTMLInputElement>document.getElementById("carColour")).value.toUpperCase();
    let carBrand: string = (<HTMLInputElement>document.getElementById("carBrand")).value.toUpperCase();

    // Comprovar si la info del cotxe és correcta (validació)
    let infoCotxeCorrecte: boolean = checkInfoCar(carPlate, carColour, carBrand);

    // Si la info del cotxe és correcta: 
    if (infoCotxeCorrecte == true) {
        // Crear objecte amb la info del form si es correcte       
        let car = new Car(carPlate, carColour, carBrand);

        //Guardar-lo a l'array
        cotxesBBDD.push(car);

        // Posar formulari en blanc
        clearForm(createACar);

        // Treure la class de format dels inputs del form
        let carPlateInput: HTMLInputElement = <HTMLInputElement>document.getElementById("carPlate");
        carPlateInput.classList.remove('is-valid');
        let carColourInput: HTMLInputElement = <HTMLInputElement>document.getElementById("carColour");
        carColourInput.classList.remove('is-valid');
        let carBrandInput: HTMLInputElement = <HTMLInputElement>document.getElementById("carBrand");
        carBrandInput.classList.remove('is-valid');

        // Mostrar el formulari de wheels i ocultar el formulari de cotxe
        canviDeForms();
    }
};

//Comprovar que els inputs no estiguin en blanc, o siguin incorrectes
function checkInfoCar(inputPlate: string, inputColour: string, inputBrand: string) {
    // Comptador d'errors per si falta info
    var acumErrores = 0;

    // Treure la class is-invalid de moment
    createACar.classList.remove('is-invalid');

    //missatges d'error i d'ok per cada field
    //plate
    let errorPlate = <HTMLDivElement>document.getElementById("errorCarPlate");
    let okPlate = <HTMLDivElement>document.getElementById("okCarPlate");
    //colour
    let errorColour = <HTMLDivElement>document.getElementById("errorCarColour");
    let okColour = <HTMLDivElement>document.getElementById("okCarColour");
    //brand
    let errorBrand = <HTMLDivElement>document.getElementById("errorCarBrand");
    let okBrand = <HTMLDivElement>document.getElementById("okCarBrand");
    //correcte
    let okFeedback = "Looks good!";

    //Què passa si es deixa en blanc algun input, o si és incorrecte:
    //PLATE
    if (inputPlate === '') {
        const inputCarPlate = <HTMLInputElement>document.getElementById("carPlate");
        inputCarPlate.classList.add("is-invalid");
        errorPlate.innerHTML = "Plate missing.";
        okPlate.innerHTML = "";
        acumErrores++;
    } else if (parametreValidacio(exp.plate, inputPlate) == false) {
        const inputCarPlate = <HTMLInputElement>document.getElementById("carPlate");
        inputCarPlate.classList.add("is-invalid");
        errorPlate.innerHTML = "Please enter a valid plate (4 numbers and 3 letters).";
        okPlate.innerHTML = "";
        acumErrores++;
    } else {
        const inputCarPlate = <HTMLInputElement>document.getElementById("carPlate");
        inputCarPlate.classList.remove('is-invalid');
        inputCarPlate.classList.add("is-valid");
        errorPlate.innerHTML = "";
        okPlate.innerHTML = okFeedback;
    }

    //COLOUR
    if (inputColour === "") {
        const inputColour = <HTMLInputElement>document.getElementById("carColour");
        inputColour.classList.add("is-invalid");
        errorColour.innerHTML = "Colour missing.";
        okColour.innerHTML = "";
        acumErrores++;
    } else if (parametreValidacio(exp.word, inputColour) == false) {
        const inputColour = <HTMLInputElement>document.getElementById("carColour");
        inputColour.classList.add("is-invalid");
        errorColour.innerHTML = "Please enter a valid colour name (only letters).";
        okColour.innerHTML = "";
        acumErrores++;
    } else {
        const inputColour = <HTMLInputElement>document.getElementById("carColour");
        inputColour.classList.remove('is-invalid');
        inputColour.classList.add("is-valid");
        errorColour.innerHTML = "";
        okColour.innerHTML = okFeedback;
    }

    //BRAND
    if (inputBrand === "") {
        const inputBrand = <HTMLInputElement>document.getElementById("carBrand");
        inputBrand.classList.add("is-invalid");
        errorBrand.innerHTML = "Brand missing.";
        okBrand.innerHTML = "";
        acumErrores++;
    } else if (parametreValidacio(exp.word, inputBrand) == false) {
        const inputBrand = <HTMLInputElement>document.getElementById("carBrand");
        inputBrand.classList.add("is-invalid");
        errorBrand.innerHTML = "Please enter a valid brand name (only letters).";
        okBrand.innerHTML = "";
        acumErrores++;
    } else {
        const inputBrand = <HTMLInputElement>document.getElementById("carBrand");
        inputBrand.classList.remove('is-invalid');
        inputBrand.classList.add("is-valid");
        errorBrand.innerHTML = "";
        okBrand.innerHTML = okFeedback;
    }

    //Acumulació errors 
    if (acumErrores > 0) {
        return false;
    } else {
        return true;
    }
}

//He d'activar aquesta funció quan es cliqui el botó crear wheels.

function createWheels() {
    //Agafar l'últim cotxe creat per afegir-li les wheels
    let car = cotxesBBDD[cotxesBBDD.length - 1];

    //Agafar els valors dels inputs de les wheels
    let wheel01Brand: string = (<HTMLInputElement>document.getElementById("wheel01Brand")).value.toUpperCase();
    let wheel01Diameter: number = parseFloat((<HTMLInputElement>document.getElementById("wheel01Diameter")).value);
    let wheel02Brand: string = (<HTMLInputElement>document.getElementById("wheel02Brand")).value.toUpperCase();
    let wheel02Diameter: number = parseFloat((<HTMLInputElement>document.getElementById("wheel02Diameter")).value);
    let wheel03Brand: string = (<HTMLInputElement>document.getElementById("wheel03Brand")).value.toUpperCase();
    let wheel03Diameter: number = parseFloat((<HTMLInputElement>document.getElementById("wheel03Diameter")).value);
    let wheel04Brand: string = (<HTMLInputElement>document.getElementById("wheel04Brand")).value.toUpperCase();
    let wheel04Diameter: number = parseFloat((<HTMLInputElement>document.getElementById("wheel04Diameter")).value);

    //Validem la informació
    // Comprovar si la info del cotxe és correcta (validació)
    let infoWheelsCorrecte: boolean = checkInfoWheels(wheel01Brand, wheel01Diameter, wheel02Brand, wheel02Diameter, wheel03Brand, wheel03Diameter, wheel04Brand, wheel04Diameter);

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
        let wheel01BrandInput: HTMLInputElement = <HTMLInputElement>document.getElementById("wheel01Brand");
        wheel01BrandInput.classList.remove('is-valid');
        let wheel01DiameterInput: HTMLInputElement = <HTMLInputElement>document.getElementById("wheel01Diameter");
        wheel01DiameterInput.classList.remove('is-valid');

        let wheel02BrandInput: HTMLInputElement = <HTMLInputElement>document.getElementById("wheel02Brand");
        wheel02BrandInput.classList.remove('is-valid');
        let wheel02DiameterInput: HTMLInputElement = <HTMLInputElement>document.getElementById("wheel02Diameter");
        wheel02DiameterInput.classList.remove('is-valid');

        let wheel03BrandInput: HTMLInputElement = <HTMLInputElement>document.getElementById("wheel03Brand");
        wheel03BrandInput.classList.remove('is-valid');
        let wheel03DiameterInput: HTMLInputElement = <HTMLInputElement>document.getElementById("wheel03Diameter");
        wheel03DiameterInput.classList.remove('is-valid');

        let wheel04BrandInput: HTMLInputElement = <HTMLInputElement>document.getElementById("wheel04Brand");
        wheel04BrandInput.classList.remove('is-valid');
        let wheel04DiameterInput: HTMLInputElement = <HTMLInputElement>document.getElementById("wheel04Diameter");
        wheel04DiameterInput.classList.remove('is-valid');

        // Mostrar info si tot correcte
        mostrarInfoCotxeCreat(car);
    }
}

function checkInfoWheels(w1brand: string, w1Diameter: number, w2brand: string, w2Diameter: number, w3brand: string, w3Diameter: number, w4brand: string, w4Diameter: number) {

    // Comptador d'errors per si falta info
    var acumErrores = 0;

    // Treure la class is-invalid de moment
    createTheWheels.classList.remove('is-invalid');

    //missatges d'error i d'ok per cada field
    //wheel 01
    let errorWheelBrand01 = <HTMLDivElement>document.getElementById("errorWheelBrand01");
    let errorWheelDiameter01 = <HTMLDivElement>document.getElementById("errorWheelDiameter01");
    let okWheelBrand01 = <HTMLDivElement>document.getElementById("okWheelBrand01");
    let okWheelDiameter01 = <HTMLDivElement>document.getElementById("okWheelDiameter01");
    //wheel 02
    let errorWheelBrand02 = <HTMLDivElement>document.getElementById("errorWheelBrand02");
    let errorWheelDiameter02 = <HTMLDivElement>document.getElementById("errorWheelDiameter02");
    let okWheelBrand02 = <HTMLDivElement>document.getElementById("okWheelBrand02");
    let okWheelDiameter02 = <HTMLDivElement>document.getElementById("okWheelDiameter02");
    //wheel 03
    let errorWheelBrand03 = <HTMLDivElement>document.getElementById("errorWheelBrand03");
    let errorWheelDiameter03 = <HTMLDivElement>document.getElementById("errorWheelDiameter03");
    let okWheelBrand03 = <HTMLDivElement>document.getElementById("okWheelBrand03");
    let okWheelDiameter03 = <HTMLDivElement>document.getElementById("okWheelDiameter03");
    //wheel 03
    let errorWheelBrand04 = <HTMLDivElement>document.getElementById("errorWheelBrand04");
    let errorWheelDiameter04 = <HTMLDivElement>document.getElementById("errorWheelDiameter04");
    let okWheelBrand04 = <HTMLDivElement>document.getElementById("okWheelBrand04");
    let okWheelDiameter04 = <HTMLDivElement>document.getElementById("okWheelDiameter04");
    //correcte
    let okFeedback = "Looks good!";

    //Wheel 01 Brand
    if (w1brand === "") {
        const w1brand = <HTMLInputElement>document.getElementById("wheel01Brand");
        w1brand.classList.add("is-invalid");
        errorWheelBrand01.innerHTML = "Brand missing.";
        okWheelBrand01.innerHTML = "";
        acumErrores++;
    } else if (parametreValidacio(exp.word, w1brand) == false) {
        const w1brand = <HTMLInputElement>document.getElementById("wheel01Brand");
        w1brand.classList.add("is-invalid");
        errorWheelBrand01.innerHTML = "Please enter a valid brand name (only letters).";
        okWheelBrand01.innerHTML = "";
        acumErrores++;
    } else {
        const w1brand = <HTMLInputElement>document.getElementById("wheel01Brand");
        w1brand.classList.remove('is-invalid');
        w1brand.classList.add("is-valid");
        errorWheelBrand01.innerHTML = "";
        okWheelBrand01.innerHTML = okFeedback;
    }
    //Wheel 01 Diameter
    if (!w1Diameter) {
        const w1Diameter = <HTMLInputElement>document.getElementById("wheel01Diameter");
        w1Diameter.classList.add("is-invalid");
        errorWheelDiameter01.innerHTML = "Diameter missing.";
        okWheelDiameter01.innerHTML = "";
        acumErrores++;
    } else if (w1Diameter < 0.4 || w1Diameter > 2) {
        const w1Diameter = <HTMLInputElement>document.getElementById("wheel01Diameter");
        w1Diameter.classList.add("is-invalid");
        errorWheelDiameter01.innerHTML = "Please enter a valid diameter (between 0.4 and 2).";
        okWheelDiameter01.innerHTML = "";
        acumErrores++;
    } else {
        const w1Diameter = <HTMLInputElement>document.getElementById("wheel01Diameter");
        w1Diameter.classList.remove('is-invalid');
        w1Diameter.classList.add("is-valid");
        errorWheelDiameter01.innerHTML = "";
        okWheelDiameter01.innerHTML = okFeedback;
    }

    //Wheel 02 Brand
    if (w2brand === "") {
        const w2brand = <HTMLInputElement>document.getElementById("wheel02Brand");
        w2brand.classList.add("is-invalid");
        errorWheelBrand02.innerHTML = "Brand missing.";
        okWheelBrand02.innerHTML = "";
        acumErrores++;
    } else if (parametreValidacio(exp.word, w2brand) == false) {
        const w2brand = <HTMLInputElement>document.getElementById("wheel02Brand");
        w2brand.classList.add("is-invalid");
        errorWheelBrand02.innerHTML = "Please enter a valid brand name (only letters).";
        okWheelBrand02.innerHTML = "";
        acumErrores++;
    } else {
        const w2brand = <HTMLInputElement>document.getElementById("wheel02Brand");
        w2brand.classList.remove('is-invalid');
        w2brand.classList.add("is-valid");
        errorWheelBrand02.innerHTML = "";
        okWheelBrand02.innerHTML = okFeedback;
    }
    //Wheel 02 Diameter
    if (!w2Diameter) {
        const w2Diameter = <HTMLInputElement>document.getElementById("wheel02Diameter");
        w2Diameter.classList.add("is-invalid");
        errorWheelDiameter02.innerHTML = "Diameter missing.";
        okWheelDiameter02.innerHTML = "";
        acumErrores++;
    } else if (w2Diameter < 0.4 || w2Diameter > 2) {
        const w2Diameter = <HTMLInputElement>document.getElementById("wheel02Diameter");
        w2Diameter.classList.add("is-invalid");
        errorWheelDiameter02.innerHTML = "Please enter a valid diameter (between 0.4 and 2).";
        okWheelDiameter02.innerHTML = "";
        acumErrores++;
    } else {
        const w2Diameter = <HTMLInputElement>document.getElementById("wheel02Diameter");
        w2Diameter.classList.remove('is-invalid');
        w2Diameter.classList.add("is-valid");
        errorWheelDiameter02.innerHTML = "";
        okWheelDiameter02.innerHTML = okFeedback;
    }

    //Wheel 03 Brand
    if (w3brand === "") {
        const w3brand = <HTMLInputElement>document.getElementById("wheel03Brand");
        w3brand.classList.add("is-invalid");
        errorWheelBrand03.innerHTML = "Brand missing.";
        okWheelBrand03.innerHTML = "";
        acumErrores++;
    } else if (parametreValidacio(exp.word, w3brand) == false) {
        const w3brand = <HTMLInputElement>document.getElementById("wheel03Brand");
        w3brand.classList.add("is-invalid");
        errorWheelBrand03.innerHTML = "Please enter a valid brand name (only letters).";
        okWheelBrand03.innerHTML = "";
        acumErrores++;
    } else {
        const w3brand = <HTMLInputElement>document.getElementById("wheel03Brand");
        w3brand.classList.remove('is-invalid');
        w3brand.classList.add("is-valid");
        errorWheelBrand03.innerHTML = "";
        okWheelBrand03.innerHTML = okFeedback;
    }
    //Wheel 03 Diameter
    if (!w3Diameter) {
        const w3Diameter = <HTMLInputElement>document.getElementById("wheel03Diameter");
        w3Diameter.classList.add("is-invalid");
        errorWheelDiameter03.innerHTML = "Diameter missing.";
        okWheelDiameter03.innerHTML = "";
        acumErrores++;
    } else if (w3Diameter < 0.4 || w3Diameter > 2) {
        const w3Diameter = <HTMLInputElement>document.getElementById("wheel03Diameter");
        w3Diameter.classList.add("is-invalid");
        errorWheelDiameter03.innerHTML = "Please enter a valid diameter (between 0.4 and 2).";
        okWheelDiameter03.innerHTML = "";
        acumErrores++;
    } else {
        const w3Diameter = <HTMLInputElement>document.getElementById("wheel03Diameter");
        w3Diameter.classList.remove('is-invalid');
        w3Diameter.classList.add("is-valid");
        errorWheelDiameter03.innerHTML = "";
        okWheelDiameter03.innerHTML = okFeedback;
    }

    //Wheel 04 Brand
    if (w4brand === "") {
        const w4brand = <HTMLInputElement>document.getElementById("wheel04Brand");
        w4brand.classList.add("is-invalid");
        errorWheelBrand04.innerHTML = "Brand missing.";
        okWheelBrand04.innerHTML = "";
        acumErrores++;
    } else if (parametreValidacio(exp.word, w4brand) == false) {
        const w4brand = <HTMLInputElement>document.getElementById("wheel04Brand");
        w4brand.classList.add("is-invalid");
        errorWheelBrand04.innerHTML = "Please enter a valid brand name (only letters).";
        okWheelBrand04.innerHTML = "";
        acumErrores++;
    } else {
        const w4brand = <HTMLInputElement>document.getElementById("wheel04Brand");
        w4brand.classList.remove('is-invalid');
        w4brand.classList.add("is-valid");
        errorWheelBrand04.innerHTML = "";
        okWheelBrand04.innerHTML = okFeedback;
    }
    //Wheel 04 Diameter
    if (!w4Diameter) {
        const w4Diameter = <HTMLInputElement>document.getElementById("wheel04Diameter");
        w4Diameter.classList.add("is-invalid");
        errorWheelDiameter04.innerHTML = "Diameter missing.";
        okWheelDiameter04.innerHTML = "";
        acumErrores++;
    } else if (w4Diameter < 0.4 || w4Diameter > 2) {
        const w4Diameter = <HTMLInputElement>document.getElementById("wheel04Diameter");
        w4Diameter.classList.add("is-invalid");
        errorWheelDiameter04.innerHTML = "Please enter a valid diameter (between 0.4 and 2).";
        okWheelDiameter04.innerHTML = "";
        acumErrores++;
    } else {
        const w4Diameter = <HTMLInputElement>document.getElementById("wheel04Diameter");
        w4Diameter.classList.remove('is-invalid');
        w4Diameter.classList.add("is-valid");
        errorWheelDiameter04.innerHTML = "";
        okWheelDiameter04.innerHTML = okFeedback;
    }

    //Acumulació errors 
    if (acumErrores > 0) {
        return false;
    } else {
        return true;
    }
}

// MOSTRAR LA INFO DEL COTXE CREAT
function mostrarInfoCotxeCreat(car: Car) {
    let mostrar = <HTMLInputElement>document.getElementById("carInfo");

    const element = document.createElement("div");
    element.innerHTML = `
    <div class="card text-center mb-3 bg-light">
        <div class="card-header bg-dark text-light">
            <strong>CAR: </strong>${cotxesBBDD.length}
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col">
                    <strong><i> PLATE: </i></strong>${car.plate}
                </div>
                <div class="col">
                    <strong><i>COLOUR: </i></strong>${car.color}
                </div>
                <div class="col">
                    <strong><i>BRAND: </i></strong>${car.brand}
                </div>
            </div>
            <div class="row mt-3">
                <strong><i>WHEELS: </i></strong>
            </div>
            <div class="row row-cols-4">
                <div class="col">
                    <div class="row">
                        <strong><i>Wheel 01: </i></strong>
                    </div>
                    <div class="row">
                        <div class="col">
                            <i>Diameter: </i>${car.wheels[0].diameter}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <i>Brand: </i> ${car.wheels[0].brand}
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="row">
                        <strong><i>Wheel 02: </i></strong>
                    </div>
                    <div class="row">
                        <div class="col">
                            <i>Diameter: </i>${car.wheels[1].diameter}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <i>Brand: </i> ${car.wheels[1].brand}
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="row">
                        <strong><i>Wheel 03: </i></strong>
                    </div>
                    <div class="row">
                        <div class="col">
                            <i>Diameter: </i>${car.wheels[2].diameter}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <i>Brand: </i> ${car.wheels[2].brand}
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="row">
                        <strong><i>Wheel 04: </i></strong>
                    </div>
                    <div class="row">
                        <div class="col">
                            <i>Diameter: </i>${car.wheels[3].diameter}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <i>Brand: </i> ${car.wheels[3].brand}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    mostrar.appendChild(element);
}

// VALIDACIÓ
function parametreValidacio(expr: RegExp, paraula: string) {
    return expr.test(paraula) ? true : false;
}

// RESETEJAR EL FORMULARIS
function clearForm(myForm: HTMLFormElement) {
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