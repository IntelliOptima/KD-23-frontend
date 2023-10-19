
interface CinemaScreenProps {
    movieLink: string | undefined;
}

const CinemaScreen = ({ movieLink }: CinemaScreenProps) => {
    //const screenDivCSS = `bg-black w-[580px] h-[325px] flex justify-center center-items`;

    const screenDivCSS = `cinemascreen bg-black relative border-t-3 border-gray-800 m-5 p-2 lg:p-4 rounded-lg
     lg:rounded-bl-50 lg:rounded-br-50 transition-transform
     w-[580px] h-[325px] flex justify-center center-items`;

    if (movieLink == null) {
        return (
            <h1 className="text-white">VideoLink is not available</h1>
        );
    }
    console.log(movieLink)
    const embedLink = movieLink?.match(/[?&]v=([^&]+)/);

    if (embedLink == null || embedLink[1] == null) {
        console.log(embedLink)

        return (
            <h1 className="text-white">Videolink is not compatible</h1>
        )
    }


    return (
        <div className="relative">
            <div id={'cinemascreen'} className={screenDivCSS}>
                <style>{`

                    @media all and (min-width: 960px){
                    #cinemascreen {
                    -webkit-animation: tvflicker .01s infinite alternate;
                    -moz-animation:    tvflicker .01s infinite alternate;
                    -o-animation:      tvflicker .01s infinite alternate;
                    animation:         tvflicker .01s infinite alternate; 
	                }

                    @-webkit-keyframes tvflicker {
                        0% {
                            box-shadow: 0 0 100px 0 rgba(225, 235, 255, 0.4);
                          }
                          100% {
                            box-shadow: 0 0 98px 0 rgba(200, 220, 255, 0.46);
                          }
	                }
                    @-moz-keyframes tvflicker {
                        0% {
                            box-shadow: 0 0 100px 0 rgba(225, 235, 255, 0.4);
                          }
                          100% {
                            box-shadow: 0 0 98px 0 rgba(200, 220, 255, 0.46);
                          }
	                }
                    @-o-keyframes tvflicker {
                        0% {
                            box-shadow: 0 0 100px 0 rgba(225, 235, 255, 0.4);
                          }
                          100% {
                            box-shadow: 0 0 98px 0 rgba(200, 220, 255, 0.46);
                          }
	                }
                    @keyframes tvflicker {
                        0% {
                            box-shadow: 0 0 100px 0 rgba(225, 235, 255, 0.4);
                          }
                          100% {
                            box-shadow: 0 0 98px 0 rgba(200, 220, 255, 0.46);
                          }
	                }
                    }

                `}</style>
                <iframe
                    className={`place-self-center`}
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${embedLink[1]}?autoplay=1&vq=hd1080`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
            </div>
        </div>
    );


}
export default CinemaScreen;


/*
return (
        <div className="relative">
          
          <div className="absolute inset-0 z-0 bg-white opacity-75 flicker-light"></div>
          <style>
  {`
    @keyframes flicker {
      0% {
        opacity: 0.4;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 0.6;
      }
    }
    
    .flicker-light {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(at center, rgba(255, 255, 255, 0.8) 10%, transparent 2%);
      background-size: 100% 100%; 
      opacity: 0.5;
      animation: flicker 0.3s infinite;
    }
  `}
</style>
          <div className={screenDivCSS}>
            <iframe
              className={`place-self-center`}
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${embedLink[1]}?autoplay=1&vq=hd1080`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        </div>
      );
*/