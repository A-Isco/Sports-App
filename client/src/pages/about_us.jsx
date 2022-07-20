import styled from "styled-components"

let about_us = ()=>{

    return(
        <Container>
            <div className="container my-5">
                <div className="sec1">
                    <div className="sec1-header">
                        <span className="sec1-spec">Do you</span> find it hard booking a place to practice your favorite sports?
                    </div>

                    <div className="sec1-cont">
                        <div className="sec1-sec1 text-center">
                            We try to make it <span className="sec1-sec2-spec">Easier</span> for you
                        </div>
                        <div className="sec1-sec2 mx-3 mt-4">
                        <span className="sec1-sec2-spec">Only</span> by <span className="sec1-sec2-num">3</span> or <span className="sec1-sec2-num">4</span> clicks, you can <span className="sec1-sec2-spec">Book</span> a suitable <span className="sec1-sec2-spec">Place</span> at a suitable <span className="sec1-sec2-spec">Time</span> instead of going to the 
                        place you want to book and finding it already <span className="sec1-sec2-spec">Booked</span>
                        </div>
                    </div>

                </div>
            </div>
        </Container>
    )
    
}

const Container = styled.div`


.sec1-cont{
    background-image: url("images/ball_pitch.jpg");
    background-size: 1400px;
    height: 565px;
    opacity: 0.7;
    color:white;
}

.sec1-header{
    margin-top:60px;
    font-size: 30px;
    color: #006400;
    margin-bottom:30px;
}

.sec1-spec{
    font-size: 70px;
    font-weight: bolder;
}

.sec1-sec1{
    font-size: 40px;
    font-weight: bold;
    padding-top:40px;
}

.sec1-sec2{
    font-size: 30px;
}

.sec1-sec2-spec{
    font-size:50px;
    font-weight: bold;
    color:#7cfc00;
}

.sec1-sec2-num{
    font-size:40px;
    font-weight: bolder;
}
`

export default about_us