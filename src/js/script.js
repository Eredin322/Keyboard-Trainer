const input = document.querySelector('.input');
const letters = Array.from(document.querySelectorAll('[data-letters]'));
const specs = Array.from(document.querySelectorAll('[data-spec]'));

const text = `Якуты являются коренным населением Республики Якутия (Саха) и самым крупным из всех коренных народов Сибири. О предках якутов было впервые упомянуто в 14 веке. Предки современных якутов - кочевое племя курыканов, которые до XIVвека жили на территории Забайкалья. Пришли они туда из-за реки Енисей. Якуты делятся на несколько основных групп:
- амгинско-ленские, проживают между рекой Леной, на прилегающем левобережье реки, между нижним Алданом и Амгой;
- олёкминские, заселяют территории в бассейне Олёкмы;
- вилюйские, живут в бассейне Вилюя;
- северные, проживают в тундровой зоне бассейнов рек Колыма, Оленёк, Анабар, Индигирка и Яна.
Самоназвание народа звучит как саха, во множественном числе сахалар. Есть и старинное самоназвание уранхай, которое еще пишется ураанхай и ураангхай. Эти названия и сегодня используются в торжественных речах, песнях и олонхо. Есть среди якутов сахаляры — метисы, потомки смешанных браков между якутами и представителями европеоидной расы. Это слово нельзя путать с вышеупомянутым сахалар.`
const party = createParty(text);
console.log(party);
init();

function init(){
    input.addEventListener('keydown', keydownHandler);
    input.addEventListener('keyup', keyupHandler);
}

function keydownHandler(event){
    event.preventDefault();
    const letter = letters.find(element => element.dataset.letters.includes(event.key))

    if(letter){
        letter.classList.add('pressed');
        return
    }
    let key = event.key.toLowerCase();

    if (key === ' '){
        key = 'space';
    }

    const ownSpecs = specs.filter(element => element.dataset.spec === key);

    if (ownSpecs.length){
        ownSpecs.forEach((ownSpecs => ownSpecs.classList.add('pressed')));
        return;
    }

    console.warn('Неизвестный вид клавиши', event);
}
function keyupHandler(event){
    event.preventDefault();
    const letter = letters.find(element => element.dataset.letters.includes(event.key))
    
    if(letter){
        letter.classList.remove('pressed');
        return
    }
    let key = event.key.toLowerCase()

    if (key === ' '){
        key = 'space';
    }

    const ownSpecs = specs.filter(element => element.dataset.spec === key);

    if (ownSpecs.length){
        ownSpecs.forEach((ownSpecs => ownSpecs.classList.remove('pressed')));
        return;
    }
}

function createParty(text){
    const party = {
        text,
        strings: [],
        maxStringLength: 70,
        maxShowString: 3,
        currentStringIndex: 0,
        currentPrintedIndex: 0,
        errors: [],
    };

    party.text = party.text.replace(/\n/g, '\n ');
    const words = party.text.split(' ');
    let string = [];
    for(const word of words){
        const newStringLength =
            [...string, word].join(' ').length;// Я удалил + !word.includes('\n') потому что хер знает зачем оно

        if(newStringLength > party.maxStringLength){
            party.strings.push(string.join(' ') + ' ')
            string = [];
        }

        string.push(word);

        if(word.includes('\n')){
            party.strings.push(string.join(' '))
            string = [];
        }
    }

    // if (string.length) {
    //     party.strings.push(string.join(' ')); // тоже не понятно что делает этот код
    // }

    return party;
}