# Express backend luominen

- forkkasin express sequelize https://github.com/Es-Esa/nodejs-express-sequelize-mysql
- redux-toolkit-example-crud-hooks https://github.com/Es-Esa/redux-toolkit-example-crud-hooks






## Express asennus

- npm intall

- tietokanna luonti.

- tietokkanna konfigurointi jotta toimii expressin kanssa:

```
module.exports = {
  HOST: "127.0.0.1",
  USER: "root",
  PASSWORD: "toor",
  DB: "tutorials",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
```


## redux_react frontin asennus

- npm install


## backendin rakentaminen jotta se voi käsitellä kommentteja

- modelien ja controllerin luonti

- comments.model.js luonti jotta sequelize pystyy luomaan kommentikentät tietokantaan.
- tutorial.model.js muutos jotta suhde on "yhden suhde moneen"

```
 Tutorial.associate = function (models) {
    Tutorial.hasMany(models.Comment, { as: 'comments' });
  };
```

- index.js tehty muutoksia jotta se osaa ajaa sen scriptin sinne tietokantaan.


- comment.controller.js luonti.

> Tämän controllerin tehtävä on luoda ja hakea tietokannasta kommentit.
> Katso tarkemmin kommentit tiedostosta.



## Routes muokkaus


Lisätty reitit Api rajapintaan.

```
// Route for creating a comment
  router.post('/comments/:tutorialId', comments.create);

// Route for fetching all comments for a tutorial
  router.get('/comments/:tutorialId', comments.findAll);
```



## testaus

Tietokanta toimii ja palauttaa sinne manauaalisesti lisätyt kommentit.



---




# Front end Redux, react front

- Loin /service/commentservice.js

> Tämä sisältää axio kutsun joka käsittelee funktioita.
> Funktiot lisäävät kommentteja tai hakee kaikki kommentit tietokannasta.

- Loin /slice/comments.js

> Tämä sisältää createSlice ja  createAsyncThunk funktiot, createSlice luo uuden slice-olion, se sisältää reducerit ja action creators. Taas createAsyncThunk luo uuden thunkin, joka käsittelee asynkronisisa toimintoja.

- Päivitin /store/store.js

> Jossa lisäsin importin slices/comments ja päivitin reducer muuttujan 
> comments: commentsReducer



- Loin components/AddComments.js

> Tämä on komponentti joka lisää uuden komponentin.

- Tein muutosta Tutorial.js

Importasin `import { createComment, retrieveComments } from "../slices/comments"; `

Lisäsin uuden tila   `const [newComment, setNewComment] = useState(""); // tämä on uusi tila kommentille joka lisätään tutoriaaliin`

Käytetään dispatch funktiota Reduxin action creatorien kutsumiseenconst`dispatch = useDispatch();`

Haetaan kommentit statesta `const comments = useSelector(state => state.comments || []);` 

Käytetään hook joka hakee tutoriaalit ja kommentit kun sivu alkaa

```
  useEffect(() => {
    const getTutorial = id => {
      TutorialDataService.get(id)
        .then(response => {
          setCurrentTutorial(response.data);
          console.log(" ID tutoriaaliin:", id); // debugausta
          dispatch(retrieveComments(id)); // hakee kommentit tutoriaalille kun tutoriaali on haettu
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    if (id) {
      getTutorial(id);
    }
  }, [id, dispatch]);
```


Käsitellään kemmentien muutos input-ketässä ja päivitetään se newComment tilaan. 

```
const handleCommentChange = event => {
    setNewComment(event.target.value); 
  };
```


Määritetään kommenttien lisäsys funktio

```
const addComment = () => {
    if (newComment.trim()) { // tarvitaa onko kommentti tyhjä, jos ei niin lisätään kommentti
      dispatch(createComment({ tutorialId: currentTutorial.id, text: newComment }))
        .unwrap()
        .then(() => {
          setNewComment(""); // tyhjentää input-kentän
          setMessage("Comment added successfully!");
        })
        .catch(e => {
          console.log(e);
        });
    }
  };
```


  Lisätään tarvittavat html tagit

```
  <h4>Comments</h4>
          <ul>
            {comments.length > 0 ? (
              comments.map(comment => (
                <li key={comment.id}>{comment.text}</li>
              ))
            ) : (
              <p>No comments available.</p>
            )}
          </ul>

          <input
            type="text"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Add a comment"
          />
          <button onClick={addComment} className="badge badge-success">
            Add Comment
          </button>
```


## Debugaus

Jostain syystä Apista tuleva data toimi, mutta sliceri ei ottanut dataa muuttujiin.
Ongelma oli retriceCommentssa, korjasin kun tein async funktion samalalla tavalla kuin tutorial.js
Siksi löytyy paljon debugausta.


### Puppetter

Luovutin tämän suhteen, en saanut toimimaan. Virheitä virheiden perään. 
```
 FAIL  src/tests/addComment.test.js
  ● Test suite failed to run

    Cannot find module 'puppeteer-core/internal/puppeteer-core.js' from 'node_modules/puppeteer/lib/cjs/puppeteer/puppeteer.js'

    Require stack:
      node_modules/puppeteer/lib/cjs/puppeteer/puppeteer.js
      src/tests/addComment.test.js

      at Resolver.resolveModule (node_modules/jest-resolve/build/resolver.js:324:11)
      at Object.<anonymous> (node_modules/puppeteer/src/puppeteer.ts:9:1)

Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        0.725 s
```

ei löydä tätä moduulia, vaikka yrittäisin asentaa globaalisti, tai poistin koko node_moduulit ja asensin uudestaan. Mikään ei auttanut..

https://hackmd.io/@web2/rk1xDYLk1x




# Node.js Rest APIs with Express, Sequelize & MySQL example

For more detail, please visit:
> [Build Node.js Rest APIs with Express, Sequelize & MySQL](https://www.bezkoder.com/node-js-express-sequelize-mysql/)

> [Build Node.js Rest APIs with Express & MySQL (without Sequelize)](https://www.bezkoder.com/node-js-rest-api-express-mysql/)

> [Node.js Express File Upload Rest API example](https://www.bezkoder.com/node-js-express-file-upload/)

> [Server side Pagination in Node.js with Sequelize and MySQL](https://www.bezkoder.com/node-js-sequelize-pagination-mysql/)

> [Deploying/Hosting Node.js app on Heroku with MySQL database](https://www.bezkoder.com/deploy-node-js-app-heroku-cleardb-mysql/)

Front-end that works well with this Back-end
> [Axios Client](https://www.bezkoder.com/axios-request/)

> [Angular 8](https://www.bezkoder.com/angular-crud-app/) / [Angular 10](https://www.bezkoder.com/angular-10-crud-app/) / [Angular 11](https://www.bezkoder.com/angular-11-crud-app/) / [Angular 12](https://www.bezkoder.com/angular-12-crud-app/) / [Angular 13](https://www.bezkoder.com/angular-13-crud-example/) / [Angular 14](https://www.bezkoder.com/angular-14-crud-example/) / [Angular 15](https://www.bezkoder.com/angular-15-crud-example/) / [Angular 16 Client](https://www.bezkoder.com/angular-16-crud-example/) / [Angular 17 Client](https://www.bezkoder.com/angular-17-crud-example/)

> [Vue 2 Client](https://www.bezkoder.com/vue-js-crud-app/) / [Vue 3 Client](https://www.bezkoder.com/vue-3-crud/) / [Vuetify Client](https://www.bezkoder.com/vuetify-data-table-example/)

> [React Client](https://www.bezkoder.com/react-crud-web-api/) / [React Redux Client](https://www.bezkoder.com/react-redux-crud-example/)

## More Practice

Security:
> [Node.js Express: JWT example | Token Based Authentication & Authorization](https://www.bezkoder.com/node-js-jwt-authentication-mysql/)

Associations:
> [Sequelize Associations: One-to-Many Relationship example](https://www.bezkoder.com/sequelize-associate-one-to-many/)

> [Sequelize Associations: Many-to-Many Relationship example](https://www.bezkoder.com/sequelize-associate-many-to-many/)

Fullstack:
> [Vue.js + Node.js + Express + MySQL example](https://www.bezkoder.com/vue-js-node-js-express-mysql-crud-example/)

> [Vue.js + Node.js + Express + MongoDB example](https://www.bezkoder.com/vue-node-express-mongodb-mevn-crud/)

> [Angular 8 + Node.js + Express + MySQL example](https://www.bezkoder.com/angular-node-express-mysql/)

> [Angular 10 + Node.js + Express + MySQL example](https://www.bezkoder.com/angular-10-node-js-express-mysql/)

> [Angular 11 + Node.js + Express + MySQL example](https://www.bezkoder.com/angular-11-node-js-express-mysql/)

> [Angular 12 + Node.js + Express + MySQL example](https://www.bezkoder.com/angular-12-node-js-express-mysql/)

> [Angular 13 + Node.js + Express + MySQL example](https://www.bezkoder.com/angular-13-node-js-express-mysql/)

> [Angular 14 + Node.js + Express + MySQL example](https://www.bezkoder.com/angular-14-node-js-express-mysql/)

> [Angular 15 + Node.js + Express + MySQL example](https://www.bezkoder.com/angular-15-node-js-express-mysql/)

> [Angular 16 + Node.js + Express + MySQL example](https://www.bezkoder.com/angular-16-node-js-express-mysql/)

> [Angular 17 + Node.js + Express + MySQL example](https://www.bezkoder.com/angular-17-node-js-express-mysql/)

> [React + Node.js + Express + MySQL example](https://www.bezkoder.com/react-node-express-mysql/)

Integration (run back-end & front-end on same server/port)
> [Integrate React with Node.js Restful Services](https://www.bezkoder.com/integrate-react-express-same-server-port/)

> [Integrate Angular with Node.js Restful Services](https://www.bezkoder.com/integrate-angular-10-node-js/)

> [Integrate Vue with Node.js Restful Services](https://www.bezkoder.com/serve-vue-app-express/)

## Project setup
```
npm install
```

### Run
```
node server.js
```
