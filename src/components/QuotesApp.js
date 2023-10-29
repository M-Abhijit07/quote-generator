import { useState, useEffect } from "react"
import Spinner from "react-bootstrap/Spinner";

export default function QuotesApp(){

    const [quote,setQuote] = useState(null);
    const getQuote = async () => {
        try {
            const apiResponce = await fetch('https://api.quotable.io/random');
            const apiData = await apiResponce.json();
            const { content, author } = apiData;
            setQuote({content, author});
        } catch (error) {
            console.log('Error fetching : ',error);
        }
    }

    useEffect( () => {
        getQuote();
    },[]);

    return(
        <>
            <img style={{width:'100vw', height:'100vh'}} alt="background" src="https://picsum.photos/id/25/5000/3333" />
            <div className="d-flex justify-content-center align-items-center" style={{position:'absolute', top:'0', left:'0', width:'100vw', height:'100vh', backdropFilter:'blur(3px)', backgroundColor:'rgba(0,0,0,0.3)'}}>
                {
                    quote
                    ?
                        <div className="w-75">
                            <h3 className="display-2 text-white fst-italic fw-bold">{quote.content}</h3>
                            <p className="text-white lead">~ {quote.author}</p>
                            <button onClick={()=> getQuote()} className="btn btn-primary">Generate New</button>
                        </div>
                    :
                        <Spinner />
                 }
            </div>
        </>
    )
}