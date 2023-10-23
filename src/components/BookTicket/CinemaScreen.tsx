
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
        <div className="w-full">
            <div id={'cinemascreen'} className={screenDivCSS}>
                <style>{`

                    @media all and (min-width: 960px){
                    #cinemascreen {
                    -webkit-animation: tvflicker .1s infinite alternate;
                    -moz-animation:    tvflicker .1s infinite alternate;
                    -o-animation:      tvflicker .1s infinite alternate;
                    animation:         tvflicker .1s infinite alternate; 
	                }

                    @-webkit-keyframes tvflicker {
                        0% {
                            box-shadow: 0 0 100px 0 rgba(220, 235, 255, 0.4);
                          }
                        33% {
                          box-shadow: 0 0 99px 0 rgba(215, 235, 255, 0.42);
                          }
                        66% {
                          box-shadow: 0 0 98px 0 rgba(207, 235, 255, 0.46);
                          }
                        100% {
                            box-shadow: 0 0 97px 0 rgba(200, 220, 255, 0.48);
                          }
	                }
                    @-moz-keyframes tvflicker {
                      0% {
                        box-shadow: 0 0 100px 0 rgba(220, 235, 255, 0.4);
                      }
                    33% {
                      box-shadow: 0 0 99px 0 rgba(215, 235, 255, 0.42);
                      }
                    66% {
                      box-shadow: 0 0 98px 0 rgba(207, 235, 255, 0.46);
                      }
                    100% {
                        box-shadow: 0 0 97px 0 rgba(200, 220, 255, 0.48);
                      }
	                }
                    @-o-keyframes tvflicker {
                      0% {
                        box-shadow: 0 0 100px 0 rgba(220, 235, 255, 0.4);
                      }
                    33% {
                      box-shadow: 0 0 99px 0 rgba(215, 235, 255, 0.42);
                      }
                    66% {
                      box-shadow: 0 0 98px 0 rgba(207, 235, 255, 0.46);
                      }
                    100% {
                        box-shadow: 0 0 97px 0 rgba(200, 220, 255, 0.48);
                      }
	                }
                    @keyframes tvflicker {
                      0% {
                        box-shadow: 0 0 100px 0 rgba(220, 235, 255, 0.4);
                      }
                    33% {
                      box-shadow: 0 0 99px 0 rgba(215, 235, 255, 0.42);
                      }
                    66% {
                      box-shadow: 0 0 98px 0 rgba(207, 235, 255, 0.46);
                      }
                    100% {
                        box-shadow: 0 0 97px 0 rgba(200, 220, 255, 0.48);
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