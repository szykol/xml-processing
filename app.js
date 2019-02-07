print = (text) => {
    console.log(text);
}

function loadAndDisplay(type) {
    if (type)
        load(`//movie[@type='${type}']`, list => displayData(list));
    else
        load('//movie', list => displayData(list));
}

function load(XPath, callback) {
    getXML(xml => {
        const nodes = xml.evaluate(`${XPath}`, xml, null, XPathResult.ANY_TYPE, null);
        console.log(nodes);

        let currentMovie = nodes.iterateNext();

        objects = [];
        while (currentMovie) {
            print(currentMovie);
            const title = currentMovie.childNodes[1].firstChild.nodeValue;
            const author = currentMovie.childNodes[3].firstChild.nodeValue;
            const imURL = currentMovie.childNodes[5].firstChild.nodeValue;
            const year = currentMovie.childNodes[7].firstChild.nodeValue;

            let info = {
                title,
                author,
                imURL,
                year
            };

            objects.push(info);
            currentMovie = nodes.iterateNext();
        }
        callback(objects);
    });
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
        img.setAttribute('width', "190px");
        img.setAttribute('height', "300px");
        card.appendChild(img);

        let year = document.createElement('h4');
        year.textContent = obj['year'];
        card.appendChild(year);

        data.appendChild(card);
    }
    data.style.display = "block";
}

function getXML(callback) {
    var req = new XMLHttpRequest();
    req.open('GET', '/movies.xml');
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
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

function getTag() {
    const tagName = document.getElementById('name').value;

    let data = document.getElementById('info');
    data.innerHTML = "";

    getXML(xml => {
        const nodes = xml.evaluate(`//${tagName}`, xml, null, XPathResult.ANY_TYPE, null);
        console.log(nodes);

        let currentNode = nodes.iterateNext();

        while (currentNode) {
            let p = document.createElement('p');
            const xmlString = (new XMLSerializer()).serializeToString(currentNode);
            p.textContent += xmlString;
            data.appendChild(p);

            currentNode = nodes.iterateNext();
        }
    });
    data.style.display = "block";
}