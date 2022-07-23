import styled from "styled-components"

let footer = ()=>{
    return(
        <>
        <Container>
            <div className="footer text-center">
                Copyright  <img src="/images/copyright.png" alt="copyrights" />  2022 EL Mal3ab
            </div>
        </Container>
        </>
    )
}

const Container = styled.div`
.footer{
    background-color: #d6d8da;
    color:white;
    font-weight: bold;
    font-size: 30px;
    border-top: 1px solid #E7E7E7;
    padding-top: 20px;
    padding-bottom : 60px;
    left: 0;
    bottom: 0;
    height: 60px;
    width: 100%;
}

.footer img{
    width: 30px;
}
`

export default footer
