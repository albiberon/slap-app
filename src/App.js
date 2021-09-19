import { useState } from "react";
import { createUseStyles } from "react-jss";
import { useWebcamCapture } from "./useWebcamCapture";
import slap from "./slap.png"
import slap2 from "./slap-2.png"
import slap3 from "./slap-3.png"
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from './Navbar'
import Readme from './Readme'

const useStyles = createUseStyles((theme) => ({
  "@global body": {
    background: theme.palette.background,
    color: theme.palette.text,
    fontFamily: "'Open Sans',sans-serif",
  },

  App: {
    padding: "30px",
    maxWidth: "700px",
    minHeight: "600px",
    background: "white",
    borderRadius: "20px",
    borderRight: "7px solid #e4edf8",
    borderBottom: "10px solid #e4edf8",
    margin: "40px auto",
    boxShadow: "0 40px 90px rgba(0, 0, 0, 0.45)",
    "& a": {
      color: theme.palette.text,
    },
  },
  Header: {
    paddingBottom: "10px",
    "&  h1": {
      cursor: "pointer",
      fontWeight: "700",
      fontSize: "4rem",
      color: theme.palette.header,
      display: "inline-block",
      margin: "0px",
      padding: "0px",
      textShadow: "1px 1px 1px #de6262, 1px 2px 1px #9e2929, 1px 3px 1px #9e2929, 1px 4px 1px #9e2929, 1px 5px 1px #9e2929,1px 6px 4px rgba(16,16,16,0.2), 1px 8px 7px rgba(16,16,16,0.2), 1px 11px 9px rgba(16,16,16,0.2)"
    },
  },
  Main: {
    "& canvas": {
      width: "90%",
      height: "auto",
      marginTop: "10px",
      marginLeft: "25px",
      borderRadius: "5px"
    },
    "& video": {
      display: "none",
    },
  },
  Stickers: {
    "& img": {
      height: "4rem",
    }
  },
  Gallery: {
    "& img": {
      height: "16rem",
    },
    "& input": {
      display: "block",
      width: "88%",
      margin: "10px auto",
      height: "40px",
      borderRadius: "5px",
      border: "1px solid #dadada",
      paddingLeft: "15px",
      color: theme.palette.text,
    }
  },
  Picture: {
    background: theme.palette.header,
    padding: 2,
    position: "relative",
    display: "inline-block",
    width: "180px",
    height: "auto",
    marginRight: "15px",
    marginBottom: "15px",
    "& h3": {
      textAlign: "left",
      width: "100%",
      paddingLeft: "5px",
      margin: "0px",
      color: "white",
      fontWeight: "400",
      fontSize: "1em"
    },
    "& img": {
      width: "180px",
      height: "auto",
    }
  },
  ButtonsContainer: {
    marginLeft: "20px"
    ,
    "& button": {
      margin: "10px",
      borderRadius: "5px",
      border: "1px solid #dadada",
      background: "white"
    },
    "& button:hover": {
      margin: "10px",
      borderRadius: "5px",
      border: "1px solid #dadada",
      background: "#dadada"
    }
  },
  StepsHeader: {
    fontWeight: "400",
    color: theme.palette.header
  },
  StepsContainer: {
    margin: "auto",
    with: "90%"
  },
  Step: {
    backgroundColor: theme.palette.header,
    display: "inline-block",
    color: "white",
    padding: "6px 10px",
    textAlign: "center",
    borderRadius: "50%",
    fontWeight: "600",
    marginRight: "10px",
    borderRight: "1px solid #9e2929",
    borderBottom: "3px solid #9e2929"
  },
}));

// array with sticker urls
const stickerUrls = [slap2, slap, slap3]

// function returns sticker objects for each sticker url in the stickerUrls array
const stickers = stickerUrls.map((url) => {
  let img = new Image()
  img.src = url
  return { img, url }
})


function App(props) {
  // css classes from JSS hook
  const classes = useStyles(props);
  // currently active sticker
  const [sticker, setSticker] = useState();
  // title for the picture that will be captured
  const [title, setTitle] = useState("SLAPPE!");

  const [pictures, addPictures] = useState([]) //Array to store captured screens

  // webcam behavior hook
  const [
    handleVideoRef, // callback function to set ref for invisible video element
    handleCanvasRef, // callback function to set ref for main canvas element
    handleCapture, // callback function to trigger taking the picture
    picture, // latest captured picture data object
  ] = useWebcamCapture(sticker?.img, title);


  // Function adds new picture into pictures array.
  const addToPicturesArray = () => {
    if (picture) {
      return addPictures((oldPictures) => [...oldPictures, picture])
    }
  }

  return (
    <div className={classes.App}>
      <header className={classes.Header}>
        <h1>Slapp!</h1>
        <Navbar />
      </header>
      <Switch>
        /** * Main app route */
        <Route path="/" exact>
          <main>
            <p>
              Have you ever said something so dumb, you just wanted to slap
              yourself? Well now you can!
            </p>
            <section className={classes.Gallery}>
              <h3 className={classes.StepsHeader}><span className={classes.Step}>1</span> Give it a name</h3>
              <input
                type="text"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
              />
            </section>
            <section className={classes.Stickers}>
              <h3 className={classes.StepsHeader}><span className={classes.Step}>2</span> Select your sticker</h3>
              <div className={classes.ButtonsContainer}>
                {
                  // A button created for each sticker
                  stickers.map((sticker) => {
                    return <button key={sticker.url} onClick={() => setSticker(sticker)} ><img src={sticker.url} /></button>
                  })
                }
              </div>
            </section>

            <section className={classes.Main}>
              <h3 className={classes.StepsHeader}><span className={classes.Step}>3</span> Slap your self!</h3>
              <video ref={handleVideoRef} />
              <canvas
                ref={handleCanvasRef}
                width={2}
                height={2}
                onClick={() => { handleCapture(); addToPicturesArray() }}
              // On Click addToPicturesArray function fired in addition to handleCapture.
              // I think I also introduced a bug. On second click the right picture is added into the Pictures array
              />
            </section>
            <section className={classes.Gallery}>
              <h3 className={classes.StepsHeader}><span className={classes.Step}>4</span>Cherish this moment forever</h3>
              <div className={classes.StepsContainer}>
                {
                  // Each picture in pictures array shown under 4th step
                  pictures.map((picture) => {
                    return (
                      <div key={picture.dataUri} className={classes.Picture}>
                        <img src={picture.dataUri} />
                        <h3>{picture.title}</h3>
                      </div>
                    )
                  })
                }
              </div>
            </section>
          </main>
        </Route>
        /** * Readme route */
        <Route path="/readme">
          <Readme />
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
