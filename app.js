print = (text) => {
    console.log(text);
}

function loadAndDisplay(type) {
    if (type) 
        load(`//book[@type='${type}']`, list => displayData(list));
    else
        load('//book',list=>displayData(list));
}

function loadAll() {
    load("//book[@type='science']", list => print(list));
}

function load(XPath, callback) {
    getXML(xml => {
        const nodes = xml.evaluate(`${XPath}`, xml, null, XPathResult.ANY_TYPE, null);
        console.log(nodes);

        let currentBook = nodes.iterateNext();

        objects = [];
        while(currentBook) {
            print(currentBook);
            const title = currentBook.childNodes[1].firstChild.nodeValue;
            const author = currentBook.childNodes[3].firstChild.nodeValue;
            const imURL = currentBook.childNodes[5].firstChild.nodeValue;
            const pages = currentBook.childNodes[7].firstChild.nodeValue;

            let info = {
                title,
                author,
                imURL,
                pages
            };

            objects.push(info);
            currentBook = nodes.iterateNext();
        }
        callback(objects);
    });
}

function loadScience() {
    load("//book[@type='science']", list => displayData(list));
}

function loadFeature() {
    load("//book[@type='feature']", list => displayData(list));
}

function loadIT() {
    load("//book[@type='it']", list => displayData(list));
}   

function displayData(objects) {
    let data = document.getElementById('info');
    data.innerHTML = "";

    for (obj of objects) {
        let card = document.createElement('div');
        card.classList.add('card');

        let title = document.createElement('h3');
        title.textContent = obj['title'];
        card.appendChild(title);

        // card.appendChild(document.createTextNode('br'));

        let author = document.createElement('h4');
        author.textContent = obj['author'];
        card.appendChild(author);

        let img = document.createElement('img');
        img.setAttribute('src', obj['imURL']);
        img.setAttribute('width',"190px");
        img.setAttribute('height',"300px");
        card.appendChild(img);

        data.appendChild(card);
    }
    data.style.display = "block";
}

function getXML(callback) {
    var req = new XMLHttpRequest();
    req.open('GET', '/books.xml');
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            if(req.status == 200) {
                let xml = req.responseXML;
                console.log(xml);
                callback(xml);
            } else {
                console.log('Cos nie pykło');
            }
        }
    }
    req.send();
}