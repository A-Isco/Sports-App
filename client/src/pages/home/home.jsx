import styled from "styled-components"
import { NavLink } from "react-router-dom";

let HomePage = ()=>{
    return(
        <>
            <Container>              
                
                <div className="container-fluid cont">
                    <div className="row sec1">
                        <div className="sec1-text text-center">
                            <div className="slogan">
                                WE MAKE THE STRONGEST SERVICE ABOVE THE WORLD
                            </div> 

                            <div className="desc mt-lg-5">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel voluptates consectetur ad. Veniam ducimus sunt explicabo tempora, repellendus saepe? Voluptatibus molestias, ipsum porro quisquam rerum autem praesentium architecto blanditiis ullam.</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, voluptas temporibus cumque voluptatibus corporis explicabo in aliquam repellat architecto quas ipsum a magni. Aliquam veritatis temporibus debitis error ad reiciendis?</p>
                            </div>
                        </div>     
                    </div>  
                    
                    <div className="sec2 text-center">
                        <div className="mb-5">
                            CHOOSE YOUR SPORT
                        </div>
                        

                        <div className="row sports mb-5">
                            <div className="col-lg-6">
                                <NavLink to={"/football"} className="nav-link">
                                    <img src="images/football.PNG" alt="football" />
                                    <div className="mt-3">Football</div> 
                                </NavLink>
                            </div>
                            <div className="col-lg-6">
                                <NavLink to={"/volleyball"} className="nav-link">
                                    <img src="images/volleyball.PNG" alt="volleyball" />
                                    <div className="mt-3">VOLLEYBALL</div> 
                                </NavLink>
                            </div>
                        </div>
                        <div className="row sports">
                            <div className="col-lg-6">
                                <NavLink to={"/basketball"} className="nav-link">
                                    <img src="images/basketball.PNG" alt="basketball" />
                                    <div className="mt-3">BASKETBALL</div> 
                                </NavLink>
                            </div>
                            <div className="col-lg-6">
                                <NavLink to={"/swimming"} className="nav-link">
                                    <img src="images/swimming.PNG" alt="swimming" />
                                    <div className="mt-3">SWIMMING</div>
                                </NavLink> 
                            </div>
                        </div>
                    </div>
                              
                    <div className="row sec3">
                        <div className="col-lg-7 col-md-12">
                            <div className="quest">
                                <div>WHO</div>
                                <div className="is">IS</div>
                                <div className="sports2">SPORTS</div>
                                <div className="bubble">BUBBLE?</div>
                            </div>

                            <div className="sec3-desc">
                                <div>
                                    find places where you can practice your favorite sport
                                </div>
                                <div>
                                    build your team with people who have the same interests
                                </div>
                                <div>
                                    connect with other players 
                                </div>
                            </div>
                            
                        </div>
                        <img src="images/Capture.png" alt="pitch" className="col-lg-5 col-md-12" />
                    </div>
                    
                    <div className="sec4 text-center">
                        <div className="sec4-title text-center">
                            SPORTS BUBBLE
                        </div>
                        <div className="sec4-desc text-center">
                            <div>
                            sports website where you can book your playground to practice your favorite sport
                            </div>
                            <div>
                            and to connect with people who share your interests
                            </div>
                        </div>
                        <div className="row icons">
                            <img src="images/twitter.PNG" alt="twitter"/>
                            <img src="images/linkedin.PNG" alt="linkedin" />
                            <img src="images/facebook.PNG" alt="facebook" />
                            <img src="images/google.PNG" alt="google" />
                        </div>
                    </div>
                </div> 
            </Container>

        </>
    )

    
}

const Container = styled.div`
    .cont{
        position: relative;
    }
     
    .sec1{
        background-image: url("images/background1.jpg");
        background-size: 1850px;
        height: 782px;
        opacity: 0.8;
    }

    .sec1-text{
        position: relative;
        top: 2%;
        color : white;
        width: 50%;
        font-weight: bold;
        margin: 5%;
    }

    .slogan{
        font-size: 60px;
    }

    .desc{
        font-size: 20px;
    }

    .sec2{
        margin-top: 50px;
        font-size: 40px;
        font-weight: bold;
        color: #08332d;
    }

    .sports{
        margin-left:20%;
        margin-right:20%;
    }

    .sports img{
        width:200px;
    }

    .sec3{
        margin-top: 70px;
        font-weight:bold;
        color:#08332d;
        background-color: #b1c7e4;
    }

    .sec3 img{
        margin-top:10%;
        margin-bottom:3%;
    }
    
    .quest{
        margin-top: 75px;
        margin-left:18%;
        font-size: 60px;
    }

    .is{
        margin-left:12%;
    }
    
    .sports2{
        margin-left:16%;
    }

    .bubble{
        margin-left:7%;
    }

    .sec3-desc{
        font-size: 30px;
        margin-left: 10%;
        margin-top: 40px;
    }

    .sec4-title{
        color:#08332d;
        font-weight: bold;
        font-size: 60px;
        margin-top: 50px;
    }

    .sec4-desc{
        color:#08332d;
        font-weight: bold;
        font-size: 25px;
        margin-top: 20px;
    }

    .sec4 img{
        width: 80px;
    }

    .icons{
        margin-top: 40px;
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        margin-bottom: 100px;
    }

    @media screen and (max-width: 1400px){
        .sec1{
            background-image: url("images/background1.jpg");
            background-size: 1400px;
            height: 500px;
            opacity: 0.8;
        }
    
        .sec1-text{
            position: relative;
            top: 2%;
            color : white;
            width: 50%;
            font-weight: bold;
            margin: 5%;
        }
    
        .slogan{
            font-size: 40px;
        }
    
        .desc{
            font-size: 10px;
        }

    }

    @media screen and (max-width: 1000px){
        .sec1{
            background-image: url("images/background1.jpg");
            background-size: 1000px;
            height: 420px;
            opacity: 0.8;
        }
    
        .sec1-text{
            position: relative;
            top: 2%;
            color : white;
            width: 50%;
            font-weight: bold;
            margin: 5%;
        }
    
        .slogan{
            font-size: 40px;
        }
    
        .desc{
            font-size: 10px;
        }

    }

    @media screen and (max-width: 800px){
        .sec1{
            background-image: url("images/background1.jpg");
            background-size: 800px;
            height: 340px;
            opacity: 0.8;
        }
    
        .sec1-text{
            position: relative;
            top: 2%;
            color : white;
            width: 50%;
            font-weight: bold;
            margin: 5%;
        }
    
        .slogan{
            font-size: 25px;
        }
    
        .desc{
            font-size: 10px;
        }

    }

    @media screen and (max-width: 600px){
        .sec1{
            background-image: url("images/background1.jpg");
            background-size: 600px;
            height: 255px;
            opacity: 0.8;
        }
    
        .sec1-text{
            position: relative;
            top: 2%;
            color : white;
            width: 50%;
            font-weight: bold;
            margin: 1%;
        }
    
        .slogan{
            font-size: 20px;
        }
    
        .desc{
            font-size: 8px;
            margin-top:0;
        }

    }
`

export default HomePage;