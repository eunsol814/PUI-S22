function RedPanda(name, age) {
    this.name = name;
    this.age = age;
    this.image_alt = "Red Panda";
    this.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Red_Panda_%2824986761703%29.jpg/2560px-Red_Panda_%2824986761703%29.jpg";
}

function Tiger(name, age) {
    this.name = name;
    this.age = age;
    this.image_alt = "Tiger";
    this.image = "https://i.natgeofe.com/n/5b36240a-b964-4bad-ad34-6888781c63ee/sumatran-tiger-nationalgeographic_1456276.jpg?w=2520&h=1680";
}

function Goldfish(name, age) {
    this.name = name;
    this.age = age;
    this.image_alt = "Goldfish";
    this.image = "https://www.petmd.com/sites/default/files/styles/article_image/public/goldfish-swimmingtoward_285011336_0.jpg?itok=ZZaLxiFQ";
}

var animals = [new RedPanda(), new Tiger(), new Goldfish()];
var names = ["Beauty",
    "Puffy",
    "Samantha",
    "Koty",
    "Chiquita",
    "Peanuts",
    "Boo-boo",
    "Itsy",
    "Polly",
    "Dragster",
    "Smudge",
    "Foxy",
    "Kenya",
    "Chocolate",
    "Cheyenne"];

function generateRandomIndex(maxIndex) {
    return Math.floor(Math.random() * maxIndex);
}

function generateRandomName() {
    var i = generateRandomIndex(names.length);
    return names[i];
}

function generateRandomAge() {
    return generateRandomIndex(5);
}

function generateRandomAnimal() {
    var randomIdx = generateRandomIndex(animals.length);
    var animal = animals[randomIdx];
    if (animal instanceof RedPanda) {
        return new RedPanda(generateRandomName(), generateRandomAge());
    } else if (animal instanceof Tiger) {
        return new Tiger(generateRandomName(), generateRandomAge());
    } else {
        return new Goldfish(generateRandomName(), generateRandomAge());
    }
}

function onLoad() {
    var randomAnimal = generateRandomAnimal();
    var img = document.getElementsByTagName("img")[0];
    var existingh1 = document.getElementsByTagName("h1");
    if (existingh1.length > 0) {
        existingh1[0].remove();
    };
    img.setAttribute("src", randomAnimal.image);
    const h1 = document.createElement("h1");
    h1.innerHTML = randomAnimal.name + " " + randomAnimal.age + " years old";
    document.body.insertBefore(h1, img);
}